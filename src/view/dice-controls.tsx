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
    callback: (die: AllowedDice) => void
}> = ({ callback }) => {

    const additionButtons: JSX.Element[] = dieClasses.map((cls, i) => {
        const label = `Add ${startCase(cls.name)}`;
        return <button type="button" key={i} onClick={() => callback(new cls())}>{label}</button>;
    });

    return <div className="dice-controls">{additionButtons}</div>;
}
export default DiceControls;
