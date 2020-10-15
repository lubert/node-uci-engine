"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enginePath = void 0;
const macPath = "./engine/stockfish_11_mac_x64";
const linuxPath = "./engine/stockfish_11_linux_x64";
const isMac = process.platform === "darwin";
const isLinux = process.platform === "linux";
exports.enginePath = isMac ? macPath : isLinux ? linuxPath : '';
