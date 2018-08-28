import * as React from "react";
import { Value, Change } from "slate";
import { Editor, RenderNodeProps, RenderMarkProps } from "slate-react";
import { BLOCKS, INLINES, MARKS } from "markup-it";

interface Props {
  value: Value;
  autoCorrect?: boolean;
  autoFocus?: boolean;
  className?: string;
  onChange?: (change: Change) => any;
  placeholder?: any;
  readOnly?: boolean;
  role?: string;
  spellCheck?: boolean;
  tabIndex?: number;
}

const renderNode = ({ node, attributes, children }: RenderNodeProps) => {
  if (node.object === "block" || node.object === "inline") {
    switch (node.type) {
      case BLOCKS.PARAGRAPH:
        return <p {...attributes}>{children}</p>;
      case BLOCKS.CODE:
        return (
          <pre>
            <code {...attributes}>{children}</code>
          </pre>
        );
      case BLOCKS.OL_LIST:
        return <ol {...attributes}>{children}</ol>;
      case BLOCKS.UL_LIST:
        return <ul {...attributes}>{children}</ul>;
      case BLOCKS.LIST_ITEM:
        return <li {...attributes}>{children}</li>;
      case INLINES.LINK:
        return (
          <a
            href={node.data.get("href")}
            title={node.data.get("title")}
            {...attributes}
          >
            {children}
          </a>
        );
      case INLINES.IMAGE:
        return (
          <img
            src={node.data.get("src")}
            alt={node.data.get("alt")}
            title={node.data.get("title")}
            {...attributes}
          />
        );
    }
  }
};

const renderMark = ({ mark, attributes, children }: RenderMarkProps) => {
  switch (mark.type) {
    case MARKS.BOLD:
      return <b {...attributes}>{children}</b>;
    case MARKS.ITALIC:
      return <i {...attributes}>{children}</i>;
    case MARKS.STRIKETHROUGH:
      return <s {...attributes}>{children}</s>;
    case MARKS.CODE:
      return <code {...attributes}>{children}</code>;
  }
};

export const TextEditor = ({ ...props }: Props) => (
  <Editor renderNode={renderNode} renderMark={renderMark} {...props} />
);