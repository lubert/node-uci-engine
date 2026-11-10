import "mocha";
import { expect } from "chai";
import { Engine } from "../../src/Engine/Engine";
import { IEngineOption } from "../../src/Engine/IEngineOption";
import { enginePath } from "./util";

// Any Stockfish: these options and their shapes have held since version 11,
// while maxima, defaults of string options and the full list vary by version.
describe("Engine", (): void => {
    before(function () {
        if (!enginePath) this.skip();
    });

    it("should recieve engine options", (done: Function): void => {
        const engine = new Engine(enginePath);

        engine.getOptions((options: IEngineOption[], id): void => {
            const byName = new Map(options.map((o) => [o.name, o]));
            expect(byName.get("Threads")).to.include({ type: "spin", default: "1", min: "1" });
            expect(Number(byName.get("Threads")!.max)).to.be.greaterThan(1);
            expect(byName.get("MultiPV")).to.include({ type: "spin", default: "1", min: "1" });
            expect(byName.get("Ponder")).to.include({ type: "check", default: "false" });
            expect(byName.get("Clear Hash")).to.include({ type: "button" });
            expect(byName.get("Debug Log File")).to.include({ type: "string" });
            expect(id.name).to.match(/^Stockfish/);
            expect(id.author).to.be.a("string").and.not.empty;
            done();
        });
    });
});
