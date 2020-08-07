import "mocha";
import { expect } from "chai";
import { Engine } from "../../src/Engine/Engine";
import { SearchConfig } from "../../src/Engine/SearchConfig";
import { Result } from "../../src/Analysis/Result";
import { Position } from "../../src/Analysis/Position";
import { enginePath } from "./util";

describe("Analysis", (): void => {
    before(function() {
        if (!enginePath) this.skip();
    });

    it("should find the best move at the requested depth", (done: Function): void => {
        const engine = new Engine(enginePath);
        const position = new Position("r1bqkb1r/5ppp/p2ppn2/1pn5/3NP3/1BN5/PPP2PPP/R1BQR1K1 w kq - 4 10");
        const resolution = new SearchConfig({ depth: 15 });

        engine.analyzePosition(
            position,
            resolution,
            (result: Result): void => {
                expect(result.getBestMove()).to.eq("b3d5");
                expect(result.getPosition().getFen()).to.eq(position.getFen());
                expect(result.getAnalysis().getLine()!.getFirstMove().getNotation()).to.eq("b3d5");
                expect(result.getAnalysis().getLine()!.getScore().getValue()).to.be.greaterThan(100);

                done();
            }
        );
    });
});
