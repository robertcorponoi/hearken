'use strict'

import Task from './Task';

/**
 * The Task Manager module is responsible for creating and removing tasks from the Hearken timer.
 */
export default class TaskManager {

  /**
   * A reference to the Hearken timer instance.
   * 
   * @private
   * 
   * @property {Heaken}
   */
  private _hearken: any;

  /**
   * All of the tasks that have been created.
   * 
   * @private
   * 
   * @property {Array<Task>}
   */
  private _tasks: Array<Task> = [];

  /**
   * @param {Hearken} hearken A reference to the Hearken instance.
   */
  constructor(hearken: any) {

    this._hearken = hearken;

  }

  /**
   * Creates a new task.
   * 
   * @param {string} name The name of this task.
   * @param {string|number} time The time to run the task at. If `repeat` is set to `true`, then the task will run at an interval.
   * @param {Function} cb The callback method that will be called when the task is run.
   * @param {boolean} [repeat=false] Indicates whether the task is supposed to repeat on an interval.
   * 
   * @returns {TaskManager} Returns this for chaining.
   */
  create(name: string, time: number, cb: Function, repeat: boolean = false): TaskManager {

    const task: Task = new Task(name, time, cb, repeat);

    if (repeat) task.update(this._hearken.currentTime - task._time);

    this._tasks.push(task);

    return this;

  }

  /**
   * Removes a task.
   * 
   * @param {string} name The name of the task to remove.
   * 
   * @returns {TaskManager} Returns this for chaining.
   */
  destroy(name: string): TaskManager {

    this._tasks = this._tasks.filter((task: Task) => task.name !== name);

    return this;

  }

  /**
   * Removes all tasks.
   * 
   * @returns {TaskManager} Returns this for chaining.
   */
  destroyAll(): TaskManager {

    this._tasks = [];

    return this;

  }

  /**
   * Checks to see if any tasks are due to be run.
   */
  check() {

    for (const task of this._tasks) {

      if (task.runAt === this._hearken.currentTime) {

        task.run();

        this._hearken.ontask.dispatch({ startTime: this._hearken.startTime, currentTime: this._hearken.currentTime, task: task });

        if (task.repeat) task.update(this._hearken.currentTime - task._time);

        else this._tasks = this._tasks.filter((t: Task) => t.name !== task.name);

      }

    }

  }

};