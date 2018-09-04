import React from "react";
import styled from "react-emotion";
import { EditorState, RichTextState } from "./types";
import * as icons from "./icons";
import * as transforms from "./transforms";

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
  transform: (state: RichTextState) => RichTextState;
  children: React.ReactNode;
}

const RichTextButton = ({
  state,
  onChange,
  transform,
  children
}: RichTextButtonProps) => (
  <IconButton
    disabled={state.type !== "rich-text"}
    onClick={() => {
      if (state.type === "rich-text") {
        onChange(transform(state));
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
      onChange(transforms.toggleMarkdown(state));
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
      transform={transforms.toggleBold}
    >
      <icons.Bold />
    </RichTextButton>
    <RichTextButton
      state={state}
      onChange={onChange}
      transform={transforms.toggleItalic}
    >
      <icons.Italic />
    </RichTextButton>
    <RichTextButton
      state={state}
      onChange={onChange}
      transform={transforms.toggleStrikethrough}
    >
      <icons.Strikethrough />
    </RichTextButton>
    <RichTextButton
      state={state}
      onChange={onChange}
      transform={transforms.toggleInlineCode}
    >
      <icons.InlineCode />
    </RichTextButton>

    <RichTextButton
      state={state}
      onChange={onChange}
      transform={transforms.toggleBlockCode}
    >
      <icons.BlockCode />
    </RichTextButton>
    <RichTextButton
      state={state}
      onChange={onChange}
      transform={transforms.toggleOrderedList}
    >
      <icons.NumberList />
    </RichTextButton>
    <RichTextButton
      state={state}
      onChange={onChange}
      transform={transforms.toggleUnorderedList}
    >
      <icons.BulletList />
    </RichTextButton>
    <RichTextButton
      state={state}
      onChange={onChange}
      transform={transforms.toggleLink}
    >
      <icons.Link />
    </RichTextButton>
    <MarkdownButton state={state} onChange={onChange} />
  </React.Fragment>
);
