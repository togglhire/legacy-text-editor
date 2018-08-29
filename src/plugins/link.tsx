import * as React from "react";
import { RenderAttributes, Editor, RenderNodeProps, Plugin } from "slate-react";
import { Node, Inline, Change, Value } from "slate";
import { INLINES } from "markup-it";
import isUrl from "is-url";

interface Props {
  attributes: RenderAttributes;
  children: React.ReactNode;
  editor: Editor;
  isSelected: boolean;
  node: Inline;
  parent: Node;
}

const Link = ({ attributes, node, editor, children }: Props) => (
  <a
    href={node.data.get("href")}
    title={node.data.get("title")}
    onClick={() => {
      const href = promptForUrl(node.data.get("href"));
      if (href == null) return;

      editor.change(change =>
        change.setNodeByKey(node.key, {
          type: INLINES.LINK,
          data: { href }
        })
      );
    }}
    {...attributes}
  >
    {children}
  </a>
);

const renderNode = (props: RenderNodeProps) => {
  if (props.node.object === "inline" && props.node.type === INLINES.LINK) {
    return <Link {...props} node={props.node} />;
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
      node => node.object === "inline" && node.type === INLINES.LINK
    ) != null
  );
};

const wrapInLink = (change: Change): Change => {
  const href = promptForUrl();
  if (href == null) return change;

  return change.wrapInline({ type: INLINES.LINK, data: { href } });
};

const unwrapLink = (change: Change): Change => {
  return change.unwrapInline(INLINES.LINK);
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
