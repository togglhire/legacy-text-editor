import { Value } from "slate";

export interface EditorProps {
  autoCorrect?: boolean;
  autoFocus?: boolean;
  className?: string;
  placeholder?: any;
  readOnly?: boolean;
  role?: string;
  spellCheck?: boolean;
  tabIndex?: number;
}

export interface RichTextState {
  type: "rich-text";
  value: Value;
}

export type EditorState = RichTextState;
