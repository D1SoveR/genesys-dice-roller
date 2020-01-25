import Symbols from "src/model/symbols";
import { GenesysDie, AbilityDie, ProficiencyDie, BoostDie, DifficultyDie, ChallengeDie, SetbackDie, PercentileDie } from "src/model/dice";

/**
 * Order required of the symbols on the dice.
 * Going positive first, negative second, and from most to least powerful.
 */
const SYMBOL_ORDERING = Object.freeze({
    [Symbols.TRIUMPH]:   0,
    [Symbols.SUCCESS]:   1,
    [Symbols.ADVANTAGE]: 2,
    [Symbols.DESPAIR]:   3,
    [Symbols.FAILURE]:   4,
    [Symbols.THREAT]:    5
});

/**
 * Utility function to help with ordering the results, first by grouping positive dice first,
 * negative second, then by ordering each group from most powerful to least powerful.
 * Intended to be used as compare function for Array.sort.
 */
export function orderSymbols(a: Symbols, b: Symbols): number {
    return SYMBOL_ORDERING[a] as number - SYMBOL_ORDERING[b] as number;
}

/**
 * Order required of the dice themselves.
 * Done as function rather than map because there's no easy way to use class of instance
 * as value in TypeScript. Goes positive first, negative second, most to least powerful,
 * and percentile die goes at the end.
 */
function getValueForDie(die: GenesysDie | PercentileDie): number {

    if (die instanceof ProficiencyDie) {
        return 0;
    } else if (die instanceof AbilityDie) {
        return 1;
    } else if (die instanceof BoostDie) {
        return 2;
    } else if (die instanceof ChallengeDie) {
        return 3;
    } else if (die instanceof DifficultyDie) {
        return 4;
    } else if (die instanceof SetbackDie) {
        return 5;
    }
    return 6;
}

/**
 * Utility function to help with ordering the dice themselves, first by grouping positive dice first,
 * negative second, then by ordering each group from most powerful to least powerful.
 * Intended to be used as compare function for Array.sort.
 */
export function orderDice(a: GenesysDie | PercentileDie, b: GenesysDie | PercentileDie): number {
    return getValueForDie(a) - getValueForDie(b);
}
