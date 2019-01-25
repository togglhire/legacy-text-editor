import React from "react";
import PropTypes from "prop-types";
import styled from "react-emotion";
import { inlines } from "../constants";
import isUrl from "is-url";

const Link = styled("a")({
  color: "#3599CE",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline"
  }
});

const LinkNode = ({ attributes, node, editor, children }) => (
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

LinkNode.propTypes = {
  attributes: PropTypes.object,
  node: PropTypes.object.isRequired,
  editor: PropTypes.object.isRequired,
  children: PropTypes.node
};

const renderNode = props => {
  if (props.node.object === "inline" && props.node.type === inlines.link) {
    return <LinkNode {...props} node={props.node} />;
  }
};

const promptForUrl = defaultUrl => {
  let enteredUrl;

  enteredUrl = prompt("Please enter URL", defaultUrl);
  if (enteredUrl == null) return null;

  while (!isUrl(enteredUrl)) {
    enteredUrl = prompt("Please enter correct URL", enteredUrl);
    if (enteredUrl == null) return null;
  }

  return enteredUrl;
};

const isInLink = value => {
  return (
    value.document.getClosest(
      value.selection.startKey,
      node => node.object === "inline" && node.type === inlines.link
    ) != null
  );
};

const wrapInLink = change => {
  const href = promptForUrl();
  if (href == null) return change;

  return change.wrapInline({ type: inlines.link, data: { href } });
};

const unwrapLink = change => {
  return change.unwrapInline(inlines.link);
};

export const linkPlugin = {
  renderNode,
  utils: { isInLink },
  changes: { wrapInLink, unwrapLink }
};
