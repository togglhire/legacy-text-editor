import React from "react";
import { EditorState } from "../state";
import * as icons from "../icons";
import * as transforms from "../transforms";
import { RichTextButton } from "./RichTextButton";
import { ImageButton } from "./ImageButton";
import { MarkdownButton } from "./MarkdownButton";

interface ToolbarProps {
  state: EditorState;
  onChange: (state: EditorState) => void;
  onInsertImage: () => void;
}

export const Toolbar = ({ state, onChange, onInsertImage }: ToolbarProps) => (
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
    <ImageButton state={state} onClick={onInsertImage}>
      <icons.Image />
    </ImageButton>
    <MarkdownButton state={state} onChange={onChange}>
      <icons.Markdown />
    </MarkdownButton>
  </React.Fragment>
);
