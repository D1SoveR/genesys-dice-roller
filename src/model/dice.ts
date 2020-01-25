import Symbols from "src/model/symbols";

/** Type used to describe all the dice currently handled by the app. */
export type AllowedDice = GenesysDie | PercentileDie;
/** Type used to describe all the dice results currently handled by the app. */
export type AllowedResults = AllowedDice["currentResult"];

/**
 * Base class for models representing all dice used in the app.
 * Shouldn't be used on its own, but creates base for all other dice.
 */
export abstract class Die<ResultType extends AllowedResults> {

    /**
     * Indicates what the result of the last roll was.
     * If null, the die has not been rolled yet, else it's
     * the contents of the resulting side.
     */
    currentResult: ResultType | null = null;

    /**
     * Rolls the die, selecting random result from the possible ones,
     * assigns it to current result and returns it.
     */
    abstract roll(): ResultType;

}

/**
 * Base class for models representing all the Genesys dice.
 * Primary set of dice in the system, excluding the percentile die
 * used in some combat situations.
 */
export abstract class GenesysDie extends Die<Symbols[]> {

    /**
     * List of all possible results that can come up on the die.
     * Each side is represented separately, so if two sides are
     * the same, they will be listed twice here.
     */
    abstract readonly possibleResults: Symbols[][];

    /**
     * Rolls the die, selecting random result from the possible ones,
     * assigns it to current result and returns it.
     */
    roll(): Symbols[] {
        this.currentResult = this.possibleResults[Math.floor(Math.random() * this.possibleResults.length)];
        return this.currentResult;
    }

}

/**
 * Model for the base positive die, the green eight-sided one.
 */
export class AbilityDie extends GenesysDie {
    possibleResults = [
        [],
        [Symbols.SUCCESS],
        [Symbols.SUCCESS],
        [Symbols.SUCCESS, Symbols.SUCCESS],
        [Symbols.ADVANTAGE],
        [Symbols.ADVANTAGE],
        [Symbols.SUCCESS, Symbols.ADVANTAGE],
        [Symbols.ADVANTAGE, Symbols.ADVANTAGE]
    ]
}

/**
 * Model for the upgraded positive die, the yellow twelve-sided one.
 */
export class ProficiencyDie extends GenesysDie {
    possibleResults = [
        [],
        [Symbols.SUCCESS],
        [Symbols.SUCCESS],
        [Symbols.SUCCESS, Symbols.SUCCESS],
        [Symbols.SUCCESS, Symbols.SUCCESS],
        [Symbols.ADVANTAGE],
        [Symbols.SUCCESS, Symbols.ADVANTAGE],
        [Symbols.SUCCESS, Symbols.ADVANTAGE],
        [Symbols.SUCCESS, Symbols.ADVANTAGE],
        [Symbols.ADVANTAGE, Symbols.ADVANTAGE],
        [Symbols.ADVANTAGE, Symbols.ADVANTAGE],
        [Symbols.TRIUMPH]
    ]
}

/**
 * Model for the circumstantial positive die, the blue six-sided one.
 */
export class BoostDie extends GenesysDie {
    possibleResults = [
        [],
        [],
        [Symbols.SUCCESS],
        [Symbols.SUCCESS, Symbols.ADVANTAGE],
        [Symbols.ADVANTAGE, Symbols.ADVANTAGE],
        [Symbols.ADVANTAGE]
    ]
}

/**
 * Model for the base negative die, the purple eight-sided one.
 */
export class DifficultyDie extends GenesysDie {
    possibleResults = [
        [],
        [Symbols.FAILURE],
        [Symbols.FAILURE, Symbols.FAILURE],
        [Symbols.THREAT],
        [Symbols.THREAT],
        [Symbols.THREAT],
        [Symbols.THREAT, Symbols.THREAT],
        [Symbols.FAILURE, Symbols.THREAT]
    ]
}

/**
 * Model for the upgraded negative die, the red twelve-sided one.
 */
export class ChallengeDie extends GenesysDie {
    possibleResults = [
        [],
        [Symbols.FAILURE],
        [Symbols.FAILURE],
        [Symbols.FAILURE, Symbols.FAILURE],
        [Symbols.FAILURE, Symbols.FAILURE],
        [Symbols.THREAT],
        [Symbols.THREAT],
        [Symbols.FAILURE, Symbols.THREAT],
        [Symbols.FAILURE, Symbols.THREAT],
        [Symbols.THREAT, Symbols.THREAT],
        [Symbols.THREAT, Symbols.THREAT],
        [Symbols.DESPAIR]
    ]
}

/**
 * Model for the circumstantial negative die, the black six-sided one.
 */
export class SetbackDie extends GenesysDie {
    possibleResults = [
        [],
        [],
        [Symbols.FAILURE],
        [Symbols.FAILURE],
        [Symbols.THREAT],
        [Symbols.THREAT]
    ]
}

/**
 * Model for the percentile die, used to generate numerical result
 * between 1 and 100. Used to establish critical results in combat.
 */
export class PercentileDie extends Die<number> {
    roll() {
        return Math.ceil(Math.random() * 100);
    }
}
