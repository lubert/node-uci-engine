import { Move } from "../Analysis/Move";
import { Line } from "../Analysis/Line";
import { Evaluation } from "../Analysis/Evaluation";
import { IEngineOption } from "../Engine/IEngineOption";

/**
 * @class Parser {
 * @module Parser {
 */
export class Parser {
    /**
     * @public
     * @static
     * @method
     * @param {string} output
     * @return {boolean}
     */
    public static parseUciOk(output: string): boolean {
        return output === "uciok";
    }

    /**
     * @public
     * @static
     * @method
     * @param {string} output
     * @return {boolean}
     */
    public static parseIsReady(output: string): boolean {
        return output === "readyok";
    }

    /**
     * @public
     * @static
     * @method
     * @param {string} output
     * @return {Move[]|null}
     */
    public static parseMoves(output: string): Move[] | null {
        const matches = output.match(/info.*pv\s([a-h1-8\s]+)$/)

        if (matches !== null) {
            let moves: Move[] = [];
            const parts = matches[1].split(" ");
            for (let i = 0, length = parts.length; i < length; i++) {
                moves.push(new Move(parts[i]));
            }
            return moves;
        }

        return null;
    }

    /**
     * @public
     * @static
     * @method
     * @param {string} output
     * @return {Line|null}
     */
    public static parseLine(output: string): Line | null {
        const matches = output.match(/info\sdepth\s(\d+).*cp\s([-\d+]+).*\spv\s([a-h1-8\s]+)$/);

        if (matches !== null) {
            let moves: Move[] = [];

            const parts = matches[3].split(" ");

            for (let i = 0, length = parts.length; i < length; i++) {
                moves.push(new Move(parts[i]));
            }

            return new Line(
                new Evaluation(parseFloat(matches[2]), parseInt(matches[1])),
                moves
            );
        }

        return null;
    }

    /**
     * @public
     * @static
     * @method
     * @param {string} output
     * @return {string|null}
     */
    public static parseBestMove(output: string): [string, string | null] | null {
        const matches = output.match(/^bestmove\s([a-h][1-8][a-h][1-8])(?:\sponder\s([a-h][1-8][a-h][1-8]))?/);

        if (matches !== null) {
            return [matches[1], matches[2] || null];
        }

        return null;
    }

    /**
     * @public
     * @static
     * @method
     * @param {string} output
     * @return {number|null}
     */
    public static parseDepth(output: string): number | null {
        const matches = output.match(/^info\sdepth\s(\d+)/);

        if (matches !== null) {
            return parseInt(matches[1]);
        }

        return null;
    }

    /**
     * @public
     * @static
     * @method
     * @param {string} output
     * @return {number|null}
     */
    public static parseTime(output: string): number | null {
        const matches = output.match(/time\s(\d+)/);

        if (matches !== null) {
            return parseInt(matches[1]);
        }

        return null;
    }

    /**
     * @public
     * @static
     * @method
     * @param {string} output
     * @return {number|null}
     */
    public static parseEvaluation(output: string): number | null {
        const matches = output.match(/cp\s([-\d+]+)/);

        if (matches !== null) {
            return parseFloat(matches[1]);
        }

        return null;
    }

    /**
     * @public
     * @static
     * @method
     * @param {string} output
     * @return {IEngineOption|null}
     */
    public static parseOption(output: string): IEngineOption | null {
        const matches = output.match(/option\sname\s(.+)\stype\s(\S+)(?:\sdefault\s(\S+)?)?(?:\smin\s(\S+))?(?:\smax\s(\S+))?/);

        if (matches !== null) {
            return {
                name: matches[1],
                type: matches[2],
                default: matches[3] || null,
                min: matches[4] || null,
                max: matches[5] || null,
            };
        }

        return null;
    }
}
