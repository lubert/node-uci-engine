"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadyEvent = void 0;
const Event_1 = require("./Event");
class ReadyEvent extends Event_1.Event {
    constructor() {
        super("ready");
    }
}
exports.ReadyEvent = ReadyEvent;
