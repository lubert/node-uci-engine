/**
 * @class Position
 * @module Position
 */
export class Position {
    /**
     * @constructor
     * @param {string} fen
     */
    constructor(protected fen: string) {
        this.fen = fen;
    }

    /**
     * @public
     * @method
     * @return {string}
     */
    public getFen(): string {
        return this.fen;
    }

    /**
     * @public
     * @function
     * @returns {string}
     */
    public getCommand(): string {
        return `position fen ${this.fen}`;
    }
}
