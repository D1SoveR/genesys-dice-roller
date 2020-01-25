import * as React from "react";
import { startCase } from "lodash-es";
import { AllowedDice, AllowedResults } from "src/model/dice";
import SymbolDisplay from "src/view/symbol-display";

/**
 * This component is used to render the dice images in the main area of the app.
 * Given the die model instance, converts the roll result into something human-readable,
 * and draws it in an element styled to look like a die of relevant shape and colour.
 */
export default class DiceDisplay extends React.Component<{ die: AllowedDice }> {

    /**
     * Converts result of the die roll (or the lack of thereof) into something
     * human-readable; pending mark for no rolls, symbols for regular Genesys dice,
     * and the number for percentile die.
     */
    static convertDieResult(result: AllowedResults): string | JSX.Element[] {
        if (result === null) {
            return "?";
        } else if (typeof result === "number") {
            return result + "";
        } else {
            return result.map((s, i) => <SymbolDisplay symbol={s} key={i} />);
        }
    }

    render() {
        return <div className={startCase(this.props.die.constructor.name).toLowerCase()}>
            {DiceDisplay.convertDieResult(this.props.die.currentResult)}
        </div>;
    }
}
