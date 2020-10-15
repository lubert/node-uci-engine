/// <reference types="node" />
import { EventEmitter } from "events";
import { Event } from "./Event";
export declare class Handler extends EventEmitter {
    handle(output: string): void;
    protected emitEvent(event: Event): void;
}
