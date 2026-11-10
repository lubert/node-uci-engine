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

        it("keeps a promotion on the move and the ponder", (): void => {
            expect(Parser.parseBestMove('bestmove a7a8q')).to.deep.eq(['a7a8q', null]);
            expect(Parser.parseBestMove('bestmove a7b8n ponder h2h1r')).to.deep.eq(['a7b8n', 'h2h1r']);
        });

        it("keeps a null move", (): void => {
            expect(Parser.parseBestMove('bestmove (none)')).to.deep.eq([null, null]);
        });
    });

    describe("parseScore", () => {
        it("an exact score has no bound", (): void => {
            expect(Parser.parseScore('info depth 20 multipv 1 score cp 25 nodes 1000 pv e2e4')).to.deep.eq({ type: 'cp', value: 25 });
            expect(Parser.parseScore('info depth 20 multipv 1 score mate -3 nodes 1000 pv e2e4')).to.deep.eq({ type: 'mate', value: -3 });
        });

        it("keeps a bound", (): void => {
            expect(Parser.parseScore('info depth 35 seldepth 43 multipv 1 score cp 22 upperbound nodes 1000 pv e2e4')).to.deep.eq({ type: 'cp', value: 22, bound: 'upper' });
            expect(Parser.parseScore('info depth 18 score mate 3 lowerbound nodes 1000 pv e2e4')).to.deep.eq({ type: 'mate', value: 3, bound: 'lower' });
        });

        it("keeps a bound printed after wdl", (): void => {
            // Stockfish 16 with UCI_ShowWDL on.
            expect(Parser.parseScore('info depth 23 seldepth 38 multipv 1 score cp 34 wdl 45 954 1 upperbound nodes 1000 nps 900000 time 5000 pv e2e4 e7e5')).to.deep.eq({ type: 'cp', value: 34, bound: 'upper' });
        });

        it("no score", (): void => {
            expect(Parser.parseScore('info depth 12 currmove e2e4 currmovenumber 1')).to.eq(null);
        });
    });

    describe("parseCurrmove", () => {
        it("plain move", (): void => {
            expect(Parser.parseCurrmove('info depth 12 currmove e2e4 currmovenumber 1')).to.eq('e2e4');
        });

        it("keeps a promotion", (): void => {
            expect(Parser.parseCurrmove('info depth 30 currmove c2c1q currmovenumber 1')).to.eq('c2c1q');
            expect(Parser.parseCurrmove('info currmove h7h8b')).to.eq('h7h8b');
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

    describe("parseWdl", (): void => {
        it("parses wdl from info string", (): void => {
            const result = Parser.parseWdl('info depth 12 seldepth 15 multipv 1 score cp 25 wdl 450 400 150 nodes 8000 nps 400000 time 20 pv e2e4 e7e5');
            expect(result).to.deep.eq({ win: 450, draw: 400, loss: 150 });
        });

        it("returns null when no wdl present", (): void => {
            const result = Parser.parseWdl('info depth 20 seldepth 33 multipv 1 score cp 257 nodes 1701160 nps 4129029 time 412 pv f1f2');
            expect(result).to.eq(null);
        });
    });

    describe("parseMovesleft", (): void => {
        it("parses movesleft from info string", (): void => {
            const result = Parser.parseMovesleft('info depth 12 score cp 25 wdl 450 400 150 movesleft 42 nodes 8000 nps 400000 time 20 pv e2e4');
            expect(result).to.eq(42);
        });

        it("returns null when no movesleft present", (): void => {
            const result = Parser.parseMovesleft('info depth 20 seldepth 33 multipv 1 score cp 257 nodes 1701160 nps 4129029 time 412 pv f1f2');
            expect(result).to.eq(null);
        });
    });

    describe("parseVerboseMoveStats", (): void => {
        it("parses verbose move stats line", (): void => {
            const result = Parser.parseVerboseMoveStats('info string e2e4  (322 ) N:      67 (+ 1) (P: 25.22%) (WL:  0.11098) (D: 0.439) (M: 161.8) (Q:  0.11098) (U: 0.08953) (S:  0.19951) (V:  0.1110) ');
            expect(result).to.deep.eq({
                move: 'e2e4',
                visits: 67,
                policy: 25.22,
                winLoss: 0.11098,
                draw: 0.439,
                movesLeft: 161.8,
                q: 0.11098,
            });
        });

        it("parses move with promotion", (): void => {
            const result = Parser.parseVerboseMoveStats('info string a7a8q  (123 ) N:      10 (+ 0) (P:  5.00%) (WL:  0.50000) (D: 0.300) (M: 10.0) (Q:  0.50000) (U: 0.10000) (S:  0.20000) (V:  0.5000) ');
            expect(result).to.not.eq(null);
            expect(result!.move).to.eq('a7a8q');
        });

        it("returns null for non-move info string", (): void => {
            const result = Parser.parseVerboseMoveStats('info string node  (  20) N:     194 (+ 1) (P: 89.11%) (WL:  0.09404) (D: 0.452) (M: 165.7) (Q:  0.09404) (V:  0.0889) ');
            expect(result).to.eq(null);
        });

        it("returns null for regular info line", (): void => {
            const result = Parser.parseVerboseMoveStats('info depth 20 seldepth 33 multipv 1 score cp 257 nodes 1701160 nps 4129029 time 412 pv f1f2');
            expect(result).to.eq(null);
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

        it("treats <empty> default as an empty string", (): void => {
            const result = Parser.parseOption('option name SyzygyPath type string default <empty>');
            expect(result).to.deep.eq({
                name: "SyzygyPath",
                type: "string",
                default: "",
                vars: null,
                max: null,
                min: null,
            });
        });
    });
});
