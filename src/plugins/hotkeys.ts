import { isKeyHotkey } from "is-hotkey";
import { Plugin } from "slate-react";
import { MARKS } from "markup-it";

const isBoldHotkey = isKeyHotkey("mod+b");
const isItalicHotkey = isKeyHotkey("mod+i");
const isCodeHotkey = isKeyHotkey("mod+`");

const getHotkeyMark = (event: KeyboardEvent): string | null => {
  if (isBoldHotkey(event)) {
    return MARKS.BOLD;
  } else if (isItalicHotkey(event)) {
    return MARKS.ITALIC;
  } else if (isCodeHotkey(event)) {
    return MARKS.CODE;
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
