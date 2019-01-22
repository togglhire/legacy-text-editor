import { isKeyHotkey } from "is-hotkey";
import { marks } from "../constants";
import { inlineCodePlugin } from "./inlineCode";

const isBoldHotkey = isKeyHotkey("mod+b");
const isItalicHotkey = isKeyHotkey("mod+i");
const isCodeHotkey = isKeyHotkey("mod+`");

export const hotkeyPlugin = {
  onKeyDown: (event, change) => {
    if (isCodeHotkey(event)) {
      if (inlineCodePlugin.utils.isInCode(change.value)) {
        return inlineCodePlugin.changes.unwrapCode(change);
      } else {
        return inlineCodePlugin.changes.wrapInCode(change);
      }
    }

    if (isBoldHotkey(event)) {
      return change.toggleMark(marks.bold);
    }

    if (isItalicHotkey(event)) {
      return change.toggleMark(marks.italic);
    }
  }
};
