import { Event } from "./Event";
import { IAnalysis } from "../Analysis/IAnalysis";
export declare class EvaluationEvent extends Event {
    protected analysis: IAnalysis;
    constructor(analysis: IAnalysis);
    getAnalysis(): IAnalysis;
}
