'use strict'

/**
 * A task is a job that can be assigned to a Hearken timer and run at certain intervals
 * or just once.
 * 
 * @since 2.0.0
 */
module.exports = class Task {

  /**
   * @param {string} name The name of the task.
   * @param {string|number} time The time to run the task at. If `repeat` is set to `true`, then the task will run at an interval.
   * @param {Function} cb The callback method that will be called when the task is run.
   * @param {boolean} repeat Indicates whether the task is supposed to repeat on an interval.
   */
  constructor(name, time, cb, repeat) {

    /**
     * A reference to the name of the task.
     * 
     * @property {string}
     * @readonly
     */
    this._name = name;

    /**
     * A reference to the time or interval that the task will be run.
     * 
     * @property {string|number}
     * @readonly
     */
    this._time = time;

    /**
     * A reference to the callback method that will be called when the task is run.
     * 
     * @property {Function}
     * @readonly
     */
    this._cb = cb;

    /**
     * Indicates whether the task is supposed to repeat on an interval.
     * 
     * @property {boolean}
     * @readonly
     */
    this._repeat = repeat;

    /**
     * Used internally by the timer to decide when the task is to be run.
     * 
     * On repeating tasks, this will be updated every time the task is run.
     * 
     * @property {number}
     * @readonly
     */
    this._runAt = this._time;

  }

  /**
   * Gets the name of the task.
   * 
   * @since 3.0.0
   * 
   * @returns {string} Returns the name of the task.
   */
  get name() {

    return this._name;

  }

  /**
   * Gets the time the task is set to run at.
   * 
   * @since 3.0.0
   * 
   * @returns {number} Returns the time the task will run at next.
   */
  get time() {

    return this._runAt;

  }

  /**
   * Run the callback method associated with the task.
   * 
   * @since 2.0.0
   */
  run() {

    this._cb();

  }

  /**
   * Used internally by the timer to set the new time that the timer will
   * run at.
   * 
   * @since 3.0.0
   * 
   * @param {number} time The new time to run the task at.
   */
  _update(time) {

    this._runAt = time;

  }

}