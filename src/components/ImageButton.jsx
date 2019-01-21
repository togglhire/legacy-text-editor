import * as React from "react";
import { IconButton } from "./IconButton";

export const ImageButton = ({ state, onClick, children }) => (
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
