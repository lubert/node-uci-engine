"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
class Parser {
    static parseUciOk(output) {
        return output === "uciok";
    }
    static parseIsReady(output) {
        return output === "readyok";
    }
    static parseMoves(output) {
        const matches = output.match(/info.*pv\s([a-h1-8\s]+)$/);
        if (matches !== null) {
            let moves = [];
            const parts = matches[1].split(" ");
            for (let i = 0, length = parts.length; i < length; i++) {
                moves.push(parts[i]);
            }
            return moves;
        }
        return null;
    }
    static parseScore(output) {
        const matches = output.match(/score\s(\w+)\s([-\d+]+)/);
        if (matches !== null) {
            return {
                type: matches[1],
                value: parseInt(matches[2]),
            };
        }
        return null;
    }
    static parseBestMove(output) {
        const matches = output.match(/^bestmove\s([a-h][1-8][a-h][1-8])(?:\sponder\s([a-h][1-8][a-h][1-8]))?/);
        if (matches !== null) {
            return [matches[1], matches[2] || null];
        }
        return null;
    }
    static parseCurrmove(output) {
        const matches = output.match(/currmove\s([a-h][1-8][a-h][1-8])/);
        if (matches !== null) {
            return matches[1];
        }
        return null;
    }
    static parseCurrmoveNumber(output) {
        const matches = output.match(/currmovenumber\s(\d+)/);
        if (matches !== null) {
            return parseInt(matches[1]);
        }
        return null;
    }
    static parseDepth(output) {
        const matches = output.match(/^info\sdepth\s(\d+)/);
        if (matches !== null) {
            return parseInt(matches[1]);
        }
        return null;
    }
    static parseHashfull(output) {
        const matches = output.match(/hashfull\s(\d+)/);
        if (matches !== null) {
            return parseInt(matches[1]);
        }
        return null;
    }
    static parseId(output) {
        const matches = output.match(/^id\s(\S+)\s(.+)/);
        if (matches !== null) {
            return {
                name: matches[1],
                value: matches[2]
            };
        }
        return null;
    }
    static parseMultiPv(output) {
        const matches = output.match(/multipv\s(\d+)/);
        if (matches !== null) {
            return parseInt(matches[1]);
        }
        return null;
    }
    static parseNodes(output) {
        const matches = output.match(/nodes\s(\d+)/);
        if (matches !== null) {
            return parseInt(matches[1]);
        }
        return null;
    }
    static parseNps(output) {
        const matches = output.match(/nps\s(\d+)/);
        if (matches !== null) {
            return parseInt(matches[1]);
        }
        return null;
    }
    static parseSeldepth(output) {
        const matches = output.match(/seldepth\s(\d+)/);
        if (matches !== null) {
            return parseInt(matches[1]);
        }
        return null;
    }
    static parseTime(output) {
        const matches = output.match(/time\s(\d+)/);
        if (matches !== null) {
            return parseInt(matches[1]);
        }
        return null;
    }
    static parseOption(output) {
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
exports.Parser = Parser;
