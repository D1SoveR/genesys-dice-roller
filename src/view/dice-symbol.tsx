import * as React from "react";
import Symbols from "src/model/symbols";

export default class DiceSymbol extends React.Component<{ symbol: Symbols }> {
    render() {
        return <span className="dice-symbol">{this.props.symbol}</span>;
    }
}
