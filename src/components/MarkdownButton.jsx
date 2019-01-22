import * as React from "react";
import * as transforms from "../transforms";
import { IconButton } from "./IconButton";

export const MarkdownButton = ({ state, onChange, title, children }) => (
  <IconButton
    active={transforms.isInMarkdown(state)}
    title={title}
    type="button"
    onClick={() => {
      onChange(transforms.toggleMarkdown(state));
    }}
  >
    {children}
  </IconButton>
);
