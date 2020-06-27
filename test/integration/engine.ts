import "mocha";
import { expect } from "chai";
import { Engine } from "../../src/Engine/Engine";
import { IEngineOption } from "src/Engine/IEngineOption";
import engineOptions from './engine_options.json';

let supported = false;
let path = '';
if (process.platform === "darwin") {
    path = "./engine/stockfish_11_mac_x64"
    supported = true;
} else if (process.platform === "linux") {
    path = "./engine/stockfish_11_linux_x64"
    supported = true;
}

(supported ? describe : describe.skip)("Engine", (): void => {
    const engine = new Engine(path);

    it("should recieve engine options", (done: Function): void => {
        engine.start(
            (options: IEngineOption[]): void => {
                expect(options).to.deep.eq(engineOptions);
                done();
            }
        );
    });
});
