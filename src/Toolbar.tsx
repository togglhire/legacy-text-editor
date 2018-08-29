import React from "react";
import { Value, Change } from "slate";
import { MARKS, BLOCKS, INLINES } from "markup-it";
import { codePlugin } from "./plugins/code";
import { listPlugin } from "./plugins/list";
import { linkPlugin } from "./plugins/link";
import { EditorState } from "./types";

interface RichTextButtonProps {
  state: EditorState;
  onChange: (state: EditorState) => void;
  action: (change: Change) => Change;
  children: React.ReactNode;
}

const RichTextButton = ({
  state,
  onChange,
  action,
  children
}: RichTextButtonProps) => (
  <button
    onClick={() => {
      onChange({
        type: "rich-text",
        value: action(state.value.change()).value
      });
    }}
  >
    {children}
  </button>
);

interface ToolbarProps {
  state: EditorState;
  onChange: (state: EditorState) => void;
}

export const Toolbar = ({ state, onChange }: ToolbarProps) => (
  <React.Fragment>
    <RichTextButton
      state={state}
      onChange={onChange}
      action={change => change.toggleMark(MARKS.BOLD)}
    >
      bold
    </RichTextButton>
    <RichTextButton
      state={state}
      onChange={onChange}
      action={change => change.toggleMark(MARKS.ITALIC)}
    >
      italic
    </RichTextButton>
    <RichTextButton
      state={state}
      onChange={onChange}
      action={change => change.toggleMark(MARKS.STRIKETHROUGH)}
    >
      strikethrough
    </RichTextButton>
    <RichTextButton
      state={state}
      onChange={onChange}
      action={change => change.toggleMark(MARKS.CODE)}
    >
      inline code
    </RichTextButton>

    <RichTextButton
      state={state}
      onChange={onChange}
      action={change =>
        codePlugin.changes.toggleCodeBlock(change, BLOCKS.DEFAULT)
      }
    >
      block code
    </RichTextButton>
    <RichTextButton
      state={state}
      onChange={onChange}
      action={change =>
        listPlugin.utils.isSelectionInList(change.value)
          ? listPlugin.changes.unwrapList(change)
          : listPlugin.changes.wrapInList(change, BLOCKS.OL_LIST)
      }
    >
      ordered list
    </RichTextButton>
    <RichTextButton
      state={state}
      onChange={onChange}
      action={change =>
        linkPlugin.utils.isInLink(change.value)
          ? linkPlugin.changes.unwrapLink(change)
          : linkPlugin.changes.wrapInLink(change)
      }
    >
      link
    </RichTextButton>
  </React.Fragment>
);
