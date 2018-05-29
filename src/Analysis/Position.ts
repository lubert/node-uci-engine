import { IOption } from "../Console/IOption";

/**
 * @class Position
 * @implements IOption
 * @module Position
 */
export class Position implements IOption {
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
    public getInput(): string {
        return `position fen ${this.fen}`;
    }
}
