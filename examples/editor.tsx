import * as React from "react";
import { render } from "react-dom";
import { TextEditor } from "../src/TextEditor";
import { Value } from "slate";

interface State {
  value: Value;
}

class App extends React.Component<void, State> {
  state = {
    value: initialValue
  };

  render() {
    const { value } = this.state;

    return (
      <TextEditor
        value={value}
        onChange={({ value }) => {
          this.setState({ value });
        }}
      />
    );
  }
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
