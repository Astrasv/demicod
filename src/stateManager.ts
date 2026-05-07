import * as fs from 'fs';
import * as path from 'path';

export interface PresentationStep {
    id: number;
    code: string;
    language: string;
    filePath: string;
}

export class StateManager {
    private filePath: string;

    constructor(workspaceRoot: string) {
        const dir = path.join(workspaceRoot, '.demicod');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        this.filePath = path.join(dir, 'presentation.json');
    }

    public getAllSteps(): PresentationStep[] {
        if (!fs.existsSync(this.filePath)) {
            return [];
        }
        const data = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(data);
    }

    public getStepsForFile(filePath: string): PresentationStep[] {
        return this.getAllSteps().filter(s => s.filePath === filePath);
    }

    public addStep(codeChunk: string, language: string, filePath: string): void {
        const steps = this.getAllSteps();
        const fileSteps = steps.filter(s => s.filePath === filePath);
        const newStep: PresentationStep = {
            id: fileSteps.length + 1,
            code: codeChunk,
            language,
            filePath,
        };
        steps.push(newStep);
        this.saveSteps(steps);
    }

    public removeLastStepForFile(filePath: string): void {
        const steps = this.getAllSteps();
        const removeIndex = this.findLastStepIndex(steps, filePath);
        if (removeIndex === -1) return;

        steps.splice(removeIndex, 1);
        this.saveSteps(this.renumberSteps(steps));
    }

    public clearStepsForFile(filePath: string): void {
        const steps = this.getAllSteps().filter(s => s.filePath !== filePath);
        this.saveSteps(this.renumberSteps(steps));
    }

    private findLastStepIndex(steps: PresentationStep[], filePath: string): number {
        let lastIndex = -1;
        steps.forEach((s, i) => {
            if (s.filePath === filePath) {
                lastIndex = i;
            }
        });
        return lastIndex;
    }

    private renumberSteps(steps: PresentationStep[]): PresentationStep[] {
        const fileCounts = new Map<string, number>();
        return steps.map(s => {
            const count = (fileCounts.get(s.filePath) || 0) + 1;
            fileCounts.set(s.filePath, count);
            return { ...s, id: count };
        });
    }

    private saveSteps(steps: PresentationStep[]): void {
        fs.writeFileSync(this.filePath, JSON.stringify(steps, null, 2));
    }
}
