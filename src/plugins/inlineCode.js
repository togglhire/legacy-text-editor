import { Schema } from "slate";
import { inlines } from "../constants";

const schema = Schema.create({
  inlines: {
    [inlines.code]: {
      nodes: [{ objects: ["text"] }],
      marks: []
    }
  }
});

const isInCode = value => {
  return value.inlines.some(inline => inline.type === inlines.code);
};

const wrapInCode = change => {
  return change.wrapInline(inlines.code);
};

const unwrapCode = change => {
  return change.unwrapInline(inlines.code);
};

export const inlineCodePlugin = {
  schema,
  utils: { isInCode },
  changes: { wrapInCode, unwrapCode }
};
