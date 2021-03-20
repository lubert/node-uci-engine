import { IScore } from "../Analysis/IScore";
import { IVariation } from "../Analysis/IVariation";
import { IEngineOption } from "../Engine/IEngineOption";
import { IEngineId } from "src/Engine/IEngineId";

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
     * @return {string[]|null}
     */
    public static parseMoves(output: string): string[] | null {
        const matches = output.match(/info.*pv\s([a-h1-8\s]+)$/)

        if (matches !== null) {
            let moves: string[] = [];
            const parts = matches[1].split(" ");
            for (let i = 0, length = parts.length; i < length; i++) {
                moves.push(parts[i]);
            }
            return moves;
        }

        return null;
    }

    /**
     * Engines give us multiple variations and their scores, and we want to
     * process and return all those. This method does that.
     *
     * Because this is called with single lines as input (not the entire
     * UCI output), we need to compare it against previous lines to keep just the
     * latest depth for a given MultiPv.
     *
     * @public
     * @static
     * @method
     * @param {string} output
     * @param {Record<number, IVariation>} candidates: this will inject the
     *        cached from previous analysis iterations.
     * @return {IVariation[]|null}
     */
    public static parsePrincipalVariations(output: string, candidates: Record<number, IVariation> = {}): Record<number, IVariation> {
        candidates = Object.assign({}, candidates)
        /**
         * This is an example of output line:
         *
         * info depth 2 seldepth 2 multipv 3 score cp 121 nodes 402 nps 402000 tbhits 0 time 1 pv a2a3 c5b3
         */
        const regex = /info.*\sdepth\s([0-9]+).*multipv\s([0-9]+).*score\s(.*)\s(-?[0-9]+).*nodes.*time\s([0-9]+).*pv\s([a-h1-8\s]+)$/
        const matches = output.trim().match(regex)

        if (matches !== null) {
            let depth: number = parseInt(matches[1])
            let pv: number = parseInt(matches[2])
            let scoreType: string = matches[3]
            let score: number = parseInt(matches[4])
            let time: number = parseInt(matches[5])
            let moves: string = matches[6]

            /**
             * If for whatever reason we get MultiPv lines out of order, let's
             * keep the one with highest depth.
             */
            if (!candidates[pv] || candidates[pv].depth < depth) {
                candidates[pv] = {
                    depth: depth,
                    score: score,
                    scoreType: scoreType,
                    timeMs: time,
                    moves: moves
                }
            }
        }

        return candidates
    }

    /**
     * @public
     * @static
     * @method
     * @param {string} output
     * @return {Score|null}
     */
    public static parseScore(output: string): IScore | null {
        const matches = output.match(/score\s(\w+)\s([-\d+]+)/);

        if (matches !== null) {
            return {
                type: matches[1],
                value: parseInt(matches[2]),
            };
        }

        return null;
    }

    /**
     * @public
     * @staticp
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
     * @staticp
     * @method
     * @param {string} output
     * @return {string|null}
     */
    public static parseCurrmove(output: string): string | null {
        const matches = output.match(/currmove\s([a-h][1-8][a-h][1-8])/);

        if (matches !== null) {
            return matches[1];
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
    public static parseCurrmoveNumber(output: string): number | null {
        const matches = output.match(/currmovenumber\s(\d+)/)

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
    public static parseDepth(output: string): number | null {
        const matches = output.match(/^info\sdepth\s(\d+)/)

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
    public static parseHashfull(output: string): number | null {
        const matches = output.match(/hashfull\s(\d+)/)

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
     * @return {IEngineId|null}
     */
    public static parseId(output: string): IEngineId | null {
        const matches = output.match(/^id\s(\S+)\s(.+)/)

        if (matches !== null) {
            return {
                name: matches[1],
                value: matches[2]
            };
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
    public static parseMultiPv(output: string): number | null {
        const matches = output.match(/multipv\s(\d+)/)

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
    public static parseNodes(output: string): number | null {
        const matches = output.match(/nodes\s(\d+)/)

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
    public static parseNps(output: string): number | null {
        const matches = output.match(/nps\s(\d+)/)

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
    public static parseSeldepth(output: string): number | null {
        const matches = output.match(/seldepth\s(\d+)/)

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
        const matches = output.match(/time\s(\d+)/)

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
     * @return {IEngineOption|null}
     */
    public static parseOption(output: string): IEngineOption | null {
        const matches = output.match(/option\sname\s(.+)\stype\s(\S+)(?:\sdefault\s(\S+)?)?(?:\smin\s(\S+))?(?:\smax\s(\S+))?/);
        const vars = [...output.matchAll(/(?:\svar\s(\S+))/g)].map((match) => match[1]);

        if (matches !== null) {
            return {
                name: matches[1],
                type: matches[2],
                default: matches[3] || null,
                vars: vars.length ? vars : null,
                min: matches[4] || null,
                max: matches[5] || null,
            };
        }

        return null;
    }
}
