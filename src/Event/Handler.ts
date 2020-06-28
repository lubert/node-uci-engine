import { EventEmitter } from "events";
import { ReadyEvent } from "./ReadyEvent";
import { Evaluation } from "../Analysis/Evaluation";
import { Analysis } from "../Analysis/Analysis";
import { EvaluationEvent } from "./EvaluationEvent";
import { Event } from "./Event";
import { Line } from "../Analysis/Line";
import { BestMoveEvent } from "./BestMoveEvent";
import { OutputEvent } from "./OutputEvent";
import { Parser } from "../Uci/Parser";
import { IEngineOption } from "src/Engine/IEngineOption";
import { OptionEvent } from "./OptionEvent";
import { UciOkEvent } from "./UciOkEvent";

/**
 * @class Handler
 * @extends EventEmitter
 * @module Handler
 */
export class Handler extends EventEmitter {
    /**
     * @public
     * @method
     * @param {string} output
     * @return {void}
     */
    public handle(output: string): void {
        this.emitEvent(new OutputEvent(output));

        if (Parser.parseIsReady(output)) {
            return this.emitEvent(new ReadyEvent);
        }

        if (Parser.parseUciOk(output)) {
            return this.emitEvent(new UciOkEvent);
        }

        const bestMove = Parser.parseBestMove(output);
        if (bestMove !== null) {
            return this.emitEvent(new BestMoveEvent(...bestMove));
        }

        const option: IEngineOption | null = Parser.parseOption(output);
        if (option !== null) {
            return this.emitEvent(new OptionEvent(option));
        }

        const line: Line | null = Parser.parseLine(output);

        if (line !== null) {
            const depth: number | null = Parser.parseDepth(output);

            if (depth !== null) {
                const time: number | null = Parser.parseTime(output);

                if (time !== null) {
                    const evaluation: number | null = Parser.parseEvaluation(output);

                    if (evaluation !== null) {
                        const analysis = new Analysis(new Evaluation(evaluation, depth), line, time);

                        return this.emitEvent(new EvaluationEvent(analysis));
                    }
                }
            }
        }
    }

    /**
     * @protected
     * @method
     * @param {Event} event
     * @return {void}
     */
    protected emitEvent(event: Event): void {
        this.emit(event.getName(), event);
    }
}
