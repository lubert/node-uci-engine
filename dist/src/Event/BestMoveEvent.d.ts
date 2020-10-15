import { Event } from "./Event";
export declare class BestMoveEvent extends Event {
    protected bestMove: string;
    protected ponder: string | null;
    constructor(bestMove: string, ponder: string | null);
    getBestMove(): string;
    getPonder(): string | null;
}
