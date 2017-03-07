'use strict';

import { window, workspace, Selection, TextEditor } from 'vscode';
import { AbsentEditorException } from './AbsentEditorException';

/**
 * Appends values to an editor's line.
 */
export class LineAppender {
    constructor(private editor: TextEditor) {}

    append(value: string) {
        // The code you place here will be executed every time your command is executed

        if (!this.editor) {
            throw new AbsentEditorException();
        }

        const cursorPosition = this.editor.selection.start;
        const currentLineRange = this.editor.document.lineAt(cursorPosition).range;
        const text = this.editor.document.getText(currentLineRange);
        this.editor.edit((editBuilder) => {
            editBuilder.insert(currentLineRange.end, value);
            this.editor.selection = new Selection(currentLineRange.end, currentLineRange.end);
        });
    }
}