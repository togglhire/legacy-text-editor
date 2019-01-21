import * as React from "react";
import * as transforms from "../transforms";
import { IconButton } from "./IconButton";

export const MarkdownButton = ({ state, onChange, children }) => (
  <IconButton
    active={transforms.isInMarkdown(state)}
    type="button"
    onClick={() => {
      onChange(transforms.toggleMarkdown(state));
    }}
  >
    {children}
  </IconButton>
);
