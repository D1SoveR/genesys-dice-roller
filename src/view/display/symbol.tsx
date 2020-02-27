import * as React from "react";
import { isArray } from "lodash-es";
import Symbols from "src/model/symbols";

/**
 * This component is used to display the Genesys dice symbols using their dedicated font.
 * It takes either an individual symbol or a list of them, and renders them with required font styling.
 */
const SymbolDisplay: React.SFC<{ symbol: Symbols | Symbols[] }> = ({ symbol }) => {
    return <span className="dice-symbol">{isArray(symbol) ? symbol.join("") : symbol}</span>;
};
export default SymbolDisplay;
