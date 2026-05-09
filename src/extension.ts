import * as vscode from 'vscode';
import { StateManager } from './stateManager';
import { registerCommands } from './commands';

export function activate(context: vscode.ExtensionContext) {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        vscode.window.showErrorMessage('Demicod requires an open workspace folder.');
        return;
    }

    const stateManager = new StateManager(workspaceFolders[0].uri.fsPath);
    registerCommands(context, stateManager);
}

export function deactivate() {}
