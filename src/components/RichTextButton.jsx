import * as React from "react";
import { IconButton } from "./IconButton";

export const RichTextButton = ({
  state,
  onChange,
  transform,
  active,
  title,
  children
}) => (
  <IconButton
    active={state.type === "rich-text" && active(state)}
    disabled={state.type !== "rich-text"}
    title={title}
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
