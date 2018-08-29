import * as React from "react";
import { Value, Change } from "slate";
import { Editor } from "slate-react";
import { plugins } from "./plugins";
import { EditorProps, EditorState } from "./types";

interface Props extends EditorProps {
  state: EditorState;
  onChange: (state: EditorState) => void;
}

export const TextEditor = ({ state, onChange, ...props }: Props) => {
  if (state.type === "rich-text") {
    return (
      <Editor
        plugins={plugins}
        value={state.value}
        onChange={(change: Change) => {
          onChange({ type: "rich-text", value: change.value });
        }}
        {...props}
      />
    );
  } else {
    return null;
  }
};
