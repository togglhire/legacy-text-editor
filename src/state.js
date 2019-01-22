import * as transforms from "./transforms";
import { blocks } from "./constants";

export const createRichTextState = value => {
  return { type: "rich-text", value };
};

export const createRawMarkdownState = value => {
  return { type: "raw-markdown", value };
};

export const insertImage = (state, url) => {
  if (state.type === "rich-text") {
    return transforms.insertImage(state, url);
  } else {
    return state;
  }
};

export const insertUpload = (state, id) => {
  if (state.type === "rich-text") {
    return transforms.insertUpload(state, id);
  } else {
    return state;
  }
};

export const replaceUpload = (state, id, url) => {
  if (state.type === "rich-text") {
    return transforms.replaceUpload(state, id, url);
  } else {
    return state;
  }
};

export const isEmpty = state => {
  if (state.type === "rich-text") {
    if (state.value.document.nodes.isEmpty()) return true;

    const node = state.value.document.nodes.first();

    return (
      node.type === blocks.paragraph &&
      node.nodes.every(child => child != null && child.object === "text") &&
      node.text.trim() === ""
    );
  } else if (state.type === "raw-markdown") {
    return state.value.trim().length === 0;
  } else {
    return false;
  }
};
