import React from "react";
import { Editor } from "slate-react";
import { EditorProps } from "../types";
import { RichTextState } from "../state";
import { plugins } from "../plugins";
import { Change } from "slate";
import styled from "react-emotion";

const StyledEditor = styled(Editor)({
  "> *:first-child": {
    marginTop: 0
  },
  "> *:last-child": {
    marginBottom: 0
  }
});

interface Props extends EditorProps {
  state: RichTextState;
  onChange: (state: RichTextState) => void;
}

export const RichTextEditor = ({ state, onChange, ...props }: Props) => (
  <StyledEditor
    plugins={plugins}
    value={state.value}
    onChange={(change: Change) => {
      onChange({ type: "rich-text", value: change.value });
    }}
    {...props}
  />
);
