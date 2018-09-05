import EditCode from "slate-edit-code";
import { blocks } from "../constants";

export const blockCodePlugin = EditCode({
  containerType: blocks.code,
  lineType: blocks.codeLine,
  exitBlockType: blocks.paragraph
});
