import * as React from "react";
import DiceDisplay from "src/view/display/dice";
import { AllowedDice } from "src/model/dice";

/**
 * This component is used in main app area to draw the list of all the dice to the pool.
 */
const DiceList: React.SFC<{ dice: AllowedDice[] }> = ({ dice }) => <div className="dice-list">
    {dice.map(die => <DiceDisplay die={die}/>)}
</div>;
export default DiceList;
