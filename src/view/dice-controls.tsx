import * as React from "react";
import { startCase } from "lodash-es";
import Symbols from "src/model/symbols";
import { AllowedDice, GenesysDie, AbilityDie, ProficiencyDie, BoostDie, DifficultyDie, ChallengeDie, SetbackDie, PercentileDie } from "src/model/dice";
import DiceDisplay from "src/view/display/dice";

const diceToCreate: ({ cls: typeof GenesysDie, result: GenesysDie["currentResult"] } | { cls: typeof PercentileDie, result: number })[] = [
    { cls: AbilityDie,     result: [Symbols.SUCCESS] },
    { cls: ProficiencyDie, result: [Symbols.TRIUMPH] },
    { cls: BoostDie,       result: [Symbols.ADVANTAGE] },
    { cls: DifficultyDie,  result: [Symbols.FAILURE] },
    { cls: ChallengeDie,   result: [Symbols.DESPAIR] },
    { cls: SetbackDie,     result: [Symbols.THREAT] },
    { cls: PercentileDie,  result: 42 }
];

/**
 * This component is used in main app area to draw the list of all the dice to the pool.
 */
const DiceControls: React.SFC<{
    callback: (die: AllowedDice) => void
}> = ({ callback }) => {

    const additionButtons = diceToCreate.map(({ cls, result }, i) => {

        const dieName = startCase(cls.name).split(" ")[0].toLowerCase();

        return <button type="button" id={`add-${dieName}`} key={i} onClick={() => callback(new cls())}>
            <DiceDisplay die={Object.assign(new cls(), { currentResult: result })} />
        </button>;
    });

    return <div className="dice-controls">{additionButtons}</div>;
}
export default DiceControls;
