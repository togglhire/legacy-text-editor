import { Value } from "slate";
import * as transforms from "./transforms";
import { node } from "prop-types";
import { blocks } from "./constants";

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

export const isEmpty = (state: EditorState): boolean => {
  if (state.type === "rich-text") {
    if (state.value.document.nodes.isEmpty()) return true;

    const node = state.value.document.nodes.first();

    return (
      node.type === blocks.paragraph &&
      node.nodes.every(child => child != null && child.object === "text") &&
      node.text.trim() === ""
    );
  } else if (state.type === "raw-markdown") {
    return state.value.trim().length === 0;
  } else {
    return false;
  }
};
