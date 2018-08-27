import * as React from "react";
import { render } from "react-dom";
import { Editor } from "../src/Editor";

class App extends React.Component {
  render() {
    return <Editor />;
  }
}

render(<App />, document.getElementById("app"));
