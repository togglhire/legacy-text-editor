import * as React from "react";
import { Value, Change } from "slate";
import { Editor, RenderNodeProps, RenderMarkProps } from "slate-react";
import { BLOCKS, INLINES, MARKS } from "markup-it";
import { plugins } from "./plugins";

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

export const TextEditor = ({ ...props }: Props) => (
  <Editor plugins={plugins} {...props} />
);
