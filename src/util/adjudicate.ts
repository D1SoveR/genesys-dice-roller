import Result from "src/model/result";
import Symbols from "src/model/symbols";

function countSymbols(symbols: Symbols[]): { [key in Symbols]: number } {
    const counts = {
        [Symbols.TRIUMPH]: 0,
        [Symbols.SUCCESS]: 0,
        [Symbols.ADVANTAGE]: 0,
        [Symbols.DESPAIR]: 0,
        [Symbols.FAILURE]: 0,
        [Symbols.THREAT]: 0
    };
    symbols.forEach(item => counts[item]++);
    return counts;
}

export function removeOpposingSymbols(symbols: Symbols[]): Symbols[] {

    // Make the first pass by counting all the symbols
    const remove = countSymbols(symbols);

    // Bring counters for triumphs/despairs to zero, they never cancel each other out
    remove[Symbols.TRIUMPH] = 0;
    remove[Symbols.DESPAIR] = 0;

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

export function adjudicateRoll(symbols: Symbols[]): Result {

    const counts = countSymbols(symbols),
          countSuccess = counts[Symbols.TRIUMPH] + counts[Symbols.SUCCESS],
          countFailure = counts[Symbols.DESPAIR] + counts[Symbols.FAILURE];

    return (countSuccess - countFailure > 0) ? Result.SUCCESS : Result.FAILURE;
}
