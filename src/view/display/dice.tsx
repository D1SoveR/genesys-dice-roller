import * as React from "react";
import { startCase } from "lodash-es";
import { AllowedDice, AllowedResults } from "src/model/dice";
import SymbolDisplay from "src/view/display/symbol";

/**
 * Converts result of the die roll (or the lack of thereof) into something
 * human-readable; pending mark for no rolls, symbols for regular Genesys dice,
 * and the number for percentile die.
 */
function convertDieResult(result: AllowedResults): JSX.Element[] {
    if (result === null) {
        return [<span>?</span>];
    } else if (typeof result === "number") {
        return [<span>{result + ""}</span>];
    }
    return result.map((s, i) => <SymbolDisplay symbol={s} key={i} />);
}

/**
 * This component is used to render the dice images in the main area of the app.
 * Given the die model instance, converts the roll result into something human-readable,
 * and draws it in an element styled to look like a die of relevant shape and colour.
 */
export default class DiceDisplay extends React.Component<{ die: AllowedDice }> implements EventListenerObject {

    dieReference: React.RefObject<HTMLDivElement> = React.createRef();

    render() {
        return <div ref={this.dieReference} className={startCase(this.props.die.constructor.name).toLowerCase()}>
            {convertDieResult(this.props.die.currentResult)}
        </div>;
    }

    componentDidUpdate(): void {

        // We only apply the shake animation when there's no preference for reduced motion,
        // and when there's actual result on the dice ('cause that means there's something to roll).
        if (
            window.matchMedia("not (prefers-reduced-motion)").matches &&
            this.props.die.currentResult !== null
        ) {

            const dieElement = this.dieReference.current!;
            dieElement.addEventListener("animationend", this, false);

            // If the die is still in the process of playing shake animation,
            // restart it by removing the class and toggling reflow with bounding rect;
            if (dieElement.classList.contains("shake")) {
                dieElement.classList.remove("shake");
                dieElement.getBoundingClientRect();
            }

            dieElement.classList.add("shake");
        }
    }

    handleEvent(event: Event): void {
        if (event.type === "animationend") {
            const dieElement = this.dieReference.current!;
            dieElement.removeEventListener("animationend", this, false);
            dieElement.classList.remove("shake");
        }
    }
}
