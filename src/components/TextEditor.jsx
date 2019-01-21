import * as React from "react";
import { RichTextEditor } from "./RichTextEditor";
import { RawMarkdownEditor } from "./RawMarkdownEditor";

export const TextEditor = ({ state, onChange, ...props }) => {
  if (state.type === "rich-text") {
    return <RichTextEditor state={state} onChange={onChange} {...props} />;
  } else if (state.type === "raw-markdown") {
    return <RawMarkdownEditor state={state} onChange={onChange} {...props} />;
  } else {
    return null;
  }
};
