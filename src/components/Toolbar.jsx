import React from "react";
import * as icons from "../icons";
import * as transforms from "../transforms";
import { RichTextButton } from "./RichTextButton";
import { ImageButton } from "./ImageButton";
import { MarkdownButton } from "./MarkdownButton";

export const Toolbar = ({ state, onChange, onInsertImage }) => (
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
