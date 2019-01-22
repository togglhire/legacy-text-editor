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
      title="Bold"
    >
      <icons.Bold />
    </RichTextButton>
    <RichTextButton
      state={state}
      onChange={onChange}
      transform={transforms.toggleItalic}
      active={transforms.isInItalic}
      title="Italic"
    >
      <icons.Italic />
    </RichTextButton>
    <RichTextButton
      state={state}
      onChange={onChange}
      transform={transforms.toggleStrikethrough}
      active={transforms.isInStrikethrough}
      type="Strikethrough"
    >
      <icons.Strikethrough />
    </RichTextButton>
    <RichTextButton
      state={state}
      onChange={onChange}
      transform={transforms.toggleInlineCode}
      active={transforms.isInInlineCode}
      title="Inline code"
    >
      <icons.InlineCode />
    </RichTextButton>

    <RichTextButton
      state={state}
      onChange={onChange}
      transform={transforms.toggleBlockCode}
      active={transforms.isInBlockCode}
      title="Block code"
    >
      <icons.BlockCode />
    </RichTextButton>
    <RichTextButton
      state={state}
      onChange={onChange}
      transform={transforms.toggleOrderedList}
      active={transforms.isInOrderedList}
      title="Number list"
    >
      <icons.NumberList />
    </RichTextButton>
    <RichTextButton
      state={state}
      onChange={onChange}
      transform={transforms.toggleUnorderedList}
      active={transforms.isInUnorderedList}
      title="Bullet list"
    >
      <icons.BulletList />
    </RichTextButton>
    <RichTextButton
      state={state}
      onChange={onChange}
      transform={transforms.toggleHeading}
      active={transforms.isInHeading}
      title="Heading"
    >
      <icons.Heading />
    </RichTextButton>
    <RichTextButton
      state={state}
      onChange={onChange}
      transform={transforms.toggleLink}
      active={transforms.isInLink}
      title="Link"
    >
      <icons.Link />
    </RichTextButton>
    <ImageButton state={state} onClick={onInsertImage} title="Image">
      <icons.Image />
    </ImageButton>
    <MarkdownButton state={state} onChange={onChange} title="Markdown">
      <icons.Markdown />
    </MarkdownButton>
  </React.Fragment>
);
