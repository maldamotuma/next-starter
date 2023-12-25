import { EditorState, LexicalEditor } from "lexical";

export type statusTypes = "pending" | "idle" | "rejected";
export type EditorStateRef = {
    editor: LexicalEditor | null;
    editorState: EditorState | null;
}