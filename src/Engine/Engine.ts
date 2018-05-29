import { Event } from "../Event/Event";
import { Resolution } from "../Analysis/Resolution/Resolution";
import { Analysis } from "../Analysis/Analysis";
import { EvaluationEvent } from "../Event/EvaluationEvent";
import { Handler } from "../Event/Handler";
import { Process } from "./Process";
import { Position } from "../Analysis/Position";
import { Result } from "../Analysis/Result";

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

        this.on("evaluation", (event: EvaluationEvent): void => {
            lastAnalysis = event.getAnalysis();
        });

        this.on("bestmove", (): void => {
            this.stop();

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
     * @protected
     * @method
     * @param {Function} callback
     * @return {void}
     */
    protected start(callback: () => void): void {
        if (this.isStarted) {
            callback();
        } else {
            this.process.execute("uci");

            this.on("ready", callback);
        }
    }

    /**
     * @protected
     * @method
     * @return {void}
     */
    protected stop(): void {
        this.process.execute("quit");
    }
}
