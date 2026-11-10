import { execSync } from "child_process";
import { existsSync } from "fs";

// A bundled binary under ./engine wins; otherwise the system stockfish on
// PATH; neither means the integration tests skip.
const bundled =
  process.platform === "darwin"
    ? "./engine/stockfish_11_mac_x64"
    : process.platform === "linux"
      ? "./engine/stockfish_11_linux_x64"
      : "";

function systemStockfish(): string {
  try {
    return execSync("which stockfish", { encoding: "utf-8" }).trim();
  } catch {
    return "";
  }
}

export const enginePath =
  bundled && existsSync(bundled) ? bundled : systemStockfish();
