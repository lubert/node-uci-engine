"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const Engine_1 = require("../../src/Engine/Engine");
const engine_options_json_1 = __importDefault(require("./engine_options.json"));
const util_1 = require("./util");
describe("Engine", () => {
    before(function () {
        if (!util_1.enginePath)
            this.skip();
    });
    it("should recieve engine options", (done) => {
        const engine = new Engine_1.Engine(util_1.enginePath);
        engine.getOptions((options, id) => {
            chai_1.expect(options).to.deep.eq(engine_options_json_1.default);
            chai_1.expect(id).to.deep.eq({
                name: 'Stockfish 11 64',
                author: "T. Romstad, M. Costalba, J. Kiiski, G. Linscott"
            });
            done();
        });
    });
});
