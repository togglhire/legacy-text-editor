import React from "react";

export interface EditorState {}

export interface EditorProps {
  autoCorrect?: boolean;
  autoFocus?: boolean;
  className?: string;
  placeholder?: any;
  readOnly?: boolean;
  role?: string;
  spellCheck?: boolean;
  tabIndex?: number;
  state: EditorState;
  onChange: (state: EditorState) => void;
}

export declare const TextEditor: React.ComponentType<EditorProps>;

interface ToolbarProps {
  state: EditorState;
  onChange: (state: EditorState) => void;
  onInsertImage: () => void;
}

export declare const Toolbar: React.ComponentType<ToolbarProps>;

export declare const markdownToEditorState: (source: string) => EditorState;
export declare const editorStateToMarkdown: (state: EditorState) => string;

export declare const insertImage: (
  state: EditorState,
  url: string
) => EditorState;

export declare const insertUpload: (
  state: EditorState,
  id: string
) => EditorState;

export declare const replaceUpload: (
  state: EditorState,
  id: string,
  url: string
) => EditorState;

export declare const isEmpty: (state: EditorState) => boolean;
