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

        this.on("evaluation", (event: Event): void => {
            const evalEvent = event as EvaluationEvent;
            lastAnalysis = evalEvent.getAnalysis();
        });

        this.on("bestmove", (): void => {
            this.stop();

            if (lastAnalysis !== undefined) {
                const result = new Result(position, resolution, lastAnalysis);

                callback(result);
            }
        });

        this.start((options: IEngineOption[]): void => {
            this.process.execute(position.getInput());
            this.process.execute(`go ${resolution.getInput()}`);
        });
    }

    /**
     * @public
     * @method
     * @param {string} name
     * @param {Function} callback
     * @return {void}
     */
    public on(name: string, callback: (event: Event) => void): void {
        this.handler.on(name, (event: Event): void => {
            callback(event);
        });
    }

    /**
     * @public
     * @method
     * @param {Function} callback
     * @return {void}
     */
    public start(callback: (options: IEngineOption[]) => void): void {
        if (this.isStarted) {
            callback(this.options);
        } else {
            this.options = [];
            this.process.execute("uci");
            this.on("option", (event: Event): void => {
                const optEvent = event as OptionEvent;
                this.options.push(optEvent.getOption());
            });
            this.on("ready", () => callback(this.options));
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
