'use strict'

import Events from 'events';
import convert from './utils/convert';
import TaskManager from './task/TaskManager';

/**
 * Hearken is a self-adjusting countdown timer that can be configured to run tasks on an interval or just once.
 */
module.exports = class Hearken extends Events.EventEmitter {

  /**
   * The start time of this instance.
   * 
   * @property {number}
   * 
   * @private
   */
  private _startTime: any;

  /**
   * The current time left on the timer.
   * 
   * @property {number}
   * 
   * @private
   */
  private _currentTime: number;

  /**
   * The amount of time between ticks of the timer.
   * 
   * @property {number}
   * 
   * @private
   * 
   * @default 1000
   */
  private _interval: number = 1000;

  /**
   * When the timer is counting down, it checks this to make sure its still in step.
   * 
   * @property {number}
   * 
   * @private
   */
  private _expected: number = 0;

  /**
   * A reference to the task manager module.
   * 
   * @property {TaskManager}
   * 
   * @private
   */
  private tasks: TaskManager = new TaskManager(this);

  /**
   * The id of the setTimeout timer.
   * 
   * @property {setTimeout}
   * 
   * @private
   */
  private _timer: any;

  /**
   * @param {string|number} startTime The time that Hearken will start counting down from. This can be in milliseconds or a string in a '00:00:00' format.
   */
  constructor(startTime: (string | number)) {

    super();

    this._startTime = convert(startTime);

    this._currentTime = this._startTime;

  }

  /**
   * Returns the time left on the timer.
   * 
   * @returns {number}
   */
  get currentTime(): number {

    return this._currentTime;

  }

  /**
   * Set the `expected` property and begin the `setTimeout` countdown.
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
  * @private
  */
  private _tick() {

    // Calculate any drift that might have occured.
    const drift = Date.now() - this._expected;

    // Woah, the drift is larger than the Hearken timer's interval we have to abandon ship.
    if (drift > this._interval) throw new Error('The timer has encountered an error and cannot recover');

    // Adjust the Hearken timer's properties to account for the drift.
    this._expected += this._interval;
    this._currentTime -= this._interval;

    this.tasks.check();

    // The Hearken timer is up no need to tick anymore.
    if (this._currentTime == 0) {

      this.stop();

      return;

    }

    // Call `setTimeout` again to keep the Hearken timer ticking
    // accounting for the drift.
    this._timer = setTimeout(() => {

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
   * @param {string} [reason] A reason as to why the Hearken timer was paused.
   */
  pause(reason?: string) {

    clearTimeout(this._timer);

    this.emit('pause', { startTime: this._startTime, currentTime: this._currentTime, reason: reason });

  }

  /**
   * Continue the operation of the Hearken timer from a paused state.
   * 
   * The Hearken timer will resume from when it was paused like it was never paused in
   * the first place.
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
   * @param {string} [reason] A reason as to why the Hearken timer was paused.
   */
  stop(reason?: string) {

    clearTimeout(this._timer);

    this._timer = null;

    this.emit('stop', { startTime: this._startTime, currentTime: this._currentTime, reason: reason });

  }

};