import * as React from "react";
import { startCase } from "lodash-es";

import { AcceptedResults, Die, GenesysDie } from "src/model/dice";
import { AbilityDie, ProficiencyDie, BoostDie, DifficultyDie, ChallengeDie, SetbackDie, PercentileDie } from "src/model/dice";

import SymbolDisplay from "src/view/symbol-display";

type diceTypes = "ability" | "proficiency" | "boost" | "difficulty" | "challenge" | "setback" | "percentile";
const diceTypes: Readonly<diceTypes[]> = Object.freeze(["ability", "proficiency", "boost", "difficulty", "challenge", "setback"]);

export default class DiceArea extends React.Component<any, { dice: Die<AcceptedResults>[], results: AcceptedResults[] }> {

    constructor(props: any) {
        super(props);
        this.state = { dice: [], results: [] };
    }

    addDie(type: diceTypes): void {

        const { dice, results } = this.state;
        let newDie: Die<AcceptedResults>;

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

        this.setState({ results, dice: dice.concat([newDie])});
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

        const diceNames = this.state.dice.map(die => <th>{startCase(die.constructor.name)}</th>);
        const diceResults = this.state.results.map(result => {

            let res: JSX.Element | string;
            if (typeof result === "number") {
                res = result + "";
            } else {
                res = <SymbolDisplay symbol={result}/>;
            }
            return <td>{res}</td>;
        });

        return <div className="dice-area">
            <table>
                <thead><tr>{diceNames}</tr></thead>
                <tbody><tr>{diceResults}</tr></tbody>
            </table>
            <div className="actions">{actionButtons}</div>
        </div>;
    }

}
