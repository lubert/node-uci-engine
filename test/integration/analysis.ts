import "mocha";
import { expect } from "chai";
import { Engine } from "../../src/Engine/Engine";
import { IResult } from "../../src/Analysis/IResult";
import { enginePath } from "./util";

const position = {
  fen: "r1bqkb1r/5ppp/p2ppn2/1pn5/3NP3/1BN5/PPP2PPP/R1BQR1K1 w kq - 4 10",
};

describe("Analysis", (): void => {
    before(function() {
        if (!enginePath) this.skip();
    });

    it("should find the best move at the requested depth", (done: Function): void => {
        const engine = new Engine(enginePath);
        const resolution = { depth: 15 };

        engine.setOptions({"MultiPv": "1"})
        engine.analyzePosition(
            position,
            resolution,
            (result: IResult): void => {
                expect(result.bestMove).to.eq("b3d5");
                expect(result.position.fen).to.eq(position.fen);
                expect(result.analysis.moves![0]).to.eq("b3d5");
                expect(result.analysis.score!.value).to.be.greaterThan(100);
                done();
            }
        );
    });

    it("should find the best move at the requested MultiPv", (done: Function): void => {
        const engine = new Engine(enginePath);
        const resolution = { depth: 3 };

        engine.setOptions({"MultiPv": "3"})
        engine.analyzePosition(
            position,
            resolution,
            (result: IResult): void => {
                expect(result.bestMove).to.eq("d4c6");
                expect(result.position.fen).to.eq(position.fen);
                expect(result.analysis.score!.value).to.be.greaterThan(100);

                const variations: string[] = [
                  result.analysis.variations![0].moves!,
                  result.analysis.variations![1].moves!,
                  result.analysis.variations![2].moves!
                ]

                expect(variations).to.have.members([
                  "d4c6 c5b3 c6d8",
                  "c1g5 c5b3 a2b3",
                  "c1d2 c5b3 a2b3"
                ]);
                done();
            }
        );
    });
});
