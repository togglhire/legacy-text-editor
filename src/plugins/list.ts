import EditList from "slate-edit-list";
import { blocks } from "../constants";

export const listPlugin = EditList({
  types: [blocks.orderedList, blocks.unorderedList],
  typeItem: blocks.listItem,
  typeDefault: blocks.paragraph
});
