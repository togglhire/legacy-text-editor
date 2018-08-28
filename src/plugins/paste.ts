import { Plugin, getEventTransfer } from "slate-react";
import { State } from "markup-it";
import html from "markup-it/lib/html";

export const pastePlugin: Plugin = {
  onPaste: (event, change) => {
    const transfer = getEventTransfer(event);
    if (transfer.type !== "html") return;

    const state = State.create(html);
    const document = state.deserializeToDocument(transfer.html);

    return change.insertFragment(document);
  }
};
