import * as React from "react";
import { flatten, isArray } from "lodash-es";
import Result from "src/model/result";
import Symbols from "src/model/symbols";
import SymbolDisplay from "src/view/display/symbol";
import { adjudicateRoll, removeOpposingSymbols } from "src/util/adjudicate";
import { orderSymbols } from "src/util/order";
import { AllowedResults } from "src/model/dice";

const RollResults: React.SFC<{ results: AllowedResults[] }> = ({ results }) => {

    let status: Result = Result.NEUTRAL;
    const resultsSymbols: Symbols[][] = [],
          resultsNumbers: number[] = [],
          elements: JSX.Element[] = [];

    results.forEach(result => {
        if (typeof result === "number") {
            resultsNumbers.push(result);
        } else if (isArray(result)) {
            resultsSymbols.push(result);
        }
    });

    // If there are any symbols, let's flatten the results and
    // eliminate the opposing ones for display; also adjudicate
    // the roll results.
    if (resultsSymbols.length) {
        const flatRoll = removeOpposingSymbols(flatten(resultsSymbols)).sort(orderSymbols);
        status = adjudicateRoll(flatRoll);
        elements.push(<div className="group symbolic">{flatRoll.map(s => <SymbolDisplay symbol={s}/>)}</div>);
    }

    elements.push(...resultsNumbers.map(score => <div className="group numeric">{score}</div>));

    return <div className={`roll-results ${status}`}>{elements}</div>;
};
export default RollResults;
