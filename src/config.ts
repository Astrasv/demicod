import * as vscode from 'vscode';

const CONFIG_SECTION = 'demicod';

export function getStepSeparator(): string {
    const config = vscode.workspace.getConfiguration(CONFIG_SECTION);
    return config.get<string>('stepSeparator', '\n');
}
