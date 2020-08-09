import "mocha";
import { expect } from "chai";
import { Engine } from "../../src/Engine/Engine";
import { Result } from "../../src/Analysis/Result";
import { enginePath } from "./util";

describe("Analysis", (): void => {
    before(function() {
        if (!enginePath) this.skip();
    });

    it("should find the best move at the requested depth", (done: Function): void => {
        const engine = new Engine(enginePath);
        const position = {
            fen: "r1bqkb1r/5ppp/p2ppn2/1pn5/3NP3/1BN5/PPP2PPP/R1BQR1K1 w kq - 4 10",
        };
        const resolution = { depth: 15 };

        engine.analyzePosition(
            position,
            resolution,
            (result: Result): void => {
                expect(result.getBestMove()).to.eq("b3d5");
                expect(result.getPosition().fen).to.eq(position.fen);
                expect(result.getAnalysis().moves![0]).to.eq("b3d5");
                expect(result.getAnalysis().score!.value).to.be.greaterThan(100);
                done();
            }
        );
    });
});
