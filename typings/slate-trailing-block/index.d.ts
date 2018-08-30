import { Plugin } from "slate-react";
import { Change, Node } from "slate";

interface Changes {
  focusAtEnd: (change: Change) => Change;
}

interface TrailingBlockPlugin extends Plugin {
  changes: Changes;
}

interface Options {
  type?: string;
  match?: (node: Node) => boolean;
}

export default function TrailingBlock(options?: Options): TrailingBlockPlugin;
