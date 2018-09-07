import * as React from "react";
import { RenderAttributes, Editor, RenderNodeProps, Plugin } from "slate-react";
import { Node, Inline, Change, Value } from "slate";
import styled from "react-emotion";
import { inlines } from "../constants";
import isUrl from "is-url";

interface Props {
  attributes: RenderAttributes;
  children: React.ReactNode;
  editor: Editor;
  isSelected: boolean;
  node: Inline;
  parent: Node;
}

const Link = styled("a")({
  color: "#3599CE",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline"
  }
});

const LinkNode = ({ attributes, node, editor, children }: Props) => (
  <Link
    href={node.data.get("href")}
    title={node.data.get("title")}
    onClick={() => {
      const href = promptForUrl(node.data.get("href"));
      if (href == null) return;

      editor.change(change =>
        change.setNodeByKey(node.key, {
          type: inlines.link,
          data: { href }
        })
      );
    }}
    {...attributes}
  >
    {children}
  </Link>
);

const renderNode = (props: RenderNodeProps) => {
  if (props.node.object === "inline" && props.node.type === inlines.link) {
    return <LinkNode {...props} node={props.node} />;
  }
};

const promptForUrl = (defaultUrl?: string): string | null => {
  let enteredUrl;

  enteredUrl = prompt("Please enter URL", defaultUrl);
  if (enteredUrl == null) return null;

  while (!isUrl(enteredUrl)) {
    enteredUrl = prompt("Please enter correct URL", enteredUrl);
    if (enteredUrl == null) return null;
  }

  return enteredUrl;
};

const isInLink = (value: Value): boolean => {
  return (
    value.document.getClosest(
      value.selection.startKey,
      node => node.object === "inline" && node.type === inlines.link
    ) != null
  );
};

const wrapInLink = (change: Change): Change => {
  const href = promptForUrl();
  if (href == null) return change;

  return change.wrapInline({ type: inlines.link, data: { href } });
};

const unwrapLink = (change: Change): Change => {
  return change.unwrapInline(inlines.link);
};

interface Utils {
  isInLink: (value: Value) => boolean;
}

interface Changes {
  wrapInLink: (change: Change) => Change;
  unwrapLink: (change: Change) => Change;
}

interface LinkPlugin extends Plugin {
  utils: Utils;
  changes: Changes;
}

export const linkPlugin: LinkPlugin = {
  renderNode,
  utils: { isInLink },
  changes: { wrapInLink, unwrapLink }
};
