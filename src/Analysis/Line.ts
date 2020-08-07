import { Move } from "./Move";
import { Score } from "./Score";

/**
 * @class Line
 * @module Line
 */
export class Line {
    /**
     * @constructor
     * @param {Score} score
     * @param {Move[]} moves
     */
    constructor(protected score: Score, protected moves: Move[]) {
        this.score = score;
        this.moves = moves;
    }

    /**
     * @public
     * @method
     * @return {Score}
     */
    public getScore(): Score {
        return this.score;
    }

    /**
     * @public
     * @method
     * @return {Move}
     */
    public getFirstMove(): Move {
        return this.moves[0];
    }

    /**
     * @public
     * @method
     * @return {Move[]}
     */
    public getMoves(): Move[] {
        return this.moves;
    }
}
