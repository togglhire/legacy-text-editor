import { Node, Value, Block, Change, Data } from "slate";
import { Plugin } from "slate-react";

interface Options {
  types?: string[];
  typeItem?: string;
  typeDefault?: string;
  canMerge?: (a: Node, b: Node) => boolean;
}

interface EditListPlugin {
  utils: Utils;
  changes: Changes;
}

interface Utils {
  isSelectionInList(value: Value): boolean;
  isList(node: Node): boolean;
  getItemDepth(value: Value, block?: Block): number;
  getCurrentItem(value: Value, block?: Block): Block | void;
  getCurrentList(value: Value, block?: Block): Block | void;
  getItemsAtRange(value: Value, range?: Selection): Node[];
}

interface Changes {
  increaseItemDepth(change: Change): Change;
  decreaseItemDepth(change: Change): Change;
  wrapInList(change: Change, type?: String, data?: Object | Data): Change;
  unwrapList(change: Change): Change;
  splitListItem(change: Change): Change;
}

export default function EditList(options: Options): EditListPlugin;
