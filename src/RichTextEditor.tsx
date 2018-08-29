import React from "react";
import { Editor } from "slate-react";
import { RichTextState, EditorProps } from "./types";
import { plugins } from "./plugins";
import { Change } from "slate";

interface Props extends EditorProps {
  state: RichTextState;
  onChange: (state: RichTextState) => void;
}

export const RichTextEditor = ({ state, onChange, ...props }: Props) => (
  <Editor
    plugins={plugins}
    value={state.value}
    onChange={(change: Change) => {
      onChange({ type: "rich-text", value: change.value });
    }}
    {...props}
  />
);
