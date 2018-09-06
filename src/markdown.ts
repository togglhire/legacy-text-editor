import unified from "unified";
import parse from "remark-parse";
import stringify from "remark-stringify";
import { Serializer, Rule } from "@hundred5/slate-unist-serializer";
import { EditorState } from "./types";
import { blocks, marks, inlines } from "./constants";

interface Node {
  type: string;
  children?: Node[];
  value?: string;
  [attribute: string]: any;
}

const rules: Rule<Node>[] = [
  // document
  {
    serialize(node, children) {
      if (node.object === "document") {
        return { type: "root", children };
      }
    },
    deserialize(node, next) {
      if (node.type === "root") {
        if (node.children != null && node.children.length > 0) {
          return { object: "document", nodes: next(node.children) };
        } else {
          return {
            object: "document",
            nodes: next([
              { type: "paragraph", children: [{ type: "text", value: "" }] }
            ])
          };
        }
      }
    }
  },

  // text
  {
    serialize(node, children) {
      if (node.object === "string") {
        return { type: "text", value: node.text };
      }
    },
    deserialize(node, next) {
      if (node.type === "text" && node.value != null) {
        return {
          object: "text",
          leaves: [{ object: "leaf", text: node.value }]
        };
      }
    }
  },

  // paragraph
  {
    serialize(node, children) {
      if (node.object === "block" && node.type === blocks.paragraph) {
        return { type: "paragraph", children };
      }
    },
    deserialize(node, next) {
      if (node.type === "paragraph") {
        return {
          object: "block",
          type: blocks.paragraph,
          nodes: node.children ? next(node.children) : []
        };
      }
    }
  },

  // block code
  {
    serialize(node, children) {
      if (node.object === "block" && node.type === blocks.code) {
        return {
          type: "code",
          lang: null,
          meta: null,
          value: children
            .map(child => child.value)
            .filter((text): text is string => text != null)
            .join("\n")
        };
      }

      if (node.object === "block" && node.type === blocks.codeLine) {
        return {
          type: "codeLine",
          value: children
            .map(child => child.value)
            .filter((text): text is string => text != null)
            .join("")
        };
      }
    },
    deserialize(node, next) {
      if (node.type === "code" && node.value != null) {
        const lines = node.value.split("\n");

        return {
          object: "block",
          type: blocks.code,
          nodes: lines.map(text => ({
            object: "block",
            type: blocks.codeLine,
            nodes: [{ object: "text", leaves: [{ object: "leaf", text }] }]
          }))
        };
      }
    }
  },

  // inline code
  {
    serialize(node, children) {
      if (node.object === "inline" && node.type === inlines.code) {
        return { type: "inlineCode", value: node.text };
      }
    },
    deserialize(node, next) {
      if (node.type === "inlineCode" && node.value != null) {
        return {
          object: "inline",
          type: inlines.code,
          nodes: [
            { object: "text", leaves: [{ object: "leaf", text: node.value }] }
          ]
        };
      }
    }
  },

  // list
  {
    serialize(node, children) {
      if (
        node.object === "block" &&
        (node.type === blocks.orderedList || node.type === blocks.unorderedList)
      ) {
        return {
          type: "list",
          ordered: node.type === blocks.orderedList,
          start: node.type === blocks.orderedList ? 1 : undefined,
          children
        };
      }

      if (node.object === "block" && node.type === blocks.listItem) {
        return { type: "listItem", children };
      }
    },
    deserialize(node, next) {
      if (node.type === "list") {
        return {
          object: "block",
          type: node.ordered ? blocks.orderedList : blocks.unorderedList,
          nodes: node.children ? next(node.children) : []
        };
      }

      if (node.type === "listItem") {
        return {
          object: "block",
          type: blocks.listItem,
          nodes: node.children ? next(node.children) : []
        };
      }
    }
  },

  // link
  {
    serialize(node, children) {
      if (node.object === "inline" && node.type === inlines.link) {
        return {
          type: "link",
          url: node.data.get("href"),
          title: node.data.get("title"),
          children
        };
      }
    },
    deserialize(node, next) {
      if (node.type === "link") {
        return {
          object: "inline",
          type: inlines.link,
          data: {
            href: node.url,
            title: node.title
          },
          nodes: node.children ? next(node.children) : []
        };
      }
    }
  },

  // image
  {
    serialize(node) {
      if (node.object === "inline" && node.type === inlines.image) {
        const url = node.data.get("src");
        const title = node.data.get("title");
        const alt = node.data.get("alt");

        return { type: "image", url, title, alt };
      }

      if (node.object === "inline" && node.type === inlines.upload) {
        return { type: "text", value: "(Upload)" };
      }
    },
    deserialize(node) {
      if (node.type === "image") {
        return {
          object: "inline",
          type: inlines.image,
          isVoid: true,
          data: {
            src: node.url,
            title: node.title,
            alt: node.alt
          }
        };
      }
    }
  },

  // marks
  {
    serialize(node, children) {
      if (node.object !== "mark") return;

      switch (node.type) {
        case marks.bold:
          return { type: "strong", children };
        case marks.italic:
          return { type: "emphasis", children };
        case marks.strikethrough:
          return { type: "delete", children };
      }
    },
    deserialize(node, next) {
      if (node.children == null) return;

      switch (node.type) {
        case "strong":
          return {
            object: "mark",
            type: marks.bold,
            nodes: next(node.children)
          };
        case "emphasis":
          return {
            object: "mark",
            type: marks.italic,
            nodes: next(node.children)
          };
        case "delete":
          return {
            object: "mark",
            type: marks.strikethrough,
            nodes: next(node.children)
          };
      }
    }
  },

  // ignore uknown nodes
  {
    serialize() {
      return null;
    },
    deserialize() {
      return null;
    }
  }
];

const serializer = new Serializer({ rules });
const processor = unified()
  .use(parse)
  .use(stringify);

export const markdownToEditorState = (source: string): EditorState => {
  const tree = processor.parse(source);
  const value = serializer.deserialize(tree);

  return { type: "rich-text", value };
};

export const editorStateToMarkdown = (state: EditorState): string => {
  if (state.type === "rich-text") {
    const tree = serializer.serialize(state.value);
    const source = processor.stringify(tree);

    return source;
  } else if (state.type === "raw-markdown") {
    return state.value;
  } else {
    return "";
  }
};
