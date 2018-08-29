import React from "react";
import { Change } from "slate";
import { MARKS, BLOCKS, INLINES } from "markup-it";
import { codePlugin } from "./plugins/code";
import { listPlugin } from "./plugins/list";
import { linkPlugin } from "./plugins/link";
import { EditorState } from "./types";
import { editorStateToMarkdown, markdownToEditorState } from "./markdown";

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
    disabled={state.type !== "rich-text"}
    onClick={() => {
      if (state.type === "rich-text") {
        onChange({
          type: "rich-text",
          value: action(state.value.change()).value
        });
      }
    }}
  >
    {children}
  </button>
);

interface MarkdownButtonProps {
  state: EditorState;
  onChange: (state: EditorState) => void;
}

const MarkdownButton = ({ state, onChange }: MarkdownButtonProps) => (
  <button
    onClick={() => {
      if (state.type === "rich-text") {
        onChange({ type: "raw-markdown", value: editorStateToMarkdown(state) });
      } else if (state.type === "raw-markdown") {
        onChange(markdownToEditorState(state.value));
      }
    }}
  >
    markdown
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
    <MarkdownButton state={state} onChange={onChange} />
  </React.Fragment>
);
