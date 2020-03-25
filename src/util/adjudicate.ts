import { countBy } from "lodash-es";
import Result from "src/model/result";
import Symbols from "src/model/symbols";

/**
 * Method used to resolve part of the roll where successes and failures /
 * advantages and threats cancel each other out. Given list of symbols,
 * cancels them out and returns the list with only the remaining symbols.
 *
 * @param symbols  List of symbols rolled
 * @returns        List with symbols remaining after cancelling results out
 */
export function removeOpposingSymbols(symbols: Symbols[]): Symbols[] {

    // Make the first pass by counting all the symbols
    const remove = countBy(symbols);

    // Delete counts for triumphs and despairs, as these never cancel each other out
    delete remove[Symbols.TRIUMPH];
    delete remove[Symbols.DESPAIR];

    // Use the counts and mark the smaller number of symbols for removal
    remove[Symbols.SUCCESS] = remove[Symbols.FAILURE] = Math.min(remove[Symbols.SUCCESS], remove[Symbols.FAILURE]);
    remove[Symbols.ADVANTAGE] = remove[Symbols.THREAT] = Math.min(remove[Symbols.ADVANTAGE], remove[Symbols.THREAT]);

    const remainingSymbols: Symbols[] = [];
    symbols.forEach(item => {
        if (remove[item]) {
            remove[item]--;
        } else {
            remainingSymbols.push(item);
        }
    });

    return remainingSymbols;
}

/**
 * Resolves the roll; given the list of results rolled, counts them up,
 * and returns whether the roll was successful or failed.
 *
 * @param symbols  Lisf of symbols rolled
 * @results        Whether the roll was successful or failed
 */
export function adjudicateRoll(symbols: Symbols[]): Result {

    const counts = countBy(symbols),
          countSuccess = (counts[Symbols.TRIUMPH] || 0) + (counts[Symbols.SUCCESS] || 0),
          countFailure = (counts[Symbols.DESPAIR] || 0) + (counts[Symbols.FAILURE] || 0);

    console.warn("COUNT: ", counts);

    return (countSuccess - countFailure > 0) ? Result.SUCCESS : Result.FAILURE;
}
