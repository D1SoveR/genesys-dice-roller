import * as React from "react";
import { startCase } from "lodash-es";
import Symbols from "src/model/symbols";
import { AllowedDice } from "src/model/dice";
import { AbilityDie, ProficiencyDie, BoostDie, DifficultyDie, ChallengeDie, SetbackDie, PercentileDie } from "src/model/dice";

const dieClasses = [AbilityDie, ProficiencyDie, BoostDie, DifficultyDie, ChallengeDie, SetbackDie, PercentileDie];

/**
 * This component is used in main app area to draw the list of all the dice to the pool.
 */
const DiceControls: React.SFC<{
    addDiceCallback: (die: AllowedDice) => void,
    clearCallback:   () => void
}> = ({ addDiceCallback, clearCallback }) => {

    const additionButtons: JSX.Element[] = dieClasses.map((cls, i) => {
        const label = `Add ${startCase(cls.name)}`;
        return <button type="button" key={i} onClick={() => addDiceCallback(new cls())}>{label}</button>;
    });

    return <div className="dice-controls">
        <div className="addition">{additionButtons}</div>
        <button type="button" onClick={clearCallback}>Clear Dice</button>
    </div>;
}
export default DiceControls;
