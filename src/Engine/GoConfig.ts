import { IGoConfig } from "./IGoConfig";

/**
 * @class GoConfig
 * @module GoConfig
 */
export class GoConfig {
    /**
     * @constructor
     * @param {config} IGoConfig
     */
    constructor(protected config: IGoConfig) {
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
