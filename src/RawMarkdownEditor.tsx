import React from "react";
import styled from "react-emotion";
import { EditorProps } from "./types";
import { RawMarkdownState } from "./state";

const Textarea = styled("textarea")({
  padding: 0,
  display: "block",
  width: "100%",
  maxWidth: "100%",
  border: "none",
  background: "transparent",
  fontSize: "inherit",
  fontFamily: "monospace",
  color: "inherit",
  outline: "none"
});

interface Props extends EditorProps {
  state: RawMarkdownState;
  onChange: (state: RawMarkdownState) => void;
}

export const RawMarkdownEditor = (props: Props) => {
  const { state, onChange, autoCorrect, ...rest } = props;

  return (
    <Textarea
      value={state.value}
      onChange={event =>
        onChange({ type: "raw-markdown", value: event.target.value })
      }
      autoCorrect={
        autoCorrect === true ? "on" : autoCorrect === false ? "off" : undefined
      }
      {...rest}
    />
  );
};
