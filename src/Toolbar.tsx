import React from "react";
import { Change } from "slate";
import styled from "react-emotion";
import { marks, blocks } from "./constants";
import { codePlugin } from "./plugins/code";
import { listPlugin } from "./plugins/list";
import { linkPlugin } from "./plugins/link";
import { EditorState } from "./types";
import { editorStateToMarkdown, markdownToEditorState } from "./markdown";
import * as icons from "./icons";

const IconButton = styled("button")({
  padding: 0,
  border: "none",
  background: "transparent",
  WebkitAppearance: "none",
  cursor: "pointer",
  "& svg": {
    display: "block"
  }
});

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
  <IconButton
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
  </IconButton>
);

interface MarkdownButtonProps {
  state: EditorState;
  onChange: (state: EditorState) => void;
}

const MarkdownButton = ({ state, onChange }: MarkdownButtonProps) => (
  <IconButton
    onClick={() => {
      if (state.type === "rich-text") {
        onChange({ type: "raw-markdown", value: editorStateToMarkdown(state) });
      } else if (state.type === "raw-markdown") {
        onChange(markdownToEditorState(state.value));
      }
    }}
  >
    <icons.Markdown />
  </IconButton>
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
      action={change => change.toggleMark(marks.bold)}
    >
      <icons.Bold />
    </RichTextButton>
    <RichTextButton
      state={state}
      onChange={onChange}
      action={change => change.toggleMark(marks.italic)}
    >
      <icons.Italic />
    </RichTextButton>
    <RichTextButton
      state={state}
      onChange={onChange}
      action={change => change.toggleMark(marks.strikethrough)}
    >
      <icons.Strikethrough />
    </RichTextButton>
    <RichTextButton
      state={state}
      onChange={onChange}
      action={change => change.toggleMark(marks.code)}
    >
      <icons.InlineCode />
    </RichTextButton>

    <RichTextButton
      state={state}
      onChange={onChange}
      action={change =>
        codePlugin.changes.toggleCodeBlock(change, blocks.paragraph)
      }
    >
      <icons.BlockCode />
    </RichTextButton>
    <RichTextButton
      state={state}
      onChange={onChange}
      action={change =>
        listPlugin.utils.isSelectionInList(change.value)
          ? listPlugin.changes.unwrapList(change)
          : listPlugin.changes.wrapInList(change, blocks.orderedList)
      }
    >
      <icons.NumberList />
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
      <icons.Link />
    </RichTextButton>
    <MarkdownButton state={state} onChange={onChange} />
  </React.Fragment>
);
