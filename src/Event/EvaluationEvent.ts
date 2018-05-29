import { Event } from "./Event";
import { Analysis } from "../Analysis/Analysis";

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
    constructor(protected analysis: Analysis) {
        super("evaluation");

        this.analysis = analysis;
    }

    /**
     * @public
     * @method
     * @return {Analysis}
     */
    public getAnalysis(): Analysis {
        return this.analysis;
    }
}
