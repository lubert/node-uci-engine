"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluationEvent = void 0;
const Event_1 = require("./Event");
class EvaluationEvent extends Event_1.Event {
    constructor(analysis) {
        super("evaluation");
        this.analysis = analysis;
        this.analysis = analysis;
    }
    getAnalysis() {
        return this.analysis;
    }
}
exports.EvaluationEvent = EvaluationEvent;
