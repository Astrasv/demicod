import * as vscode from 'vscode';
import * as path from 'path';
import { PresentationStep } from './stateManager';
import { getStepSeparator } from './config';

export class PresentationSession {
    private static _active: PresentationSession | undefined;

    private _document: vscode.TextDocument;
    private _editor: vscode.TextEditor;
    private _steps: PresentationStep[];
    private _currentIndex: number;
    private _tempUri: vscode.Uri;
    private _disposables: vscode.Disposable[] = [];
    private _statusPrev: vscode.StatusBarItem;
    private _statusNext: vscode.StatusBarItem;
    private _statusStop: vscode.StatusBarItem;
    private _statusCounter: vscode.StatusBarItem;

    private constructor(doc: vscode.TextDocument, editor: vscode.TextEditor, steps: PresentationStep[], startIndex: number, tempUri: vscode.Uri) {
        this._document = doc;
        this._editor = editor;
        this._steps = steps;
        this._currentIndex = startIndex;
        this._tempUri = tempUri;

        this._statusPrev = this._createStatusItem(vscode.StatusBarAlignment.Left, 100, '$(arrow-left) Prev', 'Previous step', 'demicod.previousStep');
        this._statusNext = this._createStatusItem(vscode.StatusBarAlignment.Left, 99, '$(arrow-right) Next', 'Next step', 'demicod.nextStep');
        this._statusStop = this._createStatusItem(vscode.StatusBarAlignment.Left, 98, '$(primitive-square) Stop', 'End presentation', 'demicod.endPresentation');
        this._statusCounter = this._createStatusItem(vscode.StatusBarAlignment.Right, 100, '', 'Step-by-step code presentation');

        this._updateContent();
        this._refreshStatusBar();
    }

    static get isActive(): boolean {
        return PresentationSession._active !== undefined;
    }

    static get active(): PresentationSession | undefined {
        return PresentationSession._active;
    }

    static async start(steps: PresentationStep[], startIndex: number = 0): Promise<PresentationSession> {
        if (PresentationSession._active) {
            PresentationSession._active.end();
        }

        const sourceFilePath = steps[0].filePath;
        const ext = path.extname(sourceFilePath);
        const dir = path.dirname(sourceFilePath);
        const base = path.basename(sourceFilePath, ext);
        const tempFilePath = path.join(dir, `${base}.__demicod__${ext}`);
        const uri = vscode.Uri.file(tempFilePath);

        await vscode.workspace.fs.writeFile(uri, new Uint8Array());

        const document = await vscode.workspace.openTextDocument(uri);
        const editor = await vscode.window.showTextDocument(document);
        const session = new PresentationSession(document, editor, steps, startIndex, uri);
        PresentationSession._active = session;
        return session;
    }

    get currentIndex(): number {
        return this._currentIndex;
    }

    get totalSteps(): number {
        return this._steps.length;
    }

    next(): void {
        if (this._currentIndex < this._steps.length - 1) {
            this._currentIndex++;
            this._updateContent();
            this._refreshStatusBar();
        }
    }

    previous(): void {
        if (this._currentIndex > 0) {
            this._currentIndex--;
            this._updateContent();
            this._refreshStatusBar();
        }
    }

    end(): void {
        PresentationSession._active = undefined;
        this.dispose();
    }

    private _createStatusItem(alignment: vscode.StatusBarAlignment, priority: number, text: string, tooltip: string, command?: string): vscode.StatusBarItem {
        const item = vscode.window.createStatusBarItem(alignment, priority);
        item.text = text;
        item.tooltip = tooltip;
        if (command) {
            item.command = command;
        }
        this._disposables.push(item);
        return item;
    }

    private _accumulatedCode(): string {
        const separator = getStepSeparator();
        return this._steps
            .slice(0, this._currentIndex + 1)
            .map(s => s.code)
            .join(separator);
    }

    private _updateContent(): void {
        if (this._editor.document !== this._document) {
            this.end();
            return;
        }

        const code = this._accumulatedCode();
        const fullRange = new vscode.Range(
            this._document.positionAt(0),
            this._document.positionAt(Math.max(0, this._document.getText().length))
        );
        this._editor.edit(editBuilder => {
            editBuilder.replace(fullRange, code);
        });
    }

    private _refreshStatusBar(): void {
        this._statusCounter.text = `Demicod Step ${this._currentIndex + 1} / ${this._steps.length}`;
        this._statusCounter.show();
    }

    private dispose(): void {
        while (this._disposables.length) {
            const d = this._disposables.pop();
            if (d) d.dispose();
        }
        if (PresentationSession._active === this) {
            PresentationSession._active = undefined;
        }
        try {
            vscode.workspace.fs.delete(this._tempUri);
        } catch {
            // temp file may already be gone
        }
    }
}
