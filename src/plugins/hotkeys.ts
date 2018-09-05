import { isKeyHotkey } from "is-hotkey";
import { Plugin } from "slate-react";
import { marks } from "../constants";
import { inlineCodePlugin } from "./inlineCode";

const isBoldHotkey = isKeyHotkey("mod+b");
const isItalicHotkey = isKeyHotkey("mod+i");
const isCodeHotkey = isKeyHotkey("mod+`");

export const hotkeyPlugin: Plugin = {
  onKeyDown: (event, change) => {
    const keyboardEvent = event as KeyboardEvent;

    if (isCodeHotkey(keyboardEvent)) {
      if (inlineCodePlugin.utils.isInCode(change.value)) {
        return inlineCodePlugin.changes.unwrapCode(change);
      } else {
        return inlineCodePlugin.changes.wrapInCode(change);
      }
    }

    if (isBoldHotkey(keyboardEvent)) {
      return change.toggleMark(marks.bold);
    }

    if (isItalicHotkey(keyboardEvent)) {
      return change.toggleMark(marks.italic);
    }
  }
};
