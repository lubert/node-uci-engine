"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const src_1 = require("../src");
describe("Parser", () => {
    describe("parseBestMove", () => {
        it("move only", () => {
            const result = src_1.Parser.parseBestMove('bestmove e2e4');
            chai_1.expect(result).to.deep.eq(['e2e4', null]);
        });
        it("move and ponder", () => {
            const result = src_1.Parser.parseBestMove('bestmove e2e4 ponder e7e5');
            chai_1.expect(result).to.deep.eq(['e2e4', 'e7e5']);
        });
    });
    describe("parseOption", () => {
        it("no default", () => {
            const result = src_1.Parser.parseOption('option name Debug Log File type string default');
            chai_1.expect(result).to.deep.eq({
                name: "Debug Log File",
                type: "string",
                default: null,
                vars: null,
                max: null,
                min: null,
            });
        });
        it("has default", () => {
            const result = src_1.Parser.parseOption('option name Ponder type check default false');
            chai_1.expect(result).to.deep.eq({
                name: "Ponder",
                type: "check",
                default: "false",
                vars: null,
                max: null,
                min: null,
            });
        });
        it("has min and max", () => {
            const result = src_1.Parser.parseOption('option name Contempt type spin default 0 min -100 max 100');
            chai_1.expect(result).to.deep.eq({
                name: "Contempt",
                type: "spin",
                default: "0",
                vars: null,
                max: "100",
                min: "-100",
            });
        });
        it("has vars", () => {
            const result = src_1.Parser.parseOption('option name Contempt type combo default Both var Off var White var Black var Both');
            chai_1.expect(result).to.deep.eq({
                name: "Contempt",
                type: "combo",
                default: "Both",
                vars: [
                    "Off",
                    "White",
                    "Black",
                    "Both",
                ],
                max: null,
                min: null,
            });
        });
    });
});
