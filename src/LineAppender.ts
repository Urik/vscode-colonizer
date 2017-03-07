'use strict';

import { window, workspace } from 'vscode';

export class LineAppender {
    append(value: string) {
        // The code you place here will be executed every time your command is executed

        const editor = window.activeTextEditor;
        const cursorPosition = editor.selection.start;
        const currentLineRange = editor.document.lineAt(cursorPosition).range;
        const text = editor.document.getText(currentLineRange);
        editor.edit((editBuilder) => {
            editBuilder.insert(currentLineRange.end, value);
        });
    }
}