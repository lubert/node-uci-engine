import "mocha";
import { expect } from "chai";
import { execSync } from "child_process";
import { Engine } from "../../src/Engine/Engine";
import { IResult } from "../../src/Analysis/IResult";
import { Event } from "../../src/Event/Event";
import { EvaluationEvent } from "../../src/Event/EvaluationEvent";
function findLc0(): string | null {
    try {
        return execSync("which lc0", { encoding: "utf-8" }).trim();
    } catch {
        return null;
    }
}

const lc0Path = findLc0();
const silentLogger = {
    debug() {},
    info() {},
    warn() {},
    error() {},
};

describe("Lc0", (): void => {
    before(function () {
        if (!lc0Path) this.skip();
    });

    it("should parse wdl from analysis", function (done: Function) {
        this.timeout(30000);
        const engine = new Engine(lc0Path!, silentLogger);
        const position = {
            fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        };

        engine.start(() => {
            engine.setOptions({ UCI_ShowWDL: "true" });

            let sawWdl = false;
            const removeListener = engine.on("evaluation", (event: Event) => {
                const analysis = (event as EvaluationEvent).getAnalysis();
                if (analysis.wdl !== null) {
                    sawWdl = true;
                    expect(analysis.wdl.win).to.be.a("number");
                    expect(analysis.wdl.draw).to.be.a("number");
                    expect(analysis.wdl.loss).to.be.a("number");
                    expect(analysis.wdl.win + analysis.wdl.draw + analysis.wdl.loss).to.eq(1000);
                }
            });

            engine.analyzePosition(position, { nodes: 100 }, (result: IResult) => {
                removeListener();
                expect(sawWdl).to.eq(true);
                expect(result.analysis.wdl).to.not.eq(null);
                engine.quit();
                done();
            });
        });
    });

    it("should parse movesleft when enabled", function (done: Function) {
        this.timeout(30000);
        const engine = new Engine(lc0Path!, silentLogger);
        const position = {
            fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        };

        engine.start(() => {
            engine.setOptions({ UCI_ShowMovesLeft: "true" });

            let sawMovesleft = false;
            const removeListener = engine.on("evaluation", (event: Event) => {
                const analysis = (event as EvaluationEvent).getAnalysis();
                if (analysis.movesleft !== null) {
                    sawMovesleft = true;
                    expect(analysis.movesleft).to.be.a("number");
                    expect(analysis.movesleft).to.be.greaterThan(0);
                }
            });

            engine.analyzePosition(position, { nodes: 100 }, () => {
                removeListener();
                expect(sawMovesleft).to.eq(true);
                engine.quit();
                done();
            });
        });
    });
});
