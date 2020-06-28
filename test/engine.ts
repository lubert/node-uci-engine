import "mocha";
import proxyquire from "proxyquire";
import sinon from "sinon";
import { expect } from "chai";
import { EngineConfig } from "../src/Engine/EngineConfig";

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
            sinon.stub(engine, 'getOptions').callsFake((callback) => callback());

            const config = new EngineConfig({
                'Ponder': 'true',
                'MultiPV': '4',
            });
            engine.start(null, config);
            expect(executeSpy.args).to.deep.eq([
                ["setoption name Ponder value true"],
                ["setoption name MultiPV value 4"],
                ["isready"]
            ]);
        });
    });

});
