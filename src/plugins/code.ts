import EditCode from "slate-edit-code";
import { BLOCKS } from "markup-it";

export const codePlugin = EditCode({
  containerType: BLOCKS.CODE,
  lineType: BLOCKS.CODE_LINE,
  exitBlockType: BLOCKS.DEFAULT
});
