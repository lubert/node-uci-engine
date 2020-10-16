"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Engine = void 0;
const Handler_1 = require("../Event/Handler");
const Process_1 = require("./Process");
class Engine {
    constructor(path) {
        this.process = new Process_1.Process(path);
        if (!this.process.isRunning) {
            if (this.process.error)
                throw this.process.error;
            throw new Error("Process failed to start");
        }
        this.handler = new Handler_1.Handler();
        this.id = {};
        this.options = [];
        this.isStarted = false;
        this.process.listen((output) => {
            this.handler.handle(output);
        });
    }
    get isRunning() {
        return this.process.isRunning;
    }
    analyzePosition(position, config, callback) {
        let lastAnalysis;
        const removeListener = this.on("evaluation", (event) => {
            const evalEvent = event;
            if (evalEvent.getAnalysis().moves !== null) {
                lastAnalysis = evalEvent.getAnalysis();
            }
        });
        this.go(position, config, (bestMove) => {
            this.stop();
            removeListener();
            if (lastAnalysis !== undefined) {
                const result = {
                    analysis: lastAnalysis,
                    bestMove: bestMove.getBestMove(),
                    config,
                    position,
                };
                callback(result);
            }
        });
    }
    go(position, config, callback) {
        if (callback) {
            this.once("bestmove", (event) => {
                const bestMoveEvent = event;
                callback(bestMoveEvent);
            });
        }
        let cmd = "go";
        Object.entries(config).forEach(([key, value]) => {
            cmd += ` ${key}`;
            if (value !== null)
                cmd += ` ${value}`;
        });
        this.process.execute(`position fen ${position.fen}`);
        this.process.execute(cmd);
    }
    getOptions(callback) {
        this.options = [];
        this.id = {};
        this.process.execute("uci");
        const removeIdListener = this.on("engineid", (event) => {
            const idEvent = event;
            const id = idEvent.getId();
            this.id[id.name] = id.value;
        });
        const removeOptionListener = this.on("option", (event) => {
            const optEvent = event;
            this.options.push(optEvent.getOption());
        });
        this.once("uciok", () => {
            callback(this.options, this.id);
            removeOptionListener();
            removeIdListener();
        });
    }
    on(name, callback) {
        this.handler.on(name, callback);
        return () => this.handler.removeListener(name, callback);
    }
    once(name, callback) {
        this.handler.once(name, callback);
    }
    ponderhit() {
        this.process.execute("ponderhit");
    }
    setOptions(config) {
        Object.entries(config).forEach(([key, value]) => this.process.execute(`setoption name ${key} value ${value}`));
    }
    start(callback, config) {
        if (this.isStarted) {
            return callback(this.options, this.id);
        }
        this.once("ready", () => {
            this.isStarted = true;
            callback(this.options, this.id);
        });
        this.getOptions(() => {
            if (config)
                this.setOptions(config);
            this.process.execute("isready");
        });
    }
    stop() {
        this.process.execute("stop");
    }
    quit() {
        this.process.execute("quit");
    }
}
exports.Engine = Engine;
