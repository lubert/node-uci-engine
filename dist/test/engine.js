"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const proxyquire_1 = __importDefault(require("proxyquire"));
const sinon_1 = __importDefault(require("sinon"));
const chai_1 = require("chai");
describe("Engine", () => {
    describe("constructor", () => {
        it("raises an error if the process doesn't start", () => {
            class FakeProcess {
                constructor() {
                    this.listen = sinon_1.default.stub();
                    this.execute = sinon_1.default.stub();
                    this.isRunning = false;
                }
            }
            const { Engine } = proxyquire_1.default('../src/Engine/Engine', {
                './Process': { Process: FakeProcess },
                '@noCallThru': true,
            });
            chai_1.expect(() => { new Engine('fake'); }).to.throw();
        });
    });
    describe("start", () => {
        it("execute is called", () => {
            const executeSpy = sinon_1.default.spy();
            class FakeProcess {
                constructor() {
                    this.listen = sinon_1.default.stub();
                    this.execute = executeSpy;
                    this.isRunning = true;
                }
            }
            const { Engine } = proxyquire_1.default('../src/Engine/Engine', {
                './Process': { Process: FakeProcess },
                '@noCallThru': true,
            });
            const engine = new Engine('fake');
            sinon_1.default.stub(engine, 'getOptions').callsFake((callback) => callback());
            const config = {
                'Ponder': 'true',
                'MultiPV': '4',
            };
            engine.start(null, config);
            chai_1.expect(executeSpy.args).to.deep.eq([
                ["setoption name Ponder value true"],
                ["setoption name MultiPV value 4"],
                ["isready"]
            ]);
        });
    });
});
