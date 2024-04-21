/**
 * @interface IEngineOption
 * @module IEngineOption
 */
export interface IEngineOption {
  name: string;
  type: string;
  default: string | null;
  vars: string[] | null;
  min: string | null;
  max: string | null;
}
