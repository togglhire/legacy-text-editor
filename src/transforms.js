import { marks, blocks, inlines } from "./constants";
import { blockCodePlugin } from "./plugins/blockCode";
import { listPlugin } from "./plugins/list";
import { linkPlugin } from "./plugins/link";
import { editorStateToMarkdown, markdownToEditorState } from "./markdown";
import { inlineCodePlugin } from "./plugins/inlineCode";
import { imagePlugin } from "./plugins/image";
import { createRawMarkdownState } from "./state";

const changeRichTextState = (state, action) => {
  const change = state.value.change();
  const value = action(change).value;
  return { type: "rich-text", value };
};

const toggleMark = mark => state => {
  return changeRichTextState(state, change => change.toggleMark(mark));
};

export const toggleBold = toggleMark(marks.bold);
export const toggleItalic = toggleMark(marks.italic);
export const toggleStrikethrough = toggleMark(marks.strikethrough);

export const toggleBlockCode = state => {
  return changeRichTextState(state, change =>
    blockCodePlugin.changes
      .toggleCodeBlock(change, blocks.paragraph)
      .normalize()
  );
};

const toggleList = type => state => {
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

export const toggleLink = state => {
  return changeRichTextState(state, change => {
    if (linkPlugin.utils.isInLink(change.value)) {
      return linkPlugin.changes.unwrapLink(change);
    } else {
      return linkPlugin.changes.wrapInLink(change);
    }
  });
};

export const toggleInlineCode = state => {
  return changeRichTextState(state, change => {
    if (inlineCodePlugin.utils.isInCode(change.value)) {
      return inlineCodePlugin.changes.unwrapCode(change);
    } else {
      return inlineCodePlugin.changes.wrapInCode(change);
    }
  });
};

export const insertImage = (state, url) => {
  return changeRichTextState(state, change => {
    return imagePlugin.changes.insertImage(change, url);
  });
};

export const insertUpload = (state, id) => {
  return changeRichTextState(state, change => {
    return imagePlugin.changes.insertUpload(change, id);
  });
};

export const replaceUpload = (state, id, url) => {
  return changeRichTextState(state, change => {
    return imagePlugin.changes.replaceUpload(change, id, url);
  });
};

export const toggleMarkdown = state => {
  if (state.type === "rich-text") {
    return createRawMarkdownState(editorStateToMarkdown(state));
  } else if (state.type === "raw-markdown") {
    return markdownToEditorState(state.value);
  } else {
    return state;
  }
};

const isInMark = type => state => {
  return state.value.activeMarks.some(mark => mark.type === type);
};

const isInInline = type => state => {
  return state.value.inlines.some(inline => inline.type === type);
};

export const isInBold = isInMark(marks.bold);
export const isInItalic = isInMark(marks.italic);
export const isInStrikethrough = isInMark(marks.strikethrough);
export const isInInlineCode = isInInline(inlines.code);
export const isInLink = isInInline(inlines.link);

export const isInBlockCode = state => {
  return blockCodePlugin.utils.isInCodeBlock(state.value);
};

const isInList = type => state => {
  const list = listPlugin.utils.getCurrentList(state.value);
  return list ? list.type === type : false;
};

export const isInOrderedList = isInList(blocks.orderedList);
export const isInUnorderedList = isInList(blocks.unorderedList);

export const isInMarkdown = state => {
  return state.type === "raw-markdown";
};
