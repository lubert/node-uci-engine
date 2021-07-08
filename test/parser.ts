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
    describe("parse Moves", (): void => { 
        it("without piece promotion", (): void => { 
            const result = Parser.parseMoves('info depth 20 seldepth 33 multipv 1 score cp 257 nodes 1701160 nps 4129029 tbhits 0 time 412 pv f1f2 g4f2 g1f2 e8g8 f2g1 d7d6 a2a4 g8h8 b2b3 c6a5 c1b2 f7f5 d1e1 d8e8 e4f5 a5c4 d2c4 c8f5 c4e3 f5g6 e1g3 g6h5 a1f1');
            expect(result).to.deep.include('f1f2')
        });
        it("with piece promotion", (): void => { 
            const result = Parser.parseMoves('info depth 20 seldepth 8 multipv 1 score mate 4 nodes 10380 nps 5190000 tbhits 0 time 2 pv a2a1q b3c2 a1b2 c2d3 b2d2 d3e4 d2d5');
            expect(result).to.deep.include('a2a1q')
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
});
