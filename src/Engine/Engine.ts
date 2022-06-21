import { Event } from "../Event/Event";
import { IAnalysis } from "../Analysis/IAnalysis";
import { EvaluationEvent } from "../Event/EvaluationEvent";
import { Handler } from "../Event/Handler";
import { Process } from "./Process";
import { IPosition } from "../Analysis/IPosition";
import { IResult } from "../Analysis/IResult";
import { IEngineOption } from "./IEngineOption";
import { OptionEvent } from "src/Event/OptionEvent";
import { BestMoveEvent } from "src/Event/BestMoveEvent";
import { ISearchConfig } from "./ISearchConfig";
import { IdEvent } from "src/Event/IdEvent";

type EventCallback = (event: Event) => void;

interface Logger {
    debug(message?: any, ...optionalParams: any[]): void;
    info(message?: any, ...optionalParams: any[]): void;
    warn(message?: any, ...optionalParams: any[]): void;
    error(message?: any, ...optionalParams: any[]): void;
    [x: string]: any;
}

/**
 * @class Engine
 * @module Engine
 */
export class Engine {
    /**
     * @protected
     * @type {Process}
     */
    protected process: Process;

    /**
     * @protected
     * @type {Handler}
     */
    protected handler: Handler;

    /**
     * @protected
     * @type {Handler}
     */
    protected id: Record<string, string>;

    /**
     * @protected
     * @type {IEngineOption[]}
     */
    protected options: IEngineOption[];

    /**
     * @protected
     * @type {boolean}
     */
    protected isStarted: boolean;

    /**
     * @protected
     * @type {Logger}
     */
    protected logger: Logger;

    /**
     * @constructor
     * @param {string} path
     */
    constructor(path: string, logger: Logger = console) {
        this.process = new Process(path);
        if (!this.process.isRunning) {
            if (this.process.error) throw this.process.error;
            throw new Error("Process failed to start");
        }
        this.handler = new Handler();
        this.id = {};
        this.options = [];
        this.isStarted = false;
        this.logger = logger;

        this.process.listen((output: string) => {
            this.logger.debug(`[Engine] Output "${output}"`)
            this.handler.handle(output);
        });
    }

    /**
     * @public
     * @return {boolean}
     */
    public get isRunning(): boolean {
        return this.process.isRunning;
    }

    /**
     * @public
     * @method
     * @param {IPosition} position
     * @param {ISearchConfig} config
     * @param {Function} callback
     * @return {void}
     */
    public analyzePosition(
        position: IPosition,
        config: ISearchConfig,
        callback: (result: IResult) => void
    ): void {
        let lastAnalysis: IAnalysis | undefined;

        const removeListener = this.on("evaluation", (event: Event): void => {
            const evalEvent = event as EvaluationEvent;
            if (evalEvent.getAnalysis().moves !== null) {
                lastAnalysis = evalEvent.getAnalysis();
            }
        });

        this.go(position, config, (bestMove) => {
            this.stop();
            removeListener();
            if (lastAnalysis !== undefined) {
                const result: IResult = {
                    analysis: lastAnalysis,
                    bestMove: bestMove.getBestMove(),
                    config,
                    position,
                };
                callback(result);
            }
        });
    }

    /**
     * @public
     * @method
     * @param {Function} callback
     * @param {Function} evalCallback
     * @return {void}
     */
    public go(
        position: IPosition,
        config: ISearchConfig,
        callback?: (bestMove: BestMoveEvent) => void
    ): void {
        if (callback) {
            this.once("bestmove", (event: Event): void => {
                const bestMoveEvent = event as BestMoveEvent;
                callback(bestMoveEvent);
            });
        }
        let cmd = "go";
        Object.entries(config).forEach(([key, value]) => {
            cmd += ` ${key}`;
            if (value !== null) cmd += ` ${value}`;
        });
        this.execute(`position fen ${position.fen}`);
        this.execute(cmd);
    }

    /**
     * @public
     * @method
     * @param {Function} callback
     * @return {void}
     */
    public getOptions(callback: (options: IEngineOption[], id: Record<string, string>) => void): void {
        this.options = [];
        this.id = {};
        this.execute("uci");

        const removeIdListener = this.on("engineid", (event: Event) => {
            const idEvent = event as IdEvent;
            const id = idEvent.getId();
            this.id[id.name] = id.value;
        });

        const removeOptionListener = this.on("option", (event: Event) => {
            const optEvent = event as OptionEvent;
            this.options.push(optEvent.getOption());
        });

        this.once("uciok", () => {
            callback(this.options, this.id);
            removeOptionListener();
            removeIdListener();
        });
    }

    /**
     * @public
     * @method
     * @param {string} name
     * @param {Function} callback
     * @return {Function} removeListener
     */
    public on(name: string, callback: EventCallback): () => void {
        this.handler.on(name, callback);
        return () => this.handler.removeListener(name, callback);
    }

    /**
     * @public
     * @method
     * @param {string} name
     * @param {Function} callback
     * @return {void}
     */
    public once(name: string, callback: EventCallback): void {
        this.handler.once(name, callback);
    }

    /**
     * @public
     * @method
     * @return {void}
     */
    public removeAllListeners(): void {
        this.handler.removeAllListeners();
    }

    /**
     * @public
     * @method
     * @return {void}
     */
    public ponderhit(): void {
        this.execute("ponderhit");
    }

    /**
     * @public
     * @method
     * @return {void}
     */
    public setOptions(config: Record<string, string>): void {
        Object.entries(config).forEach(
            ([key, value]) => this.execute(`setoption name ${key} value ${value}`)
        );
    }

    /**
     * @public
     * @method
     * @param {Function} callback
     * @return {void}
     */
    public start(callback: (options: IEngineOption[], id: Record<string, string>) => void, config?: Record<string, string>): void {
        if (this.isStarted) {
            return callback(this.options, this.id);
        }
        this.once("ready", () => {
            this.isStarted = true;
            callback(this.options, this.id);
        });

        this.getOptions(() => {
            if (config) this.setOptions(config);
            this.execute("isready");
        });
    }

    /**
     * @public
     * @method
     * @return {void}
     */
    public stop(): void {
        this.execute("stop");
    }

    /**
     * @public
     * @method
     * @return {void}
     */
    public quit(): void {
        this.execute("quit");
    }

    /**
     * @public
     * @method
     * @return {void}
     */
    public destroy(): void {
        this.process.kill();
        this.handler.removeAllListeners();
    }

    public execute(cmd: string) {
        this.logger.debug(`[Engine] Command "${cmd}"`)
        this.process.execute(cmd);
    }
}
