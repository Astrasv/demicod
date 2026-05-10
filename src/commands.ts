import * as vscode from 'vscode';
import { StateManager } from './stateManager';
import { PresentationSession } from './presentationSession';

export function registerCommands(context: vscode.ExtensionContext, stateManager: StateManager): void {
    context.subscriptions.push(
        vscode.commands.registerCommand('demicod.addStep', () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                return;
            }

            const selection = editor.selection;
            if (selection.isEmpty) {
                vscode.window.showWarningMessage('Select code first to add a step.');
                return;
            }

            const filePath = editor.document.uri.fsPath;
            stateManager.addStep(editor.document.getText(selection), editor.document.languageId, filePath);
            const count = stateManager.getStepsForFile(filePath).length;
            vscode.window.showInformationMessage(`Step ${count} added for ${editor.document.fileName}.`);
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('demicod.startPresentation', async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showWarningMessage('Open a file first to start its presentation.');
                return;
            }

            const filePath = editor.document.uri.fsPath;
            const steps = stateManager.getStepsForFile(filePath);
            if (steps.length === 0) {
                vscode.window.showWarningMessage(`No steps for ${editor.document.fileName}. Select code and add steps first.`);
                return;
            }

            await PresentationSession.start(steps);
            vscode.window.showInformationMessage(`Presenting ${editor.document.fileName} — use status bar buttons or shortcuts to navigate.`);
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('demicod.nextStep', () => {
            const session = PresentationSession.active;
            if (session) {
                session.next();
            }
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('demicod.previousStep', () => {
            const session = PresentationSession.active;
            if (session) {
                session.previous();
            }
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('demicod.endPresentation', () => {
            const session = PresentationSession.active;
            if (session) {
                session.end();
            }
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('demicod.clearSteps', () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                return;
            }

            stateManager.clearStepsForFile(editor.document.uri.fsPath);
            vscode.window.showInformationMessage(`Steps cleared for ${editor.document.fileName}.`);
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('demicod.removeLastStep', () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                return;
            }

            const filePath = editor.document.uri.fsPath;
            const steps = stateManager.getStepsForFile(filePath);
            if (steps.length === 0) {
                vscode.window.showWarningMessage(`No steps for ${editor.document.fileName}.`);
                return;
            }

            stateManager.removeLastStepForFile(filePath);
            vscode.window.showInformationMessage(`Removed last step for ${editor.document.fileName}.`);
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('demicod.openKeyboardShortcuts', () => {
            vscode.commands.executeCommand('workbench.action.openGlobalKeybindings', 'demicod');
        })
    );
}
