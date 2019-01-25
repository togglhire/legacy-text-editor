import React from "react";
import PropTypes from "prop-types";
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

RichTextButton.propTypes = {
  state: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  transform: PropTypes.func.isRequired,
  active: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node
};
