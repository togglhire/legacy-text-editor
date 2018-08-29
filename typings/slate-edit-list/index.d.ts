import { Node } from "slate";
import { Plugin } from "slate-react";

interface Options {
  types?: string[];
  typeItem?: string;
  typeDefault?: string;
  canMerge?: (a: Node, b: Node) => boolean;
}

export default function EditList(options: Options): Plugin;
