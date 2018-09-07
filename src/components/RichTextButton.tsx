import * as React from "react";
import { EditorState, RichTextState } from "../state";
import { IconButton } from "./IconButton";

interface RichTextButtonProps {
  state: EditorState;
  onChange: (state: EditorState) => void;
  transform: (state: RichTextState) => RichTextState;
  active: (state: RichTextState) => boolean;
  children: React.ReactNode;
}

export const RichTextButton = ({
  state,
  onChange,
  transform,
  active,
  children
}: RichTextButtonProps) => (
  <IconButton
    active={state.type === "rich-text" && active(state)}
    disabled={state.type !== "rich-text"}
    type="button"
    onClick={() => {
      if (state.type === "rich-text") {
        onChange(transform(state));
      }
    }}
  >
    {children}
  </IconButton>
);
