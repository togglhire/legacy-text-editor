import React from "react";
import { RawMarkdownState, EditorProps } from "./types";

interface Props extends EditorProps {
  state: RawMarkdownState;
  onChange: (state: RawMarkdownState) => void;
}

export const RawMarkdownEditor = ({ state, onChange, ...props }: Props) => (
  <textarea
    value={state.value}
    onChange={event =>
      onChange({ type: "raw-markdown", value: event.target.value })
    }
  />
);
