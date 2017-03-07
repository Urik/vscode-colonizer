'use strict';

import { ExtensionContext, commands, workspace } from 'vscode';
import { LineAppender } from './LineAppender';
import { AbsentEditorException } from './AbsentEditorException';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    const lineAppender = new LineAppender();
    const value = String(workspace.getConfiguration('colonizer').get('value')) || ';';

    const colonizeDisposable = commands.registerCommand('extension.colonize', () => {
        appendLine(value);
    });
    const colonizeAndBreakDisposable = commands.registerCommand('extension.colonizeAndBreakLine', () => {
        appendLine(value + '\r\n');
    });

    context.subscriptions.push(colonizeDisposable, colonizeAndBreakDisposable);

    function appendLine(value: string) {
        try {
            lineAppender.append(String(value));
        } catch (err) {
            if (err instanceof AbsentEditorException) {
                console.error('Can not append without an editor.');
            }
        }
    }
}