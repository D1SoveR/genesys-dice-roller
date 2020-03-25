import * as React from "react";
import { startCase } from "lodash-es";

import { AllowedDice, AllowedResults } from "src/model/dice";
import { AbilityDie, ProficiencyDie, BoostDie, DifficultyDie, ChallengeDie, SetbackDie, PercentileDie } from "src/model/dice";

import DiceControls from "src/view/dice-controls";
import DiceList from "src/view/dice-list";
import RollResults from "src/view/roll-results";
import { orderDice } from "src/util/order";

type diceTypes = "ability" | "proficiency" | "boost" | "difficulty" | "challenge" | "setback" | "percentile";
const diceTypes: Readonly<diceTypes[]> = Object.freeze(["ability", "proficiency", "boost", "difficulty", "challenge", "setback"]);

export default class MainAppArea extends React.Component<any, { dice: AllowedDice[], results: AllowedResults[] }> {

    constructor(props: any) {
        super(props);
        this.state = { dice: [], results: [] };

        this.addDie = this.addDie.bind(this);
        this.clearDice = this.clearDice.bind(this);
        this.roll = this.roll.bind(this);
    }

    addDie(newDie: AllowedDice): void {
        const { dice, results } = this.state;
        this.setState({ results, dice: dice.concat([newDie]).sort(orderDice)});
    }

    clearDice(): void {
        this.setState({ results: [], dice: [] });
    }

    roll() {
        const { dice } = this.state;
        this.setState({
            dice,
            results: dice.map(die => die.roll())
        });
    }

    render() {
        return <div className="dice-area">
            <DiceControls
                addDiceCallback={this.addDie}
                clearCallback={this.clearDice}
            />
            <DiceList dice={this.state.dice}/>
            <button onClick={this.roll}>Roll</button>
            <RollResults results={this.state.results}/>
        </div>;
    }

}
