import React from "react";
import PropTypes from "prop-types";
import styled from "react-emotion";
import AutosizeTextarea from "react-textarea-autosize";

const Textarea = styled(AutosizeTextarea)({
  padding: 0,
  display: "block",
  width: "100%",
  maxWidth: "100%",
  border: "none",
  background: "transparent",
  fontSize: "inherit",
  fontFamily: "monospace",
  color: "inherit",
  outline: "none",
  resize: "none"
});

export const RawMarkdownEditor = props => {
  const { state, onChange, autoCorrect, ...rest } = props;

  return (
    <Textarea
      value={state.value}
      onChange={event =>
        onChange({ type: "raw-markdown", value: event.target.value })
      }
      autoCorrect={
        autoCorrect === true ? "on" : autoCorrect === false ? "off" : undefined
      }
      {...rest}
    />
  );
};

RawMarkdownEditor.propTypes = {
  state: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  autoCorrect: PropTypes.bool
};
