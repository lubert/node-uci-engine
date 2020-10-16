/// <reference types="node" />
import { ChildProcess } from "child_process";
export declare class Process {
    protected child: ChildProcess;
    protected _error: Error | null;
    constructor(path: string);
    get isRunning(): boolean;
    get error(): Error | null;
    execute(command: string, ...options: string[]): void;
    listen(callback: (output: string) => void): void;
    kill(): void;
}
