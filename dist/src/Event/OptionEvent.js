"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionEvent = void 0;
const Event_1 = require("./Event");
class OptionEvent extends Event_1.Event {
    constructor(option) {
        super("option");
        this.option = option;
        this.option = option;
    }
    getOption() {
        return this.option;
    }
}
exports.OptionEvent = OptionEvent;
