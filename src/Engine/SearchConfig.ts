/**
 * @interface ISearchConfig
 * @module ISearchConfig
 */
export interface ISearchConfig {
    [key: string]: string | number | null | undefined;
    searchmoves?: string;
    ponder?: null;
    wtime?: number;
    btime?: number;
    winc?: number;
    binc?: number;
    movestogo?: number;
    depth?: number;
    nodes?: number;
    mate?: number;
    movetime?: number;
    infinite?: null;
}

/**
 * @class SearchConfig
 * @module SearchConfig
 */
export class SearchConfig {
    /**
     * @constructor
     * @param {config} ISearchConfig
     */
    constructor(protected config: ISearchConfig) {
        this.config = config;
    }

    /**
     * @public
     * @method
     * @return {string} command
     */
    public getCommand(): string {
        let cmd = "go";
        Object.entries(this.config).forEach(([key, value]) => {
            cmd += ` ${key}`;
            if (value !== null) cmd += ` ${value}`;
        });
        return cmd;
    }
}
