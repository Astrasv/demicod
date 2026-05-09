import * as assert from 'assert';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { StateManager, PresentationStep } from '../stateManager';

suite('StateManager', () => {
    let testDir: string;
    let stateManager: StateManager;

    setup(() => {
        testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'demicod-test-'));
        stateManager = new StateManager(testDir);
    });

    teardown(() => {
        fs.rmSync(testDir, { recursive: true, force: true });
    });

    test('starts with no steps', () => {
        const steps = stateManager.getAllSteps();
        assert.strictEqual(steps.length, 0);
    });

    test('adds a step', () => {
        stateManager.addStep('console.log("hello")', 'javascript', '/test/file.js');
        const steps = stateManager.getAllSteps();
        assert.strictEqual(steps.length, 1);
        assert.strictEqual(steps[0].code, 'console.log("hello")');
        assert.strictEqual(steps[0].language, 'javascript');
        assert.strictEqual(steps[0].filePath, '/test/file.js');
    });

    test('assigns sequential IDs per file', () => {
        stateManager.addStep('step1', 'js', '/a.js');
        stateManager.addStep('step2', 'js', '/a.js');
        stateManager.addStep('step1', 'ts', '/b.ts');

        const aSteps = stateManager.getStepsForFile('/a.js');
        assert.strictEqual(aSteps.length, 2);
        assert.strictEqual(aSteps[0].id, 1);
        assert.strictEqual(aSteps[1].id, 2);

        const bSteps = stateManager.getStepsForFile('/b.ts');
        assert.strictEqual(bSteps.length, 1);
        assert.strictEqual(bSteps[0].id, 1);
    });

    test('filters steps by file path', () => {
        stateManager.addStep('code1', 'js', '/a.js');
        stateManager.addStep('code2', 'ts', '/b.ts');

        const steps = stateManager.getStepsForFile('/a.js');
        assert.strictEqual(steps.length, 1);
        assert.strictEqual(steps[0].code, 'code1');
    });

    test('removes last step for a file', () => {
        stateManager.addStep('step1', 'js', '/a.js');
        stateManager.addStep('step2', 'js', '/a.js');
        stateManager.addStep('step1', 'ts', '/b.ts');

        stateManager.removeLastStepForFile('/a.js');

        const aSteps = stateManager.getStepsForFile('/a.js');
        assert.strictEqual(aSteps.length, 1);
        assert.strictEqual(aSteps[0].code, 'step1');

        const bSteps = stateManager.getStepsForFile('/b.ts');
        assert.strictEqual(bSteps.length, 1);
    });

    test('renumbers after removal', () => {
        stateManager.addStep('step1', 'js', '/a.js');
        stateManager.addStep('step2', 'js', '/a.js');
        stateManager.addStep('step3', 'js', '/a.js');

        stateManager.removeLastStepForFile('/a.js');
        stateManager.removeLastStepForFile('/a.js');

        const steps = stateManager.getStepsForFile('/a.js');
        assert.strictEqual(steps.length, 1);
        assert.strictEqual(steps[0].id, 1);
    });

    test('clears all steps for a file', () => {
        stateManager.addStep('step1', 'js', '/a.js');
        stateManager.addStep('step2', 'js', '/a.js');
        stateManager.addStep('step1', 'ts', '/b.ts');

        stateManager.clearStepsForFile('/a.js');

        const aSteps = stateManager.getStepsForFile('/a.js');
        assert.strictEqual(aSteps.length, 0);

        const bSteps = stateManager.getStepsForFile('/b.ts');
        assert.strictEqual(bSteps.length, 1);
    });
});
