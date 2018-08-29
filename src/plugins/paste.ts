import { Plugin, getEventTransfer } from "slate-react";
import { State } from "markup-it";
import html from "markup-it/lib/html";

export const pastePlugin: Plugin = {
  onPaste: (event, change) => {
    const transfer = getEventTransfer(event);
    if (transfer.type !== "html") return;

    const source: string = (transfer as any).html;

    const state = State.create(html);
    const document = state.deserializeToDocument(source);

    return change.insertFragment(document);
  }
};
