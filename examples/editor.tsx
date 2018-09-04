import * as React from "react";
import { render } from "react-dom";
import {
  Toolbar,
  TextEditor,
  EditorState,
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
          <Toolbar state={editor} onChange={this.handleChange} />
        </div>

        <TextEditor
          className="editor-content"
          state={editor}
          onChange={this.handleChange}
        />

        <div className="editor-preview">{editorStateToMarkdown(editor)}</div>
      </div>
    );
  }

  handleChange = (editor: EditorState) => {
    this.setState({ editor });
  };
}

const initialEditorState = markdownToEditorState(
  [
    "_Hello_ ~~word~~ **world**!",
    "    Some code",
    "* A list\n* Woo",
    "[Some link](http://example.com)",
    "![An image](https://via.placeholder.com/350x150)"
  ].join("\n\n")
);

render(<App />, document.getElementById("app"));
