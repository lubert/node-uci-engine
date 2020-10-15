"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdEvent = void 0;
const Event_1 = require("./Event");
class IdEvent extends Event_1.Event {
    constructor(id) {
        super("engineid");
        this.id = id;
        this.id = id;
    }
    getId() {
        return this.id;
    }
}
exports.IdEvent = IdEvent;
