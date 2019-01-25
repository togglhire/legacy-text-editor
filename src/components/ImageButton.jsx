import React from "react";
import PropTypes from "prop-types";
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

ImageButton.propTypes = {
  state: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node
};
