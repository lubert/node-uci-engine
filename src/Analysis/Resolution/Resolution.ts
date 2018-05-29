import { IOption } from "../../Console/IOption";

/**
 * @abstract
 * @class Resolution
 * @module Resolution
 */
export abstract class Resolution implements IOption {
    /**
     * @constructor
     * @param {string} property
     * @param {string|number} value
     */
    constructor(protected property: string, protected value: string | number) {
        this.property = property;
        this.value = value;
    }

    /**
     * @public
     * @method
     * @return {string}
     */
    public getProperty(): string {
        return this.property;
    }

    /**
     * @public
     * @method
     * @return {string|number}
     */
    public getValue(): string | number {
        return this.value;
    }

    /**
     * @public
     * @method
     * @return {string}
     */
    public getInput(): string {
        return `${this.property} ${this.value}`;
    }
}
