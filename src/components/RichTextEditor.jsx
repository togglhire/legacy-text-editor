import React from "react";
import PropTypes from "prop-types";
import { Editor } from "slate-react";
import { plugins } from "../plugins";
import styled from "react-emotion";

const StyledEditor = styled(Editor)({
  "> *:first-child": {
    marginTop: 0
  },
  "> *:last-child": {
    marginBottom: 0
  }
});

export const RichTextEditor = ({ state, onChange, ...props }) => (
  <StyledEditor
    plugins={plugins}
    value={state.value}
    onChange={change => {
      onChange({ type: "rich-text", value: change.value });
    }}
    {...props}
  />
);

RichTextEditor.propTypes = {
  state: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};
