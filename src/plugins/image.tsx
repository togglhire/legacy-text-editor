import * as React from "react";
import chooseFiles from "choose-files";
import {
  Change,
  Inline,
  Document,
  InlineJSON,
  NodeJSON,
  Node,
  Text,
  Block
} from "slate";
import { inlines, blocks } from "../constants";
import { RenderNodeProps, Editor, RenderAttributes } from "slate-react";
import { List } from "immutable";

const Image = ({ node }: RenderNodeProps) => {
  if (node.object === "inline" && node.type === inlines.image) {
    return <img src={node.data.get("src")} />;
  } else {
    return null;
  }
};

const Upload = () => {
  return <span>Uploading...</span>;
};

let currentEditor: Editor | null = null;
let uploadId: number = 1;

const renderEditor = (props: RenderAttributes, editor: Editor) => {
  currentEditor = editor;
  return props.children;
};

const renderNode = (props: RenderNodeProps) => {
  if (props.node.object === "inline") {
    switch (props.node.type) {
      case inlines.image:
        return <Image {...props} />;
      case inlines.upload:
        return <Upload {...props} />;
    }
  }
};

const selectImages = (): Promise<File[]> => {
  return new Promise((resolve, reject) => {
    chooseFiles({ accept: "image/*" }, files => {
      resolve(files);
    });
  });
};

const uploadImage = (file: File): Promise<string> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const query = Math.floor(Math.random() * 1000).toString();
      resolve("https://placeimg.com/640/480/any?" + query);
    }, 2000);
  });
};

const uploadImages = (images: File[]): Promise<string>[] => {
  return images.map(uploadImage);
};

const replaceUpload = (change: Change, id: number, url: string): Change => {
  const upload = change.value.document.findDescendant(
    node =>
      node.object === "inline" &&
      node.type === inlines.upload &&
      node.data.get("uploadId") === id
  );

  if (upload != null) {
    const image = Inline.create({
      type: inlines.image,
      data: { src: url },
      isVoid: true
    });

    change.replaceNodeByKey(upload.key, image);
  }

  return change;
};

const insertImages = (change: Change, images: Promise<string>[]): Change => {
  const nodes: Node[] = [];

  for (const image of images) {
    const id = uploadId++;

    const inline = Inline.create({
      type: inlines.upload,
      data: { uploadId: id },
      isVoid: true
    });

    nodes.push(inline);

    image.then(url => {
      currentEditor.change(change => {
        replaceUpload(change, id, url);
      });
    });
  }

  nodes.push(Text.create(""));

  const container = Block.create({
    type: blocks.paragraph,
    nodes: List(nodes)
  });

  const document = Document.create({ nodes: [container] });

  return change.insertFragment(document);
};

export const imagePlugin = {
  renderEditor,
  renderNode,

  utils: {
    selectImages,
    uploadImages
  },

  changes: {
    insertImages
  }
};
