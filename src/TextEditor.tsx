import * as React from "react";
import { Editor } from "slate-react";
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

export const TextEditor = ({ ...props }: Props) => <Editor {...props} />;
