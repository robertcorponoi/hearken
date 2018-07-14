"use strict"

const EventEmitter = require('events').EventEmitter;
const utils = require('./utils');

module.exports = class Hearken extends EventEmitter {
  /**
   * Represents an instance of a Hearken timer.
   * 
   * @param {string|number} [startTime=0] The time the timer will begin counting down from. This can be in millisecond or '00:00:05' format.
   */
  constructor(startTime) {
    super();
    this.startTime = utils.timeToMs(startTime) || 0;
    this.currentTime = this.startTime;
    this.interval = 1000;
    this.tasks = [];
  }

  /**
   * Time timer will begin counting down as soon as this method is called.
   * 
   * @since 0.1.0
   */
  start() {
    this.expected = Date.now();
    this.onTick();
  }

  /**
   * onTick runs once every second and checks for tasks that need to be run and it also
   * adjusts the timer operation to account for drift from setTimeout.
   * 
   * @since 0.1.0
   */
  onTick() {
    const drift = Date.now() - this.expected;
    if (drift > this.interval) throw new Error('The timer has encountered an error and cannot recover');

    this.expected += this.interval;
    this.currentTime -= this.interval;

    for (let i = 0, len = this.tasks.length; i < len; ++i) {
      let task = this.tasks[i];

      if (task.runAt == this.currentTime) {
        task.fn();
        this.emit('task', utils.buildEvent(this.startTime, this.currentTime, { name: 'event', value: task }));

        if (task.repeat) task.runAt = this.currentTime - task.time;
        else this.removeTask(task.name);
      }
    }

    if (this.currentTime == 0) {
      this.stop();
      return;
    }

    this.timer = setTimeout(() => {
      this.onTick();
    }, Math.max(0, this.interval - drift));
  }

  /**
   * Temporarily halt the operation of the timer and save the current time to be used
   * resuming and emit the pause event.
   * 
   * @since 0.1.0
   * @param {string} [reason=null] An optional reason as to why the timer was paused.
   */
  pause(reason = null) {
    clearTimeout(this.timer);
    this.emit('pause', utils.buildEvent(this.startTime, this.currentTime, { name: 'reason', value: reason }));
  }

  /**
   * Continue the operation of the after being paused and emit the resume event.
   * 
   * @since 0.1.0
   */
  resume() {
    this.expected = Date.now();
    this.onTick();
    this.emit('resume', utils.buildEvent(this.startTime, this.currentTime));
  }

  /**
   * Completely stop the operation of the timer.
   * 
   * @since 0.1.0
   * @param {string} [reason=null] An optional reason as to why the timer was stopped.
   */
  stop(reason = null) {
    clearTimeout(this.timer);
    this.timer = null;
    this.emit('stop', utils.buildEvent(this.startTime, this.currentTime, { name: 'reason', value: reason }));
  }

  /**
   * Create a new task for the timer to perform at a specified time. By default, the
   * task will run at the time specified but if repeat is set to true, it will run every
   * [time] seconds until the timer is over.
   * 
   * @since 1.0.0
   * @param {string} name A reference name the timer will use for the task.
   * @param {string} time The time to run the task at. If repeat is set to true, the task will run every [time] seconds.
   * @param {Function} fn The method to associate with the task.
   * @param {boolean} [repeat=false] Whether to repeat the task every [time] seconds.
   */
  addTask(name, time, fn, repeat = false) {
    if (!name) throw new Error('Please specify a name for the task');
    if (!time) throw new Error('Please specify when the task should run');
    if (!fn) throw new Error('Please provide a method to associate the task with');

    let task = {
      name: name,
      time: time,
      runAt: time,
      fn: fn,
      repeat: repeat
    };

    if (repeat) task.runAt = this.currentTime - time;

    this.tasks.push(task);
  }

  /**
   * Delete a task from the task queue by its reference name.
   * 
   * @since 1.0.0
   * @param {string} name The reference name for the task set when the task was added.
   */
  removeTask(name) {
    if (!name) throw new Error('The name of the task to remove must be specified');

    for (let i = 0, len = this.tasks.length; i < len; ++i) {
      if (this.tasks[i].name == name) {
        this.tasks.splice(i, 1);
        return;
      }
    }
  }

  /**
   * Deletes all tasks from the task queue.
   * 
   * @since 1.0.0
   */
  clearTasks() {
    this.tasks = [];
  }
}