import { spawn, ChildProcess } from "child_process";
import { EOL } from "os";

/**
 * @class Process
 * @module Process
 */
export class Process {
    /**
     * @protected
     * @type {ChildProcess}
     */
    protected child: ChildProcess;

    protected _error: Error | null = null;

    /**
     * @constructor
     * @param {string} path
     */
    constructor(path: string) {
        this.child = spawn(path);
        this.child.on("error", (err) => {
            this._error = err;
        });
    }

    public get isRunning(): boolean {
        return !!(this.child.pid && this.child.exitCode == null);
    }

    public get error(): Error | null {
        return this._error;
    }

    /**
     * @public
     * @method
     * @param {string} command
     * @param {string[]} options
     * @return {void}
     */
    public execute(command: string, ...options: string[]): void {
        if (options.length > 0) {
            this.child.stdin?.write(`${command} ${options.join(" ")}${EOL}`);
        } else {
            this.child.stdin?.write(`${command}${EOL}`);
        }
    }

    /**
     * @public
     * @method
     * @param {Function} callback
     * @return {void}
     */
    public listen(callback: (output: string) => void): void {
        this.child.stdout?.on("data", function(this: Process, data: string[]): void {
            const output: string[] = data.toString().split(EOL).filter(x => x);

            for (let i = 0, length = output.length; i < length; i++) {
                callback(output[i]);
            }
        });
    }

    /**
     * @public
     * @method
     * @return {void}
     */
    public kill(): void {
        this.child.kill();
    }
}
