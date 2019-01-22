import * as React from "react";
import { IconButton } from "./IconButton";

export const RichTextButton = ({
  state,
  onChange,
  transform,
  active,
  children
}) => (
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
