import React from "react";
import PropTypes from "prop-types";
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

MarkdownButton.propTypes = {
  state: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node
};
