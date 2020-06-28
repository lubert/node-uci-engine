/**
 * @interface IGoConfig
 * @module IGoConfig
 */
export interface IGoConfig {
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
