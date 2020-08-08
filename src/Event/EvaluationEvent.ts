import { Event } from "./Event";
import { IAnalysis } from "../Analysis/IAnalysis";

/**
 * @class EvaluationEvent
 * @extends Event
 * @module EvaluationEvent
 */
export class EvaluationEvent extends Event {
    /**
     * @constructor
     * @param {Analysis} analysis
     */
    constructor(protected analysis: IAnalysis) {
        super("evaluation");

        this.analysis = analysis;
    }

    /**
     * @public
     * @method
     * @return {IAnalysis}
     */
    public getAnalysis(): IAnalysis {
        return this.analysis;
    }
}
