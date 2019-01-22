import * as React from "react";
import { IconButton } from "./IconButton";

export const ImageButton = ({ state, onClick, title, children }) => (
  <IconButton
    active={false}
    disabled={state.type !== "rich-text"}
    title={title}
    type="button"
    onClick={() => {
      onClick();
    }}
  >
    {children}
  </IconButton>
);
