import React from "react";
import { Value, Change } from "slate";
import { MARKS } from "markup-it";

interface Props {
  value: Value;
  onChange: (change: Change) => any;
}

export const Toolbar = ({ value, onChange }: Props) => (
  <React.Fragment>
    <button
      onClick={() => {
        onChange(value.change().toggleMark(MARKS.BOLD));
      }}
    >
      bold
    </button>
    <button
      onClick={() => {
        onChange(value.change().toggleMark(MARKS.ITALIC));
      }}
    >
      italic
    </button>
    <button
      onClick={() => {
        onChange(value.change().toggleMark(MARKS.STRIKETHROUGH));
      }}
    >
      strike-through
    </button>
    <button
      onClick={() => {
        onChange(value.change().toggleMark(MARKS.CODE));
      }}
    >
      inline code
    </button>
  </React.Fragment>
);
