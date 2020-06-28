import "mocha";
import { expect } from "chai";
import { Engine } from "../../src/Engine/Engine";
import { IEngineOption } from "src/Engine/IEngineOption";
import engineOptions from './engine_options.json';
import { enginePath } from "./util";

describe("Engine", (): void => {
    before(function() {
        if (!enginePath) this.skip();
    });

    it("should recieve engine options", (done: Function): void => {
        const engine = new Engine(enginePath);

        engine.getOptions(
            (options: IEngineOption[]): void => {
                expect(options).to.deep.eq(engineOptions);
                done();
            }
        );
    });
});
