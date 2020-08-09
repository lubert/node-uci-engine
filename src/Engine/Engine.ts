import { Event } from "../Event/Event";
import { IAnalysis } from "../Analysis/IAnalysis";
import { EvaluationEvent } from "../Event/EvaluationEvent";
import { Handler } from "../Event/Handler";
import { Process } from "./Process";
import { IPosition } from "../Analysis/IPosition";
import { Result } from "../Analysis/Result";
import { IEngineOption } from "./IEngineOption";
import { OptionEvent } from "src/Event/OptionEvent";
import { BestMoveEvent } from "src/Event/BestMoveEvent";
import { EngineConfig } from "./EngineConfig";
import { ISearchConfig } from "./ISearchConfig";

type EventCallback = (event: Event) => void;

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
     * @type {IEngineOption[]}
     */
    protected options: IEngineOption[];

    /**
     * @protected
     * @type {boolean}
     */
    protected isStarted: boolean;

    /**
     * @constructor
     * @param {string} path
     */
    constructor(path: string) {
        this.process = new Process(path);
        this.handler = new Handler();
        this.options = [];
        this.isStarted = false;

        this.process.listen((output: string) => {
            this.handler.handle(output);
        });
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
        callback: (result: Result) => void
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
                const result = new Result(
                    bestMove.getBestMove(), position, config, lastAnalysis
                );
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
        callback: (bestMove: BestMoveEvent) => void
    ): void {
        this.once("bestmove", (event: Event): void => {
            const bestMoveEvent = event as BestMoveEvent;
            callback(bestMoveEvent);
        });
        let cmd = "go";
        Object.entries(config).forEach(([key, value]) => {
            cmd += ` ${key}`;
            if (value !== null) cmd += ` ${value}`;
        });
        this.process.execute(`position fen ${position.fen}`);
        this.process.execute(cmd);
    }

    /**
     * @public
     * @method
     * @param {Function} callback
     * @return {void}
     */
    public getOptions(callback: (options: IEngineOption[]) => void): void {
        this.options = [];
        this.process.execute("uci");

        const removeListener = this.on("option", (event: Event) => {
            const optEvent = event as OptionEvent;
            this.options.push(optEvent.getOption());
        });

        this.once("uciok", () => {
            callback(this.options);
            removeListener();
        });
    }

    /**
     * @public
     * @method
     * @param {string} name
     * @param {Function} callback
     * @return {Function} removeListener
     */
    public on(name: string, callback: EventCallback): Function {
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
     * @param {Function} callback
     * @return {void}
     */
    public start(callback: () => void, config?: EngineConfig): void {
        if (this.isStarted) {
            return callback();
        }
        this.once("ready", () => {
            this.isStarted = true;
            callback();
        });

        this.getOptions(() => {
            config?.getCommands().forEach(cmd => this.process.execute(cmd));
            this.process.execute("isready");
        });
    }

    /**
     * @public
     * @method
     * @return {void}
     */
    public stop(): void {
        this.process.execute("quit");
    }
}
