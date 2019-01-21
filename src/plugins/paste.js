import { getEventTransfer } from "slate-react";
import { blocks, marks, inlines } from "../constants";

const blockTags = {
  p: blocks.paragraph,
  li: blocks.listItem,
  ul: blocks.unorderedList,
  ol: blocks.orderedList
};

const markTags = {
  strong: marks.bold,
  em: marks.italic,
  s: marks.strikethrough
};

const rules = [
  {
    deserialize(el, next) {
      const block = blockTags[el.tagName.toLowerCase()];

      if (block) {
        return {
          object: "block",
          type: block,
          nodes: next(el.childNodes)
        };
      }
    }
  },
  {
    deserialize(el, next) {
      const mark = markTags[el.tagName.toLowerCase()];

      if (mark) {
        return {
          object: "mark",
          type: mark,
          nodes: next(el.childNodes)
        };
      }
    }
  },
  {
    deserialize(el, next) {
      if (el.tagName.toLowerCase() == "pre" && el.textContent != null) {
        const lines = el.textContent.split(/\r\n|\n|\r/);

        return {
          object: "block",
          type: blocks.code,
          nodes: lines.map(line => ({
            object: "block",
            type: blocks.codeLine,
            nodes: [
              { object: "text", leaves: [{ object: "leaf", text: line }] }
            ]
          }))
        };
      }
    }
  },
  {
    deserialize(el, next) {
      if (el.tagName.toLowerCase() == "img") {
        return {
          object: "block",
          type: inlines.image,
          nodes: next(el.childNodes),
          data: {
            src: el.getAttribute("src"),
            title: el.getAttribute("title"),
            alt: el.getAttribute("alt")
          }
        };
      }
    }
  },
  {
    deserialize(el, next) {
      if (el.tagName.toLowerCase() == "a") {
        return {
          object: "inline",
          type: inlines.link,
          nodes: next(el.childNodes),
          data: {
            href: el.getAttribute("href"),
            title: el.getAttribute("title")
          }
        };
      }
    }
  },
  {
    deserialize(el, next) {
      if (el.tagName.toLowerCase() == "code") {
        return {
          object: "inline",
          type: inlines.code,
          nodes: [
            {
              object: "text",
              leaves: [{ object: "leaf", text: el.textContent }]
            }
          ]
        };
      }
    }
  }
];

export const pastePlugin = {
  onPaste: (event, change) => {
    const transfer = getEventTransfer(event);

    if (transfer.type === "html") {
      const source = transfer.html;

      const serializer = new Serializer({ rules });
      const value = serializer.deserialize(source);

      return change.insertFragment(value.document);
    }

    if (transfer.type === "text") {
      const source = transfer.text;
      return change.insertText(source);
    }
  }
};
