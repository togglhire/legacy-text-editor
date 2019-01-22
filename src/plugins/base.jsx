import * as React from "react";
import styled from "react-emotion";
import { blocks, inlines, marks } from "../constants";

const Paragraph = styled("p")({
  marginTop: "0.5em",
  marginBottom: "0.5em"
});

const BlockCode = styled("pre")({
  padding: 20,
  marginTop: "0.5em",
  marginBottom: "0.5em",
  background: "#F5F5F5"
});

const InlineCode = styled("code")({
  padding: 3,
  background: "#F5F5F5"
});

const OrderedList = styled("ol")({
  paddingLeft: 30
});

const UnorderedList = styled("ul")({
  paddingLeft: 30
});

const renderNode = ({ node, attributes, children }) => {
  switch (node.type) {
    case blocks.paragraph:
      return <Paragraph {...attributes}>{children}</Paragraph>;
    case blocks.code:
      return (
        <BlockCode>
          <code {...attributes}>{children}</code>
        </BlockCode>
      );
    case blocks.orderedList:
      return <OrderedList {...attributes}>{children}</OrderedList>;
    case blocks.unorderedList:
      return <UnorderedList {...attributes}>{children}</UnorderedList>;
    case blocks.listItem:
      return <li {...attributes}>{children}</li>;
    case inlines.code:
      return <InlineCode {...attributes}>{children}</InlineCode>;
  }
};

const renderMark = ({ mark, attributes, children }) => {
  switch (mark.type) {
    case marks.bold:
      return <b {...attributes}>{children}</b>;
    case marks.italic:
      return <i {...attributes}>{children}</i>;
    case marks.strikethrough:
      return <s {...attributes}>{children}</s>;
  }
};

export const basePlugin = { renderNode, renderMark };
