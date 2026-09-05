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
});
