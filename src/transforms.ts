import { EditorState, RichTextState } from "./types";
import { marks, blocks } from "./constants";
import { Value, Change } from "slate";
import { codePlugin } from "./plugins/code";
import { listPlugin } from "./plugins/list";
import { linkPlugin } from "./plugins/link";
import { editorStateToMarkdown, markdownToEditorState } from "./markdown";

const changeRichTextState = (
  state: RichTextState,
  action: (change: Change) => Change
): RichTextState => {
  const change = state.value.change();
  const value = action(change).value;
  return { type: "rich-text", value };
};

const toggleMark = (mark: string) => (state: RichTextState): RichTextState => {
  return changeRichTextState(state, change => change.toggleMark(mark));
};

export const toggleBold = toggleMark(marks.bold);
export const toggleItalic = toggleMark(marks.italic);
export const toggleStrikethrough = toggleMark(marks.strikethrough);
export const toggleInlineCode = toggleMark(marks.code);

export const toggleBlockCode = (state: RichTextState): RichTextState => {
  return changeRichTextState(state, change =>
    codePlugin.changes.toggleCodeBlock(change, blocks.paragraph)
  );
};

const toggleList = (type: string) => (state: RichTextState): RichTextState => {
  return changeRichTextState(state, change => {
    if (listPlugin.utils.isSelectionInList(change.value)) {
      return listPlugin.changes.unwrapList(change);
    } else {
      return listPlugin.changes.wrapInList(change, type);
    }
  });
};

export const toggleOrderedList = toggleList(blocks.orderedList);
export const toggleUnorderedList = toggleList(blocks.unorderedList);

export const toggleLink = (state: RichTextState): RichTextState => {
  return changeRichTextState(state, change => {
    if (linkPlugin.utils.isInLink(change.value)) {
      return linkPlugin.changes.unwrapLink(change);
    } else {
      return linkPlugin.changes.wrapInLink(change);
    }
  });
};

export const toggleMarkdown = (state: EditorState): EditorState => {
  if (state.type === "rich-text") {
    return { type: "raw-markdown", value: editorStateToMarkdown(state) };
  } else if (state.type === "raw-markdown") {
    return markdownToEditorState(state.value);
  } else {
    return state;
  }
};
