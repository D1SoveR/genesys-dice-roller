/**
 * Simple enum used to indicate the result of the roll.
 * Used by the results display to indicate whether the roll
 * is successful (more successes than failures), failed,
 * or neutral (before rolls and if the roll was for numbers only).
 */
const enum Result {
    /** Indicates that the roll contained Genesys dice and contained more successes than failures. */
    SUCCESS = "success",
    /** Indicates that the roll container Genesys dice and there were fewewr successes than failures. */
    FAILURE = "failure",
    /** Default before the roll, and used when roll contained no Genesys dice. */
    NEUTRAL = "neutral"
};
export default Result;
