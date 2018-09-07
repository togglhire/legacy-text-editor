import { Change, Value, Block } from "slate";
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

interface EditCodePlugin extends Plugin {
  utils: Utils;
  changes: Changes;
}

interface Utils {
  isInCodeBlock(value: Value): boolean;
  deserializeCode(text: string): Block;
}

interface Changes {
  toggleCodeBlock(change: Change, type: string): Change;
  wrapCodeBlockByKey(change: Change, key: string): Change;
  wrapCodeBlock(change: Change): Change;
  unwrapCodeBlockByKey(change: Change, key: string, type: string): Change;
  unwrapCodeBlock(change: Change, type: string): Change;
}

export default function EditCode(options: Options): EditCodePlugin;
