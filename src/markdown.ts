import markdown from "markup-it/lib/markdown";
import { State } from "markup-it";
import { EditorState } from "./types";
import { Value } from "slate";

export const markdownToEditorState = (source: string): EditorState => {
  const document = State.create(markdown).deserializeToDocument(source);
  const value = Value.create({ document });

  return { type: "rich-text", value };
};

export const editorStateToMarkdown = (state: EditorState): string => {
  if (state.type === "rich-text") {
    return State.create(markdown).serializeDocument(state.value.document);
  } else if (state.type === "raw-markdown") {
    return state.value;
  } else {
    return "";
  }
};
