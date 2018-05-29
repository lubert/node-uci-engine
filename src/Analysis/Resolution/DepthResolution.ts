import { Resolution } from "./Resolution";

/**
 * @class DepthResolution
 * @extends Resolution
 * @module DepthResolution
 */
export class DepthResolution extends Resolution {
    /**
     * @constructor
     * @param {number} depth
     */
    public constructor(protected depth: number) {
        super("depth", depth);
    }
}
