import { Event } from "../Event/Event";
import { Resolution } from "../Analysis/Resolution/Resolution";
import { Analysis } from "../Analysis/Analysis";
import { EvaluationEvent } from "../Event/EvaluationEvent";
import { Handler } from "../Event/Handler";
import { Process } from "./Process";
import { Position } from "../Analysis/Position";
import { Result } from "../Analysis/Result";
import { IEngineOption } from "./IEngineOption";
import { OptionEvent } from "src/Event/OptionEvent";
import { IEngineConfig } from "./IEngineConfig";

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
     * @param {Position} position
     * @param {Resolution} resolution
     * @param {Function} callback
     * @return {void}
     */
    public analyzePosition(
        position: Position,
        resolution: Resolution,
        callback: (result: Result) => void
    ): void {
        let lastAnalysis: Analysis | undefined;

        const removeListener = this.on("evaluation", (event: Event): void => {
            const evalEvent = event as EvaluationEvent;
            lastAnalysis = evalEvent.getAnalysis();
        });

        this.once("bestmove", (): void => {
            this.stop();
            removeListener();

            if (lastAnalysis !== undefined) {
                const result = new Result(position, resolution, lastAnalysis);

                callback(result);
            }
        });

        this.start((): void => {
            this.process.execute(position.getInput());
            this.process.execute(`go ${resolution.getInput()}`);
        });
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
    public start(callback: () => void, config?: IEngineConfig): void {
        if (this.isStarted) {
            callback();
        } else {
            this.once("ready", () => {
                this.isStarted = true;
                callback();
            });

            this.getOptions(() => {
                if (config) {
                    Object.entries(config).forEach(([key, value]) => {
                        this.process.execute(`setoption name ${key} value ${value}`);
                    });
                }
                this.process.execute("isready");
            });
        }
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
