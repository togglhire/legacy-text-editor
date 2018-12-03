import * as React from "react";
import styled from "react-emotion";
import { Change, Schema, Inline, NodeJSON } from "slate";
import { RenderNodeProps } from "slate-react";
import { inlines } from "../constants";

const Image = styled("img")({
  maxWidth: 300,
  maxHeight: 300,
  width: "auto",
  height: "auto",
  display: "block"
});

const Upload = styled("span")({
  width: 300,
  height: 200,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#ccc"
});

const Frame = styled("span")<{ selected: boolean }>(props => ({
  margin: -4,
  padding: 2,
  display: "inline-block",
  borderWidth: 2,
  borderStyle: "solid",
  borderColor: props.selected ? "#E994AA" : "transparent",
  borderRadius: 2
}));

const ImageNode = ({ node, isSelected }: RenderNodeProps) => {
  if (node.object === "inline" && node.type === inlines.image) {
    return (
      <Frame selected={isSelected}>
        <Image src={node.data.get("src")} />
      </Frame>
    );
  } else {
    return null;
  }
};

const UploadNode = ({ isSelected }: RenderNodeProps) => {
  return (
    <Frame selected={isSelected}>
      <Upload>Uploading...</Upload>
    </Frame>
  );
};

const renderNode = (props: RenderNodeProps) => {
  if (props.node.object === "inline") {
    switch (props.node.type) {
      case inlines.image:
        return <ImageNode {...props} />;
      case inlines.upload:
        return <UploadNode {...props} />;
    }
  }
};

const emptyTextNode: NodeJSON = {
  object: "text",
  leaves: [{ object: "leaf", text: "" }]
};

const insertUpload = (change: Change, id: string): Change => {
  const inline = Inline.fromJSON({
    object: "inline",
    type: inlines.upload,
    data: { id },
    isVoid: true,
    nodes: [emptyTextNode]
  });

  return change.insertInline(inline);
};

const replaceUpload = (change: Change, id: string, url: string): Change => {
  const upload = change.value.document.findDescendant(
    node =>
      node.object === "inline" &&
      node.type === inlines.upload &&
      node.data.get("id") === id
  );

  if (upload != null) {
    change.setNodeByKey(upload.key, {
      type: inlines.image,
      data: { src: url }
    });
  }

  return change;
};

const insertImage = (change: Change, url: string): Change => {
  const inline = Inline.fromJSON({
    object: "inline",
    type: inlines.image,
    data: { src: url },
    isVoid: true,
    nodes: [emptyTextNode]
  });

  return change.insertInline(inline);
};

const schema = Schema.create({
  inlines: {
    [inlines.image]: { isVoid: true },
    [inlines.upload]: { isVoid: true }
  }
});

export const imagePlugin = {
  renderNode,
  schema,
  changes: {
    insertImage,
    insertUpload,
    replaceUpload
  }
};
