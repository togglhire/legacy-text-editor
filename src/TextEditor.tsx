import * as React from "react";
import { Editor, RenderNodeProps, RenderMarkProps } from "slate-react";
import { Value, Change } from "slate";

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
      case "paragraph":
        return <p {...attributes}>{children}</p>;
    }
  }
};

const renderMark = ({ mark, attributes, children }: RenderMarkProps) => {
  switch (mark.type) {
    case "bold":
      return <b {...attributes}>{children}</b>;
    case "italic":
      return <i {...attributes}>{children}</i>;
    case "underline":
      return <u {...attributes}>{children}</u>;
  }
};

export const TextEditor = ({ ...props }: Props) => (
  <Editor renderNode={renderNode} renderMark={renderMark} {...props} />
);
