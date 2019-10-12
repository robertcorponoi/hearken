'use strict'

/**
 * A task is a job that can be assigned to a Hearken instance and it either runs at an interval
 * or just one time.
 */
export default class Task {

  /**
   * The name of this task.
   * 
   * @property {string}
   * 
   * @private
   */
  private _name: string;

  /**
   * The time to run the task at. If `repeat` is set to `true`, then the task will run at an interval.
   * 
   * @property {string|number}
   * 
   * @private
   */
  _time: number;

  /**
   * The callback method that will be called when the task is run.
   * 
   * @property {Function}
   * 
   * @private
   */
  private _cb: Function;

  /**
   * Indicates whether the task is supposed to repeat on an interval.
   * 
   * @property {boolean}
   * 
   * @private
   */
  repeat: boolean;

  /**
   * The next time that this task should run at.
   * 
   * @property {number}
   */
  runAt: number;

  /**
   * @param {string} name The name of this task.
   * @param {string|number} time The time to run the task at. If `repeat` is set to `true`, then the task will run at an interval.
   * @param {Function} cb The callback method that will be called when the task is run.
   * @param {boolean} repeat Indicates whether the task is supposed to repeat on an interval.
   */
  constructor(name: string, time: number, cb: Function, repeat: boolean) {

    this._name = name;

    this._time = time;

    this._cb = cb;

    this.repeat = repeat;

    this.runAt = this._time;

  }

  /**
   * Returns the name of this task.
   * 
   * @returns {string}
   */
  get name(): string {

    return this._name;

  }

  /**
   * Returns the time this task is set to run at next.
   * 
   * @returns {number}
   */
  get time(): number {

    return this.runAt;

  }

  /**
   * Runs the callback method for this task.
   */
  run() {

    this._cb();

  }

  /**
   * Used by the Task Manager module to update the time that this task should run at next.
   * 
   * @param {number} time The new time to run this task at.
   */
  update(time: number) {

    this.runAt = time;

  }

};