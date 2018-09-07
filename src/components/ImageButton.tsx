import * as React from "react";
import { EditorState } from "../state";
import { IconButton } from "./IconButton";

interface ImageButtonProps {
  state: EditorState;
  onClick: () => void;
  children: React.ReactNode;
}

export const ImageButton = ({ state, onClick, children }: ImageButtonProps) => (
  <IconButton
    active={false}
    disabled={state.type !== "rich-text"}
    type="button"
    onClick={() => {
      onClick();
    }}
  >
    {children}
  </IconButton>
);
