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
 * This component draws the collection of buttons that can be used to add new dice to the dice pool.
 * Once rendered, it doesn't really change, so it extends PureComponent rather than Component.
 */
export default class DiceControls extends React.PureComponent<{ callback: (die: AllowedDice) => void }> {

    /**
     * Iterates over the list of all the dice we handle in the dice roller,
     * along with default result to show (so that the dice are easily identifiable),
     * and renders each of those in a button that adds a new die of that type whenever it's clicked.
     */
    render() {

        const additionButtons = diceToCreate.map(({ cls, result }, i) => {
            const dieName = startCase(cls.name).split(" ")[0].toLowerCase();
            return <button type="button" id={`add-${dieName}`} key={i} onClick={() => this.props.callback(new cls())}>
                <DiceDisplay die={Object.assign(new cls(), { currentResult: result })} />
            </button>;
        });

        return <div className="dice-controls">{additionButtons}</div>;
    }
}
