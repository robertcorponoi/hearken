'use strict'

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
export default function auto(time: (number | string), ms: boolean = true): (number | string) {

  if (isNumeric(time)) {

    time = parseFloat(time.toString());

    if (ms) return time;

    else return msToTime(time);

  }

  else {

    if (!ms) return time;

    else return timeToMs(time.toString());

  }

}

/**
 * Convert a time value from milliseconds to a 'hh:mm:ss' format.
 * 
 * @since 2.0.0
 * 
 * @param {number|string} ms The time might be in milliseconds but it could still be in a string.
 * 
 * @returns {string} The time in 'hh:mm:ss' format.
 */
function msToTime(ms: (number | string)): string {

  const hh: number = Math.floor(((parseInt(ms.toString()) / 1000) / 3600));
  const mm: number = Math.floor((((parseInt(ms.toString()) / 1000) / 60) % 60));
  const ss: number = Math.floor(((parseInt(ms.toString()) / 1000) % 60));

  return `${pad(hh)}:${pad(mm)}:${pad(ss)}`;

}

/**
 * Convert a time value from 'hh:mm:ss' format to milliseconds.
 * 
 * @param {string} time The time might be in 'hh:mm:ss' format.
 * 
 * @returns {number} The time in milliseconds.
 */
function timeToMs(time: string): number {

  const hhIndex: number = time.indexOf(':');
  const mmIndex: number = time.indexOf(':', hhIndex + 1);
  const ssIndex: number = time.indexOf(':', mmIndex);

  let hh: number = parseInt(time.slice(0, hhIndex));
  let mm: number = parseInt(time.slice(hhIndex + 1, ssIndex));
  let ss: number = parseInt(time.slice(ssIndex + 1));

  hh *= (3.6 * (10 ** 6));
  mm *= 60000;
  ss *= 1000;

  return hh + mm + ss;

}

/**
 * Check if a provided value is a number.
 * 
 * @param {*} n The value to check.
 * 
 * @returns {boolean} True if the value is a number and false otherwise.
 */
const isNumeric = (n: any): boolean => {

  return !isNaN(parseFloat(n)) && isFinite(n);

}

/**
 * Add a leading 0 to a number below 10.
 * 
 * @param {number} n The number to add a leading zero to.
 * 
 * @returns {string|number} The padded or original number.
 */
const pad = (n: number): (string | number) => {

  if (n < 10) return `0${n}`;

  return n;

}