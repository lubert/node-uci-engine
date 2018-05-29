/**
 * @class Move
 * @module Move
 */
export class Move {
    /**
     * @constructor
     * @param {string} notation
     */
    constructor(protected notation: string) {
        this.notation = notation;
    }

    /**
     * @public
     * @method
     * @return {string}
     */
    public getNotation(): string {
        return this.notation;
    }
}
