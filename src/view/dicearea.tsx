import * as React from "react";
import { startCase } from "lodash-es";

import { AcceptedResults, Die, AbilityDie, SetbackDie } from "src/model/dice";

export default class DiceArea extends React.Component<any, { dice: Die<AcceptedResults>[], results: AcceptedResults[] }> {

    constructor(props: any) {
        super(props);
        this.state = { dice: [], results: [] };
    }

    addAbilityDie() {
        const { dice, results } = this.state;
        this.setState({
            dice: dice.concat([new AbilityDie()]),
            results
        });
    }

    addSetbackDie() {
        const { dice, results } = this.state;
        this.setState({
            dice: dice.concat([new SetbackDie()]),
            results
        });
    }

    roll() {
        const { dice } = this.state;
        this.setState({
            dice,
            results: dice.map(die => die.roll())
        });
    }

    render() {

        const actionButtons = ["addAbilityDie", "addSetbackDie", "roll"].map((methodName: keyof DiceArea) => {
            return <button onClick={() => this[methodName]()}>{startCase(methodName)}</button>
        });
        const diceNames = this.state.dice.map(die => <th>{startCase(die.constructor.name)}</th>);
        const diceResults = this.state.results.map(result => <td>{(typeof result === "number") ? result + "" : result.join(" ")}</td>);

        return <div className="dice-area">
            <table>
                <thead><tr>{diceNames}</tr></thead>
                <tbody><tr>{diceResults}</tr></tbody>
            </table>
            <div className="actions">{actionButtons}</div>
        </div>;
    }

}
