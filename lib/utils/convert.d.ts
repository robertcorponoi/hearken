/**
 * Automatically try to determine what type of time the input is and run the conversion
 * to make it the specified type.
 *
 * This is easier to use but also reduces readability, in my opinion.
 *
 * @param {number|string} time The time in milliseconds or a string to convert to the other type.
 * @param {boolean} ms Indicates whether the time be returned as milliseconds or as 'hh:mm:ss'.
 *
 * @returns {number|string}
 */
export default function auto(time: (number | string), ms?: boolean): (number | string);
