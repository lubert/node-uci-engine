import "mocha";
import proxyquire from "proxyquire";
import sinon from "sinon";
import { expect } from "chai";
import { EventEmitter } from "events";

describe("Process", () => {
    it("spawns the engine in its own directory so sidecar files resolve", () => {
        const spawnStub = sinon.stub().returns(new EventEmitter());
        const { Process } = proxyquire('../src/Engine/Process', {
            'child_process': { spawn: spawnStub },
        });

        new Process('/opt/engines/caissa/caissa');

        expect(spawnStub.calledOnce).to.equal(true);
        expect(spawnStub.firstCall.args[0]).to.equal('/opt/engines/caissa/caissa');
        expect(spawnStub.firstCall.args[1]).to.deep.equal({ cwd: '/opt/engines/caissa' });
    });
    describe("listen", () => {
        // A fake child whose stdout we feed chunk by chunk, with os.EOL set
        // per test: the split must not depend on the platform's line ending.
        function listen(eol: string, chunks: string[]): string[] {
            const child: any = new EventEmitter();
            child.stdout = new EventEmitter();
            const { Process } = proxyquire('../src/Engine/Process', {
                'child_process': { spawn: sinon.stub().returns(child) },
                'os': { EOL: eol },
            });
            const lines: string[] = [];
            new Process('/opt/engines/e/e').listen((l: string) => lines.push(l));
            for (const c of chunks) child.stdout.emit("data", Buffer.from(c));
            return lines;
        }

        it("splits LF output on Windows", () => {
            expect(listen("\r\n", ["id name Engine\nuciok\nreadyok\n"])).to.deep.equal([
                "id name Engine", "uciok", "readyok",
            ]);
        });

        it("splits CRLF output on macOS and Linux", () => {
            expect(listen("\n", ["uciok\r\nreadyok\r\n"])).to.deep.equal(["uciok", "readyok"]);
        });

        it("joins a line split across two reads", () => {
            expect(listen("\n", ["info depth 1\nbestm", "ove e2e4 ponder e7e5\n"])).to.deep.equal([
                "info depth 1", "bestmove e2e4 ponder e7e5",
            ]);
        });

        it("joins a CRLF split between its two bytes", () => {
            expect(listen("\r\n", ["readyok\r", "\nuciok\r\n"])).to.deep.equal(["readyok", "uciok"]);
        });
    });
});
