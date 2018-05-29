/**
 * @class Evaluation
 * @module Evaluation
 */
export class Evaluation {
    /**
     * @constructor
     * @param {number} value
     * @param {number} depth
     */
    constructor(protected value: number, protected depth: number) {
        this.value = value;
        this.depth = depth;
    }

    /**
     * @public
     * @method
     * @return {number}
     */
    public getValue(): number {
        return this.value;
    }

    /**
     * @public
     * @method
     * @return {number}
     */
    public getDepth(): number {
        return this.depth;
    }
}
