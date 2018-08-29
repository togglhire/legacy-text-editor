import { Change, Value } from "slate";
import { Plugin } from "slate-react";

interface Options {
  containerType?: string;
  lineType?: string;
  exitBlockType?: string | null;
  onExit?: (change: Change) => Change | void;
  selectAll?: boolean;
  allowMarks?: boolean;
  getIndent?: (value: Value) => string;
}

export default function EditCode(options: Options): Plugin;
