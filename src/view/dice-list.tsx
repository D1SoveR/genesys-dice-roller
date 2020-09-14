import * as React from "react";
import DiceDisplay from "src/view/display/dice";
import { AllowedDice } from "src/model/dice";

/**
 * This component is used in main app area to draw the list of all the dice to the pool.
 */
export default class DiceList extends React.Component<{ dice: AllowedDice[], selected: AllowedDice[], selectCallback?: (die: AllowedDice) => void }> {

    render() {

        const diceList = this.props.dice.map(die => {

            const click = this.props.selectCallback ?
                () => this.props.selectCallback!(die) :
                void 0;

            return <DiceDisplay die={die} selected={this.props.selected.includes(die)} onClick={click} />;
        });

        return <div className="dice-list">{diceList}</div>;
    }

}
