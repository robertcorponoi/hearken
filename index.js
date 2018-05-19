"use strict"

const EventEmitter = require("events").EventEmitter;
const utils = require("./utils");

/**
 * Self-adjusting event based timer that is both extendable and able to do work.
 * 
 * @author Robert Corponoi
 */
module.exports = class Hearken extends EventEmitter {
    /**
     * Represents an instance of a Hearken timer.
     * @param {Object} options - A set of initialization options for necessary and optional timer operation.
     * @param {string|number} options.startTime - The time the timer will begin counting down from. This can be in "00:00:05" or "5000" format.
     * @param {Array} options.tasks - An array of objects of tasks for the timer to complete at certain times.
     */
    constructor(options = {}) {
        super();
        this.options = options || {};
        this.startTime = utils.timeToMs(this.options.startTime) || 0;
        this.interval = 1000;
        this.tasks = [];
    }

    /**
     * The timer will begin counting down as soon as start() is called.
     */
    start() {
        this.currentTime = this.startTime;
        this.expected = Date.now();

        this.addTask(this.options.tasks);
        this.onTick();
    }

    /**
     * onTick runs once every second checking for work to be done and adjusting the timer to account for drift.
     */
    onTick() {
        let drift = (Date.now() - this.expected);
        if (drift > this.interval) {
            throw new Error("The timer has encountered an error.");
        }
        this.expected += this.interval;
        this.currentTime -= 1000; 

        for (let i = 0; i < this.tasks.length; ++i) {
            let task = this.tasks[i];
            
            if (task.runAt == this.currentTime) {
                task.fn();

                if (task.repeat) {
                    task.runAt = (this.currentTime - task.time);
                } else {
                    this.tasks.temp = this.removeTask(task.name);
                }
            }
        }
        if (this.tasks.temp) this.tasks = this.tasks.temp;

        if (this.currentTime == 0) {
            this.stop();
            return;
        }
        this.timer = setTimeout(() => {
            this.onTick();
        }, Math.max(0, this.interval - drift));
    }

    /**
     * Temporairly halt the operation of the timer, saving the current time to be used when resuming.
     * @param {String} reason - Why the timer was paused.
     */
    pause(reason = null) {
        this.emit("pause", utils.buildEvent(this.startTime, this.currentTime, { name: "reason", value: reason }));
        clearInterval(this.timer);
    }

    /**
     * Continue the operation of the timer before it was paused.
     */
    resume() {
        this.emit("resume", utils.buildEvent(this.startTime, this.currentTime));
        this.expected = Date.now();
        this.onTick();
    }

    /**
     * Completely stop the operation of the timer and set the timer to null.
     */
    stop(reason = null) {
        this.emit("stop", utils.buildEvent(this.startTime, this.currentTime, { name: "reason", value: reason, }));
        clearTimeout(this.timer);
        this.timer = null;
    }

    /**
     * Add one or more tasks to the task list for the timer.
     * @param {Array} task - Array of objects of tasks to add.
     */
    addTask(tasks) {
        if (!tasks) return;

        for (let i = 0, len = tasks.length; i < len; ++i) {
            let task = tasks[i];

            if (task.repeat) {
                task.runAt = this.currentTime - task.time;
            } else {
                task.runAt = task.time;
            }

            task.runAt = utils.timeToMs(task.runAt.toString());
            this.tasks.push(task);
        }

        this.tasks.sort(utils.compare).reverse();
        this.emit("taskAdded", utils.buildEvent(this.startTime, this.currentTime, { name: "tasks", value: this.tasks }));
    }

    /**
     * Remove a task from the timer's task list.
     * @param {string} name - The name of the task to remove.
     */
    removeTask(name) {
        this.emit("taskRemoved", utils.buildEvent(this.startTime, this.currentTime, { name: "tasks", value: this.tasks }));
        return this.tasks.filter(task => task.name.toLowerCase() != name.toLowerCase());
    }

    /**
     * Clear all tasks from the timer's task list.
     */
    clearTasks() {
        this.emit("tasksCleared", utils.buildEvent(this.startTime, this.currentTime, { name: "tasks", value: this.tasks }));
        this.tasks = [];
    }

    /**
     * Return all active tasks and the size of the talk list.
     * @returns {Object} - An object containing the size of the task list and every element.
     */
    getTasks() {
        return { size: this.tasks.length, tasks: this.tasks };
    }
}