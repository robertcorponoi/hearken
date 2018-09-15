'use strict'

/**
 * The methods in Convert are used to convert time inputs between
 * milliseconds and string formats.
 * 
 * @since 2.0.0
 */
module.exports = {

  /**
   * Automatically try to determine what type of time the input is and run the conversion
   * to make it the specified type.
   * 
   * This is easier to use but also reduces readability, in my opinion.
   * 
   * @since 2.0.0
   * 
   * @param {number|string} time The time in milliseconds or a string to convert to the other type.
   * @param {boolean} ms Indicates whether the time be returned as milliseconds or as 'hh:mm:ss'.
   * 
   * @returns {number|string}
   */
  auto(time, ms) {

    // The time in is milliseconds.
    if (isNumeric(time)) {

      // It could still be a enclosed in a string so parse it just in case and then pass
      // it to be converted.
      time = parseFloat(time);

      if (ms) return time;

      else return this.msToTime(time);

    }

    // The time is in a 'hh:mm:ss' format.
    else {

      if (!ms) return time;

      else return this.timeToMs(time);

    }

  },

  /**
   * Convert a time value from milliseconds to a 'hh:mm:ss' format.
   * 
   * @since 2.0.0
   * 
   * @param {number|string} ms The time might be in milliseconds but it could still be in a string.
   * 
   * @returns {string} The time in 'hh:mm:ss' format.
   */
  msToTime(ms) {

    const hh = Math.floor(((ms / 1000) / 3600));
    const mm = Math.floor((((ms / 1000) / 60) % 60));
    const ss = Math.floor(((ms / 1000) % 60));

    // Pad any numbers below 10 so it looks like a nice time.
    return `${pad(hh)}:${pad(mm)}:${pad(ss)}`;

  },

  /**
   * Convert a time value from 'hh:mm:ss' format to milliseconds.
   * 
   * @since 2.0.0
   * 
   * @param {string} time The time might be in 'hh:mm:ss' format.
   * 
   * @returns {number} The time in milliseconds.
   */
  timeToMs(time) {

    const hhIndex = time.indexOf(':');
    const mmIndex = time.indexOf(':', hhIndex + 1);
    const ssIndex = time.indexOf(':', mmIndex);

    let hh = time.slice(0, hhIndex);
    let mm = time.slice(hhIndex + 1, ssIndex);
    let ss = time.slice(ssIndex + 1);

    hh *= (3.6 * (10 ** 6));
    mm *= 60000;
    ss *= 1000;

    return hh + mm + ss;

  }

}

/**
 * Check if a provided value is a number.
 * 
 * @since 2.0.0
 * 
 * @param {*} n The value to check.
 * 
 * @returns {boolean} True if the value is a number and false otherwise.
 */
const isNumeric = (n) => {

  return !isNaN(parseFloat(n)) && isFinite(n);

}

/**
 * Add a leading 0 to a number below 10.
 * 
 * @since 2.0.0
 * 
 * @param {number} n The number to add a leading zero to.
 * 
 * @returns {string} The padded number.
 */
const pad = (n) => {

  if (n < 10) return `0${n}`;

  return n;

}