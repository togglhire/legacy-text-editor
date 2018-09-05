import * as React from "react";
import { RenderNodeProps, RenderMarkProps, Plugin } from "slate-react";
import { blocks, inlines, marks } from "../constants";

const renderNode = ({ node, attributes, children }: RenderNodeProps) => {
  if (node.object === "block" || node.object === "inline") {
    switch (node.type) {
      case blocks.paragraph:
        return <p {...attributes}>{children}</p>;
      case blocks.code:
        return (
          <pre>
            <code {...attributes}>{children}</code>
          </pre>
        );
      case blocks.orderedList:
        return <ol {...attributes}>{children}</ol>;
      case blocks.unorderedList:
        return <ul {...attributes}>{children}</ul>;
      case blocks.listItem:
        return <li {...attributes}>{children}</li>;
      case inlines.link:
        return (
          <a
            href={node.data.get("href")}
            title={node.data.get("title")}
            {...attributes}
          >
            {children}
          </a>
        );
      case inlines.image:
        return (
          <img
            src={node.data.get("src")}
            alt={node.data.get("alt")}
            title={node.data.get("title")}
            {...attributes}
          />
        );
      case inlines.code:
        return <code {...attributes}>{children}</code>;
    }
  }
};

const renderMark = ({ mark, attributes, children }: RenderMarkProps) => {
  switch (mark.type) {
    case marks.bold:
      return <b {...attributes}>{children}</b>;
    case marks.italic:
      return <i {...attributes}>{children}</i>;
    case marks.strikethrough:
      return <s {...attributes}>{children}</s>;
  }
};

export const basePlugin: Plugin = { renderNode, renderMark };
