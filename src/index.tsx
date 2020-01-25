import * as React from "react";
import * as ReactDOM from "react-dom";

import MainAppArea from "src/view/main-app-area";

class App extends React.Component {
    render() { return [
        <h1>Genesys Dice Roller</h1>,
        <p>This is an application test</p>,
        <MainAppArea/>
    ]; }
}

const root = document.getElementById("app")!,
      noJS = document.getElementById("no-js");

if (noJS) {
    root.removeChild(noJS);
}
ReactDOM.render(<App/>, root);
