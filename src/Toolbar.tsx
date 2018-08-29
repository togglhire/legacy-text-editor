import React from "react";
import { Value, Change } from "slate";
import { MARKS, BLOCKS, INLINES } from "markup-it";
import { codePlugin } from "./plugins/code";
import { listPlugin } from "./plugins/list";
import { linkPlugin } from "./plugins/link";

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
    {" | "}
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
    <button
      onClick={() => {
        if (listPlugin.utils.isSelectionInList(value)) {
          onChange(
            value.change().call(change => listPlugin.changes.unwrapList(change))
          );
        } else {
          onChange(
            value
              .change()
              .call(change =>
                listPlugin.changes.wrapInList(change, BLOCKS.OL_LIST)
              )
          );
        }
      }}
    >
      ordered list
    </button>
    <button
      onClick={() => {
        if (linkPlugin.utils.isInLink(value)) {
          onChange(value.change().call(linkPlugin.changes.unwrapLink));
        } else {
          onChange(value.change().call(linkPlugin.changes.wrapInLink));
        }
      }}
    >
      link
    </button>
  </React.Fragment>
);
