import { Plugin, getEventTransfer } from "slate-react";
import { State, BLOCKS } from "markup-it";
import html from "markup-it/lib/html";
import { Text, Block } from "slate";

export const pastePlugin: Plugin = {
  onPaste: (event, change) => {
    const transfer = getEventTransfer(event);

    if (transfer.type === "html") {
      const source: string = (transfer as any).html;

      const state = State.create(html);
      const document = state.deserializeToDocument(source);

      return change.insertFragment(document);
    }

    if (transfer.type === "text") {
      const source: string = (transfer as any).text;
      return change.insertText(source);
    }
  }
};
