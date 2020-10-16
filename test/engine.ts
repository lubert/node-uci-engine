import "mocha";
import proxyquire from "proxyquire";
import sinon from "sinon";
import { expect } from "chai";

describe("Engine", () => {
    describe("constructor", () => {
        it("raises an error if the process doesn't start", () => {
            class FakeProcess {
                listen = sinon.stub();
                execute = sinon.stub();
                isRunning = false;
            }

            const { Engine } = proxyquire('../src/Engine/Engine', {
                './Process': { Process: FakeProcess },
                '@noCallThru': true,
            });

            expect(() => { new Engine('fake') }).to.throw();
        });
    })
    describe("start", () => {
        it("execute is called", (): void => {
            const executeSpy = sinon.spy();

            class FakeProcess {
                listen = sinon.stub();
                execute = executeSpy;
                isRunning = true;
            }

            const { Engine } = proxyquire('../src/Engine/Engine', {
                './Process': { Process: FakeProcess },
                '@noCallThru': true,
            });
            const engine = new Engine('fake');
            sinon.stub(engine, 'getOptions').callsFake((callback) => callback());

            const config = {
                'Ponder': 'true',
                'MultiPV': '4',
            };
            engine.start(null, config);
            expect(executeSpy.args).to.deep.eq([
                ["setoption name Ponder value true"],
                ["setoption name MultiPV value 4"],
                ["isready"]
            ]);
        });
    });

});
