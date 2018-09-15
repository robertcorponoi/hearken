'use strict'

/**
 * A task is a job that can be assigned to a Hearken timer and whatever functionality
 * that is added to the task will be performed at the specified run time.
 * 
 * Tasks support one-time and repeated runs so you can set a Task to run at 5 seconds left
 * or every 5 seconds.
 * 
 * @since 2.0.0
 */
module.exports = class Task {

  /**
   * @prop {string} name The name of this task.
   * @prop {number|string} time The time to run at either once or at an interval every `time` seconds.
   * @prop {Function} fn The method run every time this task is set to run.
   * @prop {boolean} repeat Indicates whether this task is supposed to run every `time` seconds.
   */
  constructor(name, time, fn, repeat) {

    /**
     * The name of the task.
     * 
     * @prop {string}
     * @readonly
     */
    this.name = name;

    /**
     * The time to run at either once or at an interval.
     * 
     * @prop {string}
     */
    this.time = time;

    /**
     * The method to run every time this task is called by Hearken.
     * 
     * @prop {Function}
     */
    this.fn = fn;

    /**
     * Indicates whether this task is supposed to run every `this.time` seconds.
     * 
     * @prop {boolean}
     * 
     * @default false
     */
    this.repeat = repeat;

    /**
     * This is used by Hearken to decide when the timer runs.
     * 
     * On repeating tasks, this will be updated every time the task runs.
     * 
     * @prop {number}
     * @readonly
     */
    this._runAt = this.time;

  }

  /**
   * Call the method associated with this task.
   * 
   * @since 2.0.0
   */
  run() {

    this.fn();

  }

  /**
   * Update the `runAt` property of this task if it's set to repeat.
   * 
   * @since 2.0.0
   * 
   * @param {number} time The new time to run the task at.
   */
  update(time) {

    this._runAt = time;

  }

}