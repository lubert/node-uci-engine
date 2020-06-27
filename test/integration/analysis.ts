import "mocha";
import { expect } from "chai";
import { DepthResolution } from "../../src/Analysis/Resolution/DepthResolution";
import { Engine } from "../../src/Engine/Engine";
import { Result } from "../../src/Analysis/Result";
import { Position } from "../../src/Analysis/Position";

let supported = false;
let path = '';
if (process.platform === "darwin") {
    path = "./engine/stockfish_11_mac_x64"
    supported = true;
} else if (process.platform === "linux") {
    path = "./engine/stockfish_11_linux_x64"
    supported = true;
}

(supported ? describe : describe.skip)("Analysis", (): void => {
    const engine = new Engine(path);
    const position = new Position("r1bqkb1r/5ppp/p2ppn2/1pn5/3NP3/1BN5/PPP2PPP/R1BQR1K1 w kq - 4 10");
    const resolution = new DepthResolution(15);

    it("Should find the best move at the requested depth", (done: Function): void => {
        engine.analyzePosition(
            position,
            resolution,
            (result: Result): void => {
                expect(result.getResolution().getProperty()).to.eq("depth");
                expect(result.getResolution().getValue()).to.eq(resolution.getValue());
                expect(result.getPosition().getFen()).to.eq(position.getFen());
                expect(result.getAnalysis().getLine().getFirstMove().getNotation()).to.eq("b3d5");
                expect(result.getAnalysis().getEvaluation().getValue()).to.be.greaterThan(100);

                done();
            }
        );
    });
});
