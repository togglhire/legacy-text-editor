import React from "react";
import {
  Toolbar,
  TextEditor,
  insertUpload,
  replaceUpload,
  markdownToEditorState,
  editorStateToMarkdown
} from "../src";
import "./editor.css";

export class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editor: initialEditorState
    };
  }

  render() {
    const { editor } = this.state;

    return (
      <div className="editor">
        <div className="editor-toolbar">
          <Toolbar
            state={editor}
            onChange={editor => this.setState({ editor })}
            onInsertImage={() => this.insertImage()}
          />
        </div>

        <div className="editor-content">
          <TextEditor
            state={editor}
            onChange={editor => this.setState({ editor })}
          />
        </div>

        <div className="editor-preview">{editorStateToMarkdown(editor)}</div>
      </div>
    );
  }

  insertImage() {
    const query = Math.floor(Math.random() * 1000).toString();
    const url = "https://placeimg.com/640/480/any?" + query;
    const id = (nextId++).toString();

    this.setState(state => ({
      editor: insertUpload(state.editor, id)
    }));

    setTimeout(() => {
      this.setState(state => ({
        editor: replaceUpload(state.editor, id, url)
      }));
    }, 1000);
  }
}

let nextId = 1;

const initialEditorState = markdownToEditorState(
  [
    "_Hello_ ~~word~~ **world**! `Inline code`",
    "```\nSome block code\n```",
    "* A list\n* Woo",
    "[Some link](http://example.com)",
    "![An image](https://via.placeholder.com/350x150)"
  ].join("\n\n")
);
