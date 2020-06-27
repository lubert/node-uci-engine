import "mocha";
import proxyquire from "proxyquire";
import sinon from "sinon";
import { expect } from "chai";
import { IEngineConfig } from "src/Engine/IEngineConfig";

describe("Engine", () => {
    describe("start", () => {
        it("execute is called", (): void => {
            const executeSpy = sinon.spy();

            class FakeProcess {
                listen = sinon.stub();
                execute = executeSpy;
            }

            const { Engine } = proxyquire('../src/Engine/Engine', {
                './Process': { Process: FakeProcess },
                '@noCallThru': true,
            });
            const engine = new Engine('fake');
            const config: IEngineConfig = {
                'Ponder': 'true',
                'MultiPV': '4',
            }
            engine.start(null, config);
            expect(executeSpy.args).to.deep.eq([
                ["uci"],
                ["setoption name Ponder value true"],
                ["setoption name MultiPV value 4"],
            ]);
        });
    });

});
