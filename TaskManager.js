'use strict'

const Task = require('./task');

/**
 * The task manager is responsible for creating and removing tasks from the
 * Hearken timer.
 * 
 * @since 2.0.0
 */
module.exports = class TaskManager {

  /**
   * @param {Hearken} timer The Hearken timer associated with this TaskManager.
   */
  constructor(timer) {

    /**
     * A reference to the Hearken timer.
     * 
     * @prop {Hearken}
     */
    this._timer = timer;

    /**
     * A collection of the currently assigned tasks.
     * 
     * @property {Set}
     * @readonly
     */
    this._tasks = new Set();

  }

  /**
   * Get the list of active tasks as an array.
   * 
   * @since 3.0.0
   * 
   * @returns {Array} The active tasks for the timer.
   */
  get tasks() {

    return Array.from(this._tasks);

  }

  /**
   * Creates a new task.
   * 
   * @since 2.0.0
   * 
   * @param {string} name The name of the task.
   * @param {string|number} time The time to run the task at.
   * @param {Function} cb The callback method to call when the task is run.
   * @param {boolean} [repeat=false] Indicates whether the task will repeat every `time` seconds.
   * 
   * @returns {TaskManager} Returns this for chaining.
   */
  create(name, time, cb, repeat = false) {

    const task = new Task(name, time, cb, repeat);

    if (repeat) task._update(this._timer._currentTime - task.time);

    this._tasks.add(task);

    return this;

  }

  /**
   * Removes a task from the task manager.
   * 
   * @since 2.0.0
   * 
   * @param {string} name The name of the task to remove.
   * 
   * @returns {TaskManager} Returns this for chaining.
   */
  destroy(name) {

    for (const task of this._tasks) {

      if (task.name === name) {

        this._tasks.delete(task);

        break;

      }

    }

    return this;

  }

  /**
   * Clears all tasks from the task manager.
   * 
   * @since 2.0.0
   * 
   * @returns {TaskManager} Returns this for chaining.
   */
  destroyAll() {

    this._tasks.clear();

    return this;

  }

  /**
   * Checks to see if a task is due to be run.
   * 
   * @since 2.0.0
   * @private
   */
  _check() {

    for (const task of this._tasks) {

      if (task._runAt === this._timer._currentTime) {

        task.run();

        this._timer.emit('task', {

          startTime: this._timer._startTime,

          currentTime: this._timer._currentTime,

          task: task

        });

        if (task._repeat) task._update(this._timer._currentTime - task._time);
        
        else this._tasks.delete(task);

      }

    }

  }

}