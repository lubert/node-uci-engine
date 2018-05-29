import { Evaluation } from "./Evaluation";
import { Move } from "./Move";

/**
 * @class Line
 * @module Line
 */
export class Line {
    /**
     * @constructor
     * @param {Evaluation} evaluation
     * @param {Move[]} moves
     */
    constructor(protected evaluation: Evaluation, protected moves: Move[]) {
        this.evaluation = evaluation;
        this.moves = moves;
    }

    /**
     * @public
     * @method
     * @return {Evaluation}
     */
    public getEvaluation(): Evaluation {
        return this.evaluation;
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
