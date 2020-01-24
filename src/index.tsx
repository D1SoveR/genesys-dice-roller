import * as React from "react";
import * as ReactDOM from "react-dom";

class App extends React.Component {
    render() { return [<h1>Genesys Dice Roller</h1>, <p>This is an application test</p>]; }
}

ReactDOM.render(<App/>, document.getElementById("app"));
