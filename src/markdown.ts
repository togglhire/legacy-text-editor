import markdown from "markup-it/lib/markdown";
import { State } from "markup-it";
import { Document } from "slate";

export const deserializeMarkdownToDocument = (source: string): Document => {
  const state = State.create(markdown);
  return state.deserializeToDocument(source);
};

export const serializeDocumentToMarkdown = (document: Document): string => {
  const state = State.create(markdown);
  return state.serializeDocument(document);
};
