"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const Engine_1 = require("../../src/Engine/Engine");
const util_1 = require("./util");
describe("Analysis", () => {
    before(function () {
        if (!util_1.enginePath)
            this.skip();
    });
    it("should find the best move at the requested depth", (done) => {
        const engine = new Engine_1.Engine(util_1.enginePath);
        const position = {
            fen: "r1bqkb1r/5ppp/p2ppn2/1pn5/3NP3/1BN5/PPP2PPP/R1BQR1K1 w kq - 4 10",
        };
        const resolution = { depth: 15 };
        engine.analyzePosition(position, resolution, (result) => {
            chai_1.expect(result.bestMove).to.eq("b3d5");
            chai_1.expect(result.position.fen).to.eq(position.fen);
            chai_1.expect(result.analysis.moves[0]).to.eq("b3d5");
            chai_1.expect(result.analysis.score.value).to.be.greaterThan(100);
            done();
        });
    });
});
