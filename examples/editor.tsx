import * as React from "react";
import { render } from "react-dom";
import {
  Toolbar,
  TextEditor,
  EditorState,
  insertUpload,
  replaceUpload,
  markdownToEditorState,
  editorStateToMarkdown
} from "../src";

interface State {
  editor: EditorState;
}

class App extends React.Component<{}, State> {
  state = {
    editor: initialEditorState
  };

  render() {
    const { editor } = this.state;

    return (
      <div className="editor">
        <div className="editor-toolbar">
          <Toolbar
            state={editor}
            onChange={this.handleChange}
            onInsertImage={this.insertImage}
          />
        </div>

        <div className="editor-content">
          <TextEditor
            className="editor-field"
            state={editor}
            onChange={this.handleChange}
          />
        </div>

        <div className="editor-preview">{editorStateToMarkdown(editor)}</div>
      </div>
    );
  }

  insertImage = () => {
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
  };

  handleChange = (editor: EditorState) => {
    this.setState({ editor });
  };
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

render(<App />, document.getElementById("app"));
