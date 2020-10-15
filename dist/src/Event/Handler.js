"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handler = void 0;
const events_1 = require("events");
const ReadyEvent_1 = require("./ReadyEvent");
const EvaluationEvent_1 = require("./EvaluationEvent");
const BestMoveEvent_1 = require("./BestMoveEvent");
const OutputEvent_1 = require("./OutputEvent");
const Parser_1 = require("../Uci/Parser");
const OptionEvent_1 = require("./OptionEvent");
const UciOkEvent_1 = require("./UciOkEvent");
const IdEvent_1 = require("./IdEvent");
class Handler extends events_1.EventEmitter {
    handle(output) {
        this.emitEvent(new OutputEvent_1.OutputEvent(output));
        if (Parser_1.Parser.parseIsReady(output)) {
            return this.emitEvent(new ReadyEvent_1.ReadyEvent);
        }
        if (Parser_1.Parser.parseUciOk(output)) {
            return this.emitEvent(new UciOkEvent_1.UciOkEvent);
        }
        const engineid = Parser_1.Parser.parseId(output);
        if (engineid !== null) {
            return this.emitEvent(new IdEvent_1.IdEvent(engineid));
        }
        const bestMove = Parser_1.Parser.parseBestMove(output);
        if (bestMove !== null) {
            return this.emitEvent(new BestMoveEvent_1.BestMoveEvent(...bestMove));
        }
        const option = Parser_1.Parser.parseOption(output);
        if (option !== null) {
            return this.emitEvent(new OptionEvent_1.OptionEvent(option));
        }
        if (output.startsWith("info")) {
            const analysis = {
                depth: Parser_1.Parser.parseDepth(output),
                time: Parser_1.Parser.parseTime(output),
                multipv: Parser_1.Parser.parseMultiPv(output),
                seldepth: Parser_1.Parser.parseSeldepth(output),
                nodes: Parser_1.Parser.parseNodes(output),
                nps: Parser_1.Parser.parseNps(output),
                hashfull: Parser_1.Parser.parseHashfull(output),
                currmove: Parser_1.Parser.parseCurrmove(output),
                currmovenumber: Parser_1.Parser.parseCurrmoveNumber(output),
                moves: Parser_1.Parser.parseMoves(output),
                score: Parser_1.Parser.parseScore(output),
            };
            return this.emitEvent(new EvaluationEvent_1.EvaluationEvent(analysis));
        }
    }
    emitEvent(event) {
        this.emit(event.getName(), event);
    }
}
exports.Handler = Handler;
