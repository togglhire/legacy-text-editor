import * as React from "react";
import { render } from "react-dom";
import { Toolbar, TextEditor } from "../src";
import { Value, Change } from "slate";

interface State {
  value: Value;
}

class App extends React.Component<{}, State> {
  state = {
    value: initialValue
  };

  render() {
    const { value } = this.state;

    return (
      <div className="editor">
        <div className="editor-toolbar">
          <Toolbar value={value} onChange={this.handleChange} />
        </div>

        <TextEditor
          className="editor-content"
          value={value}
          onChange={this.handleChange}
        />
      </div>
    );
  }

  handleChange = ({ value }: Change) => {
    this.setState({ value });
  };
}

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: "block",
        type: "paragraph"
      }
    ]
  }
});

render(<App />, document.getElementById("app"));
