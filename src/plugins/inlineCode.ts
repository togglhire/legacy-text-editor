import { Plugin } from "slate-react";
import { Schema, Value, Change } from "slate";
import { inlines } from "../constants";

const schema = Schema.create({
  inlines: {
    [inlines.code]: {
      nodes: [{ objects: ["text"] }]
      marks: []
    }
  }
});

const isInCode = (value: Value): boolean => {
  return value.inlines.some(inline => inline!.type === inlines.code);
};

const wrapInCode = (change: Change): Change => {
  return change.wrapInline(inlines.code);
};

const unwrapCode = (change: Change): Change => {
  return change.unwrapInline(inlines.code);
};

interface Utils {
  isInCode: (value: Value) => boolean;
}

interface Changes {
  wrapInCode: (change: Change) => Change;
  unwrapCode: (change: Change) => Change;
}

interface InlineCodePlugin extends Plugin {
  utils: Utils;
  changes: Changes;
}

export const inlineCodePlugin: InlineCodePlugin = {
  schema,
  utils: { isInCode },
  changes: { wrapInCode, unwrapCode }
};
