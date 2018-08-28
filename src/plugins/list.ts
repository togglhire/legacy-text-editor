import EditList from "slate-edit-list";
import { BLOCKS } from "markup-it";

export const listPlugin = EditList({
  types: [BLOCKS.OL_LIST, BLOCKS.UL_LIST],
  typeItem: BLOCKS.LIST_ITEM,
  typeDefault: BLOCKS.DEFAULT
});
