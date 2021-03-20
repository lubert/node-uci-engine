import "mocha";
import { expect } from "chai";
import { Parser } from "../src";
import { IVariation } from "../src/Analysis/IVariation";

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
                vars: null,
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
                vars: null,
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
                vars: null,
                max: "100",
                min: "-100",
            });
        });

        it("has vars", (): void => {
            const result = Parser.parseOption('option name Contempt type combo default Both var Off var White var Black var Both');
            expect(result).to.deep.eq({
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

    describe("parsePrincipalVariations", () => {
        const variations: Record<number, IVariation> = {
            "2": {
                "depth": 5,
                "score": 10,
                "scoreType": "cp",
                "timeMs": 100,
                "moves": "original"
            }
        }

        it("parses MultiPv and adds new variations", (): void => {
            const output = "info depth 7 seldepth 24 multipv 3 score cp 20 nodes 809947 nps 2060933 tbhits 0 time 200 pv f2f3 c8d7 c1e3 f8e7 a2a3 e8g8 b3a2"

            const result = Parser.parsePrincipalVariations(output, variations);
            expect(result).to.deep.eq({
                ...variations,
                "3": {
                    "depth": 7,
                    "score": 20,
                    "scoreType": "cp",
                    "timeMs": 200,
                    "moves":  "f2f3 c8d7 c1e3 f8e7 a2a3 e8g8 b3a2"
                }
            });
        });

        it("parses MultiPv and prioritizes greater depth", (): void => {
            // Difference here is different multipv
            const output = "info depth 7 seldepth 24 multipv 2 score cp -20 nodes 809947 nps 2060933 tbhits 0 time 200 pv f2f3 c8d7 c1e3 f8e7 a2a3 e8g8 b3a2"

            const result = Parser.parsePrincipalVariations(output, variations);
            expect(result).to.deep.eq({
                2: {
                    "depth": 7,
                    "score": -20,
                    "scoreType": "cp",
                    "timeMs": 200,
                    "moves":  "f2f3 c8d7 c1e3 f8e7 a2a3 e8g8 b3a2"
                }
            });
        });

        it("parses MultiPv and keeps depth from cache", (): void => {
            // Difference here is output has same multipv, but lower depth
            const output = "info depth 2 seldepth 24 multipv 2 score cp 20 nodes 809947 nps 2060933 tbhits 0 time 200 pv f2f3 c8d7 c1e3 f8e7 a2a3 e8g8 b3a2"

            const result = Parser.parsePrincipalVariations(output, variations);
            expect(result).to.deep.eq({ ...variations });
        });
    });
});
