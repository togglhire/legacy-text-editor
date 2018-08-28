import { Value, Change } from "slate";
import React from "react";

interface Props {
  value: Value;
  onChange: (change: Change) => any;
}

export const Toolbar = ({ value, onChange }: Props) => (
  <React.Fragment>
    <button
      onClick={() => {
        onChange(value.change().toggleMark("bold"));
      }}
    >
      bold
    </button>
    <button
      onClick={() => {
        onChange(value.change().toggleMark("italic"));
      }}
    >
      italic
    </button>
    <button
      onClick={() => {
        onChange(value.change().toggleMark("underline"));
      }}
    >
      underline
    </button>
  </React.Fragment>
);
