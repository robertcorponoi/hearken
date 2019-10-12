import Task from './Task';
/**
 * The Task Manager module is responsible for creating and removing tasks from the Hearken timer.
 */
export default class TaskManager {
    /**
     * A reference to the Hearken timer instance.
     *
     * @property {Heaken}
     *
     * @private
     */
    _hearken: any;
    /**
     * All of the tasks that have been created.
     *
     * @property {Array<Task>}
     *
     * @private
     */
    _tasks: Array<Task>;
    /**
     * @param {Hearken} hearken A reference to the Hearken instance.
     */
    constructor(hearken: any);
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
    create(name: string, time: number, cb: Function, repeat?: boolean): TaskManager;
    /**
     * Removes a task.
     *
     * @param {string} name The name of the task to remove.
     *
     * @returns {TaskManager} Returns this for chaining.
     */
    destroy(name: string): TaskManager;
    /**
     * Removes all tasks.
     *
     * @returns {TaskManager} Returns this for chaining.
     */
    destroyAll(): TaskManager;
    /**
     * Checks to see if any tasks are due to be run.
     */
    check(): void;
}
