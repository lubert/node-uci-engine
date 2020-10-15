"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputEvent = void 0;
const Event_1 = require("./Event");
class OutputEvent extends Event_1.Event {
    constructor(output) {
        super("output");
        this.output = output;
        this.output = output;
    }
    getOutput() {
        return this.output;
    }
}
exports.OutputEvent = OutputEvent;
