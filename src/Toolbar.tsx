import React from "react";
import styled from "react-emotion";
import { EditorState, RichTextState } from "./types";
import * as icons from "./icons";
import * as transforms from "./transforms";

interface IconButtonProps {
  active: boolean;
}

const IconButton = styled("button")<IconButtonProps>(props => ({
  padding: 0,
  border: "none",
  background: "transparent",
  WebkitAppearance: "none",
  cursor: "pointer",
  transition: "opacity 200ms",
  opacity: props.active ? 1 : 0.5,
  "&:hover": {
    opacity: 1
  },
  "& svg": {
    display: "block"
  }
}));

interface RichTextButtonProps {
  state: EditorState;
  onChange: (state: EditorState) => void;
  transform: (state: RichTextState) => RichTextState;
  active: (state: RichTextState) => boolean;
  children: React.ReactNode;
}

const RichTextButton = ({
  state,
  onChange,
  transform,
  active,
  children
}: RichTextButtonProps) => (
  <IconButton
    active={state.type === "rich-text" && active(state)}
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

interface ImageButtonProps {
  state: EditorState;
  onChange: (state: EditorState) => void;
  children: React.ReactNode;
}

const ImageButton = ({ state, onChange, children }: ImageButtonProps) => (
  <IconButton
    active={false}
    disabled={state.type !== "rich-text"}
    onClick={() => {
      if (state.type === "rich-text") {
        transforms.insertImage(state).then(onChange);
      }
    }}
  >
    {children}
  </IconButton>
);

interface MarkdownButtonProps {
  state: EditorState;
  onChange: (state: EditorState) => void;
  children: React.ReactNode;
}

const MarkdownButton = ({ state, onChange, children }: MarkdownButtonProps) => (
  <IconButton
    active={transforms.isInMarkdown(state)}
    onClick={() => {
      onChange(transforms.toggleMarkdown(state));
    }}
  >
    {children}
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
      active={transforms.isInBold}
    >
      <icons.Bold />
    </RichTextButton>
    <RichTextButton
      state={state}
      onChange={onChange}
      transform={transforms.toggleItalic}
      active={transforms.isInItalic}
    >
      <icons.Italic />
    </RichTextButton>
    <RichTextButton
      state={state}
      onChange={onChange}
      transform={transforms.toggleStrikethrough}
      active={transforms.isInStrikethrough}
    >
      <icons.Strikethrough />
    </RichTextButton>
    <RichTextButton
      state={state}
      onChange={onChange}
      transform={transforms.toggleInlineCode}
      active={transforms.isInInlineCode}
    >
      <icons.InlineCode />
    </RichTextButton>

    <RichTextButton
      state={state}
      onChange={onChange}
      transform={transforms.toggleBlockCode}
      active={transforms.isInBlockCode}
    >
      <icons.BlockCode />
    </RichTextButton>
    <RichTextButton
      state={state}
      onChange={onChange}
      transform={transforms.toggleOrderedList}
      active={transforms.isInOrderedList}
    >
      <icons.NumberList />
    </RichTextButton>
    <RichTextButton
      state={state}
      onChange={onChange}
      transform={transforms.toggleUnorderedList}
      active={transforms.isInUnorderedList}
    >
      <icons.BulletList />
    </RichTextButton>
    <RichTextButton
      state={state}
      onChange={onChange}
      transform={transforms.toggleLink}
      active={transforms.isInLink}
    >
      <icons.Link />
    </RichTextButton>
    <ImageButton state={state} onChange={onChange}>
      <icons.Image />
    </ImageButton>
    <MarkdownButton state={state} onChange={onChange}>
      <icons.Markdown />
    </MarkdownButton>
  </React.Fragment>
);
