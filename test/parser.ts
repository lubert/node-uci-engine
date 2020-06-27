import "mocha";
import { expect } from "chai";
import { Parser } from "../src";

describe("Parser", (): void => {
    describe("parseOption", (): void => {
        it("missing default", (): void => {
            const result = Parser.parseOption('option name Debug Log File type string default');
            expect(result).to.deep.eq({
                name: "Debug Log File",
                type: "string",
                default: undefined,
                max: undefined,
                min: undefined,
            });
        });

        it("has default", (): void => {
            const result = Parser.parseOption('option name Ponder type check default false');
            expect(result).to.deep.eq({
                name: "Ponder",
                type: "check",
                default: "false",
                max: undefined,
                min: undefined,
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
