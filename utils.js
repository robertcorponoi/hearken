'use strict'

module.exports = {
  /**
   * Convert an amount of time in milliseconds to a 'hh:mm:ss' format.
   * 
   * @since 0.1.0
   * @param {number|string} ms The number of milliseconds to convert.
   * @returns {string}
   */
  msToTime(ms) {
    const hh = Math.floor(((ms / 1000) / 3600));
    const mm = Math.floor((((ms / 1000) / 60) % 60));
    const ss = Math.floor(((ms / 1000) % 60));

    const paddedTime = `${this.padTime(hh)}:${this.padTime(mm)}:${this.padTime(ss)}`;
    return paddedTime;
  },

  /**
   * Convert a time from 'hh:mm:ss' format to milliseconds.
   * 
   * @since 0.1.0
   * @param {string} time The 'hh:mm:ss' time to convert.
   * @returns {string}
   */
  timeToMs(time) {
    if (time.indexOf(':') == -1) return time;

    const hhIndex = time.indexOf(':');
    const mmIndex = time.indexOf(':', hhIndex + 1);
    const ssIndex = time.indexOf(':', mmIndex);

    let hh = time.slice(0, hhIndex);
    let mm = time.slice(hhIndex + 1, ssIndex);
    let ss = time.slice(ssIndex + 1);

    hh *= (3.6 * (10 ** 6));
    mm *= 60000;
    ss *= 1000;

    const ms = (hh + mm + ss).toString();
    return ms
  },

  /**
   * Add a leading zero to times that are under 10.
   * 
   * @since 0.1.0
   * @param {number} time The hh, mm, or ss to be padded if necessary.
   * @returns {string}
   */
  padTime(time) {
    if (time < 10) return `0${time}`;
    return time.toString();
  },

  /**
   * Most of the timer events contain the same information so they are built with this method.
   * 
   * @since 0.1.0
   * @param {string} startTime The start time of the timer in milliseconds.
   * @param {string} currentTime The time of the timer at the time of the event in milliseconds.
   * @param {Object} eventInfo Some events output additional information which can be placed here.
   * @returns {Object}
   */
  buildEvent(startTime, currentTime, other = {}) {
    const elapsedTime = startTime - currentTime;

    let event = {
      currentTime: {
        ms: currentTime.toString(),
        time: this.msToTime(currentTime.toString())
      },
      elapsedTime: {
        ms: elapsedTime.toString(),
        time: this.msToTime(elapsedTime.toString())
      }
    };

    if (other.name) event[other.name] = other.value;
    return event;
  },

  /**
   * Sort the timer's tasks by time in descending order.
   * 
   * @since 0.1.0
   * @param {Object} taskA
   * @param {Object} taskB
   * @returns {number}
   */
  compareTasks(taskA, taskB) {
    if (taskA.runAt < taskB.runAt) return -1;
    if (taskA.runAt > taskB.runAt) return 1;

    if (taskA.runAt == taskB.runAt) {
      if (taskA.order < taskB.order) return -1;
      if (taskA.order > taskB.order) return 1;
    }

    return 0;
  },
}