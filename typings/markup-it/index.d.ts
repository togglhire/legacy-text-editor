import { create } from "domain";
import { Document } from "slate";

interface BlockConstants {
  TEXT: "unstyled";
  CODE: "code_block";
  CODE_LINE: "code_line";
  BLOCKQUOTE: "blockquote";
  PARAGRAPH: "paragraph";
  FOOTNOTE: "footnote";
  HTML: "html_block";
  HR: "hr";
  HEADING_1: "header_one";
  HEADING_2: "header_two";
  HEADING_3: "header_three";
  HEADING_4: "header_four";
  HEADING_5: "header_five";
  HEADING_6: "header_six";
  TABLE: "table";
  TABLE_ROW: "table_row";
  TABLE_CELL: "table_cell";
  OL_LIST: "ordered_list";
  UL_LIST: "unordered_list";
  LIST_ITEM: "list_item";
  COMMENT: "comment";
  MATH: "math_block";
  DEFAULT: "paragraph";
}

interface InlineConstants {
  HTML: "html";
  LINK: "link";
  IMAGE: "image";
  FOOTNOTE_REF: "footnote-ref";
  MATH: "math";
  VARIABLE: "variable";
}

interface MarkConstants {
  BOLD: "BOLD";
  ITALIC: "ITALIC";
  CODE: "CODE";
  STRIKETHROUGH: "STRIKETHROUGH";
}

interface RulesSet {}

export class State {
  static create(rulesSet: RulesSet): State;

  deserializeToDocument(input: string): Document;
  serializeDocument(document: Document): string;
}

export const BLOCKS: BlockConstants;
export const INLINES: InlineConstants;
export const MARKS: MarkConstants;
