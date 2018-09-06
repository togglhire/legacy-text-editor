import { Value } from "slate";
import * as transforms from "./transforms";

export interface RichTextState {
  type: "rich-text";
  value: Value;
}

export interface RawMarkdownState {
  type: "raw-markdown";
  value: string;
}

export type EditorState = RichTextState | RawMarkdownState;

export const createRichTextState = (value: Value): RichTextState => {
  return { type: "rich-text", value };
};

export const createRawMarkdownState = (value: string): RawMarkdownState => {
  return { type: "raw-markdown", value };
};

export const insertImage = (state: EditorState, url: string): EditorState => {
  if (state.type === "rich-text") {
    return transforms.insertImage(state, url);
  } else {
    return state;
  }
};

export const insertUpload = (state: EditorState, id: string): EditorState => {
  if (state.type === "rich-text") {
    return transforms.insertUpload(state, id);
  } else {
    return state;
  }
};

export const replaceUpload = (
  state: EditorState,
  id: string,
  url: string
): EditorState => {
  if (state.type === "rich-text") {
    return transforms.replaceUpload(state, id, url);
  } else {
    return state;
  }
};
