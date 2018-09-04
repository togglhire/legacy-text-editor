import TrailingBlock from "slate-trailing-block";
import { blocks } from "../constants";

export const trailingBlockPlugin = TrailingBlock({
  type: blocks.paragraph
});
