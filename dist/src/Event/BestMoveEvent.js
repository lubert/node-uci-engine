"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BestMoveEvent = void 0;
const Event_1 = require("./Event");
class BestMoveEvent extends Event_1.Event {
    constructor(bestMove, ponder) {
        super("bestmove");
        this.bestMove = bestMove;
        this.ponder = ponder;
        this.bestMove = bestMove;
        this.ponder = ponder;
    }
    getBestMove() {
        return this.bestMove;
    }
    getPonder() {
        return this.ponder;
    }
}
exports.BestMoveEvent = BestMoveEvent;
