import { EventEmitter } from "events";
import { ReadyEvent } from "./ReadyEvent";
import { IAnalysis } from "../Analysis/IAnalysis";
import { EvaluationEvent } from "./EvaluationEvent";
import { Event } from "./Event";
import { BestMoveEvent } from "./BestMoveEvent";
import { OutputEvent } from "./OutputEvent";
import { Parser } from "../Uci/Parser";
import { IEngineOption } from "src/Engine/IEngineOption";
import { OptionEvent } from "./OptionEvent";
import { UciOkEvent } from "./UciOkEvent";
import { IdEvent } from "./IdEvent";
import { IEngineId } from "src/Engine/IEngineId";

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
      return this.emitEvent(new ReadyEvent());
    }

    if (Parser.parseUciOk(output)) {
      return this.emitEvent(new UciOkEvent());
    }

    const engineid: IEngineId | null = Parser.parseId(output);
    if (engineid !== null) {
      return this.emitEvent(new IdEvent(engineid));
    }

    const bestMove = Parser.parseBestMove(output);
    if (bestMove !== null) {
      return this.emitEvent(new BestMoveEvent(...bestMove));
    }

    const option: IEngineOption | null = Parser.parseOption(output);
    if (option !== null) {
      return this.emitEvent(new OptionEvent(option));
    }

    if (output.startsWith("info")) {
      const analysis: IAnalysis = {
        depth: Parser.parseDepth(output),
        time: Parser.parseTime(output),
        multipv: Parser.parseMultiPv(output),
        seldepth: Parser.parseSeldepth(output),
        nodes: Parser.parseNodes(output),
        nps: Parser.parseNps(output),
        hashfull: Parser.parseHashfull(output),
        currmove: Parser.parseCurrmove(output),
        currmovenumber: Parser.parseCurrmoveNumber(output),
        moves: Parser.parseMoves(output),
        score: Parser.parseScore(output),
      };
      return this.emitEvent(new EvaluationEvent(analysis));
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
