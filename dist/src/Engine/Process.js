"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Process = void 0;
const child_process_1 = require("child_process");
const os_1 = require("os");
class Process {
    constructor(path) {
        this._error = null;
        this.child = child_process_1.spawn(path);
        this.child.on('error', (err) => {
            this._error = err;
        });
    }
    get isRunning() {
        return this.child.exitCode == null;
    }
    get error() {
        return this._error;
    }
    execute(command, ...options) {
        var _a, _b;
        if (options.length > 0) {
            (_a = this.child.stdin) === null || _a === void 0 ? void 0 : _a.write(`${command} ${options.join(" ")}${os_1.EOL}`);
        }
        else {
            (_b = this.child.stdin) === null || _b === void 0 ? void 0 : _b.write(`${command}${os_1.EOL}`);
        }
    }
    listen(callback) {
        var _a;
        (_a = this.child.stdout) === null || _a === void 0 ? void 0 : _a.on("data", function (data) {
            const output = data.toString().split(os_1.EOL).filter(x => x);
            for (let i = 0, length = output.length; i < length; i++) {
                callback(output[i]);
            }
        });
    }
}
exports.Process = Process;
