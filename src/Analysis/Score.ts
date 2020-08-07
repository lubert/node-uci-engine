/**
 * @class Score
 * @module Score
 */
export class Score {
    /**
     * @constructor
     * @param {Evaluation} evaluation
     * @param {Move[]} moves
     */
    constructor(protected scoreType: string, protected value: number) {
        this.scoreType = scoreType;
        this.value = value;
    }

    /**
     * @public
     * @method
     * @return {string}
     */
    public getScoreType(): string {
        return this.scoreType;
    }

    /**
     * @public
     * @method
     * @return {number}
     */
    public getValue(): number {
        return this.value;
    }
}
