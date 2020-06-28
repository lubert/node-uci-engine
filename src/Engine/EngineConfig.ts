/**
 * @interface IEngineConfig
 * @module IEngineConfig
 */
export interface IEngineConfig {
    [key: string]: string;
}

/**
 * @class EngineConfig
 * @module EngineConfig
 */
export class EngineConfig {
    /**
     * @constructor
     * @param {config} IEngineConfig
     */
    constructor(protected config: IEngineConfig) {
        this.config = config;
    }

    /**
     * @public
     * @method
     * @return {string[]} commands
     */
    public getCommands(): string[] {
        return Object.entries(this.config).map(
            ([key, value]) => `setoption name ${key} value ${value}`
        );
    }
}
