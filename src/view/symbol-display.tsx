import * as React from "react";
import { isArray } from "lodash-es";
import Symbols from "src/model/symbols";

/**
 * This component is used to display the Genesys dice symbols using their dedicated font.
 * It takes either an individual symbol or a list of them, and renders them with required font styling.
 */
export default class SymbolDisplay extends React.Component<{ symbol: Symbols | Symbols[] }> {
    render() {
        const s = this.props.symbol;
        return <span className="dice-symbol">{isArray(s) ? s.join("") : s}</span>;
    }
}
