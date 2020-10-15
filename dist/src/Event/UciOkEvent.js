"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UciOkEvent = void 0;
const Event_1 = require("./Event");
class UciOkEvent extends Event_1.Event {
    constructor() {
        super("uciok");
    }
}
exports.UciOkEvent = UciOkEvent;
