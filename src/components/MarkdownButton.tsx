import * as React from "react";
import { EditorState } from "../state";
import * as transforms from "../transforms";
import { IconButton } from "./IconButton";

interface MarkdownButtonProps {
  state: EditorState;
  onChange: (state: EditorState) => void;
  children: React.ReactNode;
}

export const MarkdownButton = ({
  state,
  onChange,
  children
}: MarkdownButtonProps) => (
  <IconButton
    active={transforms.isInMarkdown(state)}
    onClick={() => {
      onChange(transforms.toggleMarkdown(state));
    }}
  >
    {children}
  </IconButton>
);
