'use strict';

import { window, workspace, Selection, TextEditor } from 'vscode';
import { AbsentEditorException } from './AbsentEditorException';

/**
 * Appends values to an editor's line.
 */
export class LineAppender {
    append(editor: TextEditor, value: string) {
        if (!editor) {
            throw new AbsentEditorException();
        }

        const cursorPosition = editor.selection.start;
        const currentLineRange = editor.document.lineAt(cursorPosition).range;
        const text = editor.document.getText(currentLineRange);
        editor.edit((editBuilder) => {
            editBuilder.insert(currentLineRange.end, value);
            editor.selection = new Selection(currentLineRange.end, currentLineRange.end);
        });
    }
}