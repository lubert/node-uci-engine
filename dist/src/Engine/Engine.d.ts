import { Event } from "../Event/Event";
import { Handler } from "../Event/Handler";
import { Process } from "./Process";
import { IPosition } from "../Analysis/IPosition";
import { IResult } from "../Analysis/IResult";
import { IEngineOption } from "./IEngineOption";
import { BestMoveEvent } from "src/Event/BestMoveEvent";
import { ISearchConfig } from "./ISearchConfig";
declare type EventCallback = (event: Event) => void;
export declare class Engine {
    protected process: Process;
    protected handler: Handler;
    protected id: Record<string, string>;
    protected options: IEngineOption[];
    protected isStarted: boolean;
    constructor(path: string);
    analyzePosition(position: IPosition, config: ISearchConfig, callback: (result: IResult) => void): void;
    go(position: IPosition, config: ISearchConfig, callback?: (bestMove: BestMoveEvent) => void): void;
    getOptions(callback: (options: IEngineOption[], id: Record<string, string>) => void): void;
    on(name: string, callback: EventCallback): () => void;
    once(name: string, callback: EventCallback): void;
    ponderhit(): void;
    setOptions(config: Record<string, string>): void;
    start(callback: (options: IEngineOption[], id: Record<string, string>) => void, config?: Record<string, string>): void;
    stop(): void;
    quit(): void;
}
export {};
