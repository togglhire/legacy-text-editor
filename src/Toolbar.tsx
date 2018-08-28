import React from "react";
import { Value, Change } from "slate";
import { MARKS, BLOCKS } from "markup-it";
import { codePlugin } from "./plugins/code";

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
    |
    <button
      onClick={() => {
        onChange(
          value
            .change()
            .call(change =>
              codePlugin.changes.toggleCodeBlock(change, BLOCKS.DEFAULT)
            )
        );
      }}
    >
      inline code
    </button>
  </React.Fragment>
);
