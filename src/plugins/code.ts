import EditCode from "slate-edit-code";
import { blocks } from "../constants";

export const codePlugin = EditCode({
  containerType: blocks.code,
  lineType: blocks.codeLine,
  exitBlockType: blocks.paragraph
});
