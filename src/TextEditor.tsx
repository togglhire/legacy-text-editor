import * as React from "react";
import { EditorProps } from "./types";
import { EditorState } from "./state";
import { RichTextEditor } from "./RichTextEditor";
import { RawMarkdownEditor } from "./RawMarkdownEditor";

interface Props extends EditorProps {
  state: EditorState;
  onChange: (state: EditorState) => void;
}

export const TextEditor = ({ state, onChange, ...props }: Props) => {
  if (state.type === "rich-text") {
    return <RichTextEditor state={state} onChange={onChange} {...props} />;
  } else if (state.type === "raw-markdown") {
    return <RawMarkdownEditor state={state} onChange={onChange} {...props} />;
  } else {
    return null;
  }
};
