'use strict'

const convert = require('./convert');
const TaskManager = require('./taskmanager');
const EventEmitter = require('events').EventEmitter;

/**
 * Hearken is a self-adjusting countdown timer that can be configured to run tasks at intervals or
 * just one time.
 * 
 * @since 0.1.0
 */
module.exports = class Hearken extends EventEmitter {

  /**
   * @param {string|number} [startTime=0] The time that Hearken will start counting down from. This can be in milliseconds or a string in a '00:00:00' format.
   */
  constructor(startTime = 0) {

    super();

    /**
     * The start time of this Hearken timer.
     * 
     * The `startTime` input will be normalized to a millisecond value if it is in
     * a string format.
     * 
     * @prop {number}
     * @readonly
     * 
     * @default 0
     */
    this._startTime = convert.auto(startTime, true);

    /**
     * The current amount of time left on this Hearken timer which at the
     * beginning is the same as the `startTime`.
     * 
     * @prop {number}
     * @readonly
     */
    this._currentTime = this._startTime;

    /**
     * How many milliseconds this Hearken timer should count down each step.
     * 
     * @prop {number}
     * @readonly
     * 
     * @default 1000
     */
    this._interval = 1000;

    /**
     * When the Hearken timer is counting down, it will check this property to
     * see if it is in step. If it is not, it will attempt to correct itself.
     * 
     * @prop {number}
     * @readonly
     */
    this._expected = 0;

    /**
     * Initialize the Task Manager which is used to add and remove tasks.
     * 
     * @prop {TaskManager}
     */
    this.tasks = new TaskManager(this);

  }

  /**
   * Get the current time left on the timer.
   * 
   * @since 3.0.0
   * 
   * @returns {number} Returns the time left on the timer.
   */
  get currentTime() {

    return this._currentTime;

  }

  /**
   * Normalize the `startTime` value to be in milliseconds in case it is not already,
   * set the `expected` property and begin the `setTimeout` countdown.
   * 
   * @since 0.1.0
   */
  start() {

    this._expected = Date.now();

    this._tick();

  }

  /**
   * Every second Hearken runs `_tick` and begins by correcting itself of any drift
   * that might have occurred during operation.
   * 
   * After correction, Hearken checks to see if there's any tasks that need to be
   * accomplished and if the tasks are set to repeat, Hearken updates the tasks to
   * their new run at values.
   * 
   * @since 0.1.0
   * @private
   */
  _tick() {

    // Calculate any drift that might have occured.
    const drift = Date.now() - this._expected;

    // Woah, the drift is larger than the Hearken timer's interval we have to abandon ship.
    if (drift > this._interval) throw new Error('The timer has encountered an error and cannot recover');

    // Adjust the Hearken timer's properties to account for the drift.
    this._expected += this._interval;
    this._currentTime -= this._interval;

    this.tasks._check();

    // The Hearken timer is up no need to tick anymore.
    if (this._currentTime == 0) {

      this.stop();

      return;

    }

    // Call `setTimeout` again to keep the Hearken timer ticking
    // accounting for the drift.
    this.timer = setTimeout(() => {

      this._tick();

    }, Math.max(0, this._interval - drift));

  }

  /**
   * Halt the operation of the Hearken timer until `resume` is called.
   * 
   * The properties of the Hearken timer will be saved so that the timer can resume like it was
   * never paused.
   * 
   * This will also emit a pause event with the Hearken timer's properties and the reason for the
   * timer being paused, if any.
   * 
   * @since 0.1.0
   * 
   * @param {string} [reason] A reason as to why the Hearken timer was paused.
   */
  pause(reason) {

    clearTimeout(this.timer);

    this.emit('pause', { startTime: this._startTime, currentTime: this._currentTime, reason: reason });

  }

  /**
   * Continue the operation of the Hearken timer from a paused state.
   * 
   * The Hearken timer will resume from when it was paused like it was never paused in
   * the first place.
   * 
   * @since 0.1.0
   */
  resume() {

    this._expected = Date.now();

    this._tick();

    this.emit('resume', { startTime: this._startTime, currentTime: this._currentTime });

  }

  /**
   * Stop the operation of the Hearken timer and set all properties back to their original
   * values.
   * 
   * Use this only if you're done with this instance of the timer and want to stop
   * it and emit the stop event.
   * 
   * @since 0.1.0
   * 
   * @param {string} [reason] A reason as to why the Hearken timer was paused.
   */
  stop(reason) {

    clearTimeout(this.timer);

    this.timer = null;

    this.emit('stop', { startTime: this._startTime, currentTime: this._currentTime, reason: reason });

  }

}