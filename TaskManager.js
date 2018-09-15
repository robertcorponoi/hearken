'use strict'

const Task = require('./Task');

/**
 * The task manager is responsible for adding, editing, and removing tasks
 * in conjunction with the Hearken timer.
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
    this.timer = timer;

    /**
     * A list of the currently assigned tasks.
     */
    this.tasks = new Set();

  }

  /**
   * Add a new task to the TaskManager.
   * 
   * @since 2.0.0
   * 
   * @prop {string} name The name of the task to add.
   * @prop {number|string} time The time to run at either once or at an interval every `time` seconds.
   * @prop {Function} fn The method run every time the task is set to run.
   * @prop {boolean} [repeat=false] Indicates whether the task is supposed to run every `time` seconds.
   * 
   * @returns {TaskManager} This for chaining.
   */
  add(name, time, fn, repeat = false) {

    const task = new Task(name, time, fn, repeat);

    if (repeat) task.update(this.timer.currentTime - task.time);

    this.tasks.add(task);

    return this;

  }

  /**
   * Remove a task from the Task Manager.
   * 
   * @since 2.0.0
   * 
   * @prop {string} name The name of the task to remove.
   * 
   * @returns {TaskManager} This for chaining.
   */
  remove(name) {

    for (let task of this.tasks) {

      if (task.name === name) {

        this.tasks.delete(task);
        break;

      }

    }

    return this;

  }

  /**
   * Clears all tasks from the Task Manager.
   * 
   * @since 2.0.0
   * 
   * @returns {TaskManager} This for chaining.
   */
  clear() {

    this.tasks.clear();

    return this;

  }

  /**
   * Check to see if a task is needed to be called.
   * 
   * This compares the Hearken timer's current time to each task's run at time
   * to see if anything needs to be run.
   * 
   * @since 2.0.0
   */
  _check() {

    for (let task of this.tasks) {

      if (task._runAt === this.timer.currentTime) {

        task.run();

        this.timer.emit('task', { startTime: this.timer.startTime, currentTime: this.timer.currentTime, task: task });

        if (task.repeat) task.update(this.timer.currentTime - task.time);

        else this.tasks.delete(task);

      }

    }

  }

}