import "mocha";
import { expect } from "chai";
import { Parser } from "../src";

describe("Parser", (): void => {
    describe("parseBestMove", () => {
        it("move only", (): void => {
            const result = Parser.parseBestMove('bestmove e2e4');
            expect(result).to.deep.eq(['e2e4', null]);
        });

        it("move and ponder", (): void => {
            const result = Parser.parseBestMove('bestmove e2e4 ponder e7e5');
            expect(result).to.deep.eq(['e2e4', 'e7e5']);
        });
    });

    describe("parseOption", (): void => {
        it("no default", (): void => {
            const result = Parser.parseOption('option name Debug Log File type string default');
            expect(result).to.deep.eq({
                name: "Debug Log File",
                type: "string",
                default: null,
                max: null,
                min: null,
            });
        });

        it("has default", (): void => {
            const result = Parser.parseOption('option name Ponder type check default false');
            expect(result).to.deep.eq({
                name: "Ponder",
                type: "check",
                default: "false",
                max: null,
                min: null,
            });
        });

        it("has min and max", (): void => {
            const result = Parser.parseOption('option name Contempt type spin default 0 min -100 max 100');
            expect(result).to.deep.eq({
                name: "Contempt",
                type: "spin",
                default: "0",
                max: "100",
                min: "-100",
            });
        });
    });
});
