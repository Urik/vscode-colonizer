'use strict';

import { ExtensionContext, commands, workspace } from 'vscode';
import { LineAppender } from './LineAppender';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    const lineAppender = new LineAppender();
    const value = workspace.getConfiguration('colonizer').get('value') || ';';
    
    const colonizeDisposable = commands.registerCommand('extension.colonize', () => {
        lineAppender.append(String(value));
    });
    const colonizeAndBreakDisposable = commands.registerCommand('extension.colonizeAndBreakLine', () => {
        lineAppender.append(String(value + '\r\n'));
    });


    context.subscriptions.push(colonizeDisposable, colonizeAndBreakDisposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}