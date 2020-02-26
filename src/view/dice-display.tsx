import * as React from "react";
import { startCase } from "lodash-es";
import { AllowedDice, AllowedResults } from "src/model/dice";
import SymbolDisplay from "src/view/symbol-display";

/**
 * Converts result of the die roll (or the lack of thereof) into something
 * human-readable; pending mark for no rolls, symbols for regular Genesys dice,
 * and the number for percentile die.
 */
function convertDieResult(result: AllowedResults): string | JSX.Element[] {
    if (result === null) {
        return [<span>?</span>];
    } else if (typeof result === "number") {
        return [<span>{result + ""}</span>];
    }
    return result.map((s, i) => <SymbolDisplay symbol={s} key={i} />);
}

/**
 * This component is used to render the dice images in the main area of the app.
 * Given the die model instance, converts the roll result into something human-readable,
 * and draws it in an element styled to look like a die of relevant shape and colour.
 */
const DiceDisplay: React.SFC<{ die: AllowedDice }> = ({ die }) => <div className={startCase(die.constructor.name).toLowerCase()}>
    {convertDieResult(die.currentResult)}
</div>;
export default DiceDisplay;
