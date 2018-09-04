import { isKeyHotkey } from "is-hotkey";
import { Plugin } from "slate-react";
import { marks } from "../constants";

const isBoldHotkey = isKeyHotkey("mod+b");
const isItalicHotkey = isKeyHotkey("mod+i");
const isCodeHotkey = isKeyHotkey("mod+`");

const getHotkeyMark = (event: KeyboardEvent): string | null => {
  if (isBoldHotkey(event)) {
    return marks.bold;
  } else if (isItalicHotkey(event)) {
    return marks.italic;
  } else if (isCodeHotkey(event)) {
    return marks.code;
  } else {
    return null;
  }
};

export const hotkeyPlugin: Plugin = {
  onKeyDown: (event, change) => {
    const mark = getHotkeyMark(event as KeyboardEvent);

    if (mark) {
      return change.toggleMark(mark);
    }
  }
};
