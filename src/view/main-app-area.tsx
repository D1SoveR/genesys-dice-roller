import * as React from "react";
import { startCase } from "lodash-es";

import { AllowedDice, AllowedResults } from "src/model/dice";
import { AbilityDie, ProficiencyDie, BoostDie, DifficultyDie, ChallengeDie, SetbackDie, PercentileDie } from "src/model/dice";

import DiceList from "src/view/dice-list";
import RollResults from "src/view/roll-results";
import { orderDice } from "src/util/order";

type diceTypes = "ability" | "proficiency" | "boost" | "difficulty" | "challenge" | "setback" | "percentile";
const diceTypes: Readonly<diceTypes[]> = Object.freeze(["ability", "proficiency", "boost", "difficulty", "challenge", "setback"]);

export default class MainAppArea extends React.Component<any, { dice: AllowedDice[], results: AllowedResults[] }> {

    constructor(props: any) {
        super(props);
        this.state = { dice: [], results: [] };
    }

    addDie(type: diceTypes): void {

        const { dice, results } = this.state;
        let newDie!: AllowedDice;

        switch (type) {
            case diceTypes[0]:
                newDie = new AbilityDie();
                break;
            case diceTypes[1]:
                newDie = new ProficiencyDie();
                break;
            case diceTypes[2]:
                newDie = new BoostDie();
                break;
            case diceTypes[3]:
                newDie = new DifficultyDie();
                break;
            case diceTypes[4]:
                newDie = new ChallengeDie();
                break;
            case diceTypes[5]:
                newDie = new SetbackDie();
                break;
            case "percentile":
                newDie = new PercentileDie();
                break;
        }

        this.setState({ results, dice: dice.concat([newDie]).sort(orderDice)});
    }

    roll() {
        const { dice } = this.state;
        this.setState({
            dice,
            results: dice.map(die => die.roll())
        });
    }

    render() {

        const actionButtons = diceTypes.map(diceType => <button onClick={() => this.addDie(diceType)}>{startCase(`add ${diceType} die`)}</button>);
        actionButtons.push(<button onClick={() => this.addDie("percentile")}>Add Percentile Dice</button>);
        actionButtons.push(<button onClick={() => this.roll()}>Roll the dice!</button>);

        return <div className="dice-area">
            <DiceList dice={this.state.dice}/>
            <div className="actions">{actionButtons}</div>
            <RollResults results={this.state.results}/>
        </div>;
    }

}
