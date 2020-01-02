'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck$1;

function _defineProperties$1(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass$1(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$1(Constructor, staticProps);
  return Constructor;
}

var createClass = _createClass$1;

function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var defineProperty = _defineProperty$1;

var Task =
/*#__PURE__*/
function () {
  /**
   * The method to be called when processing this task.
   * 
   * @property {Function}
   */

  /**
   * Indicates whether this task will only run once before being deleted or not.
   * 
    * @private
    * 
   * @property {boolean}
   */

  /**
   * If true this indicates to Hypergiant that it needs to be deleted on the next pass.
    * 
    * @private
   * 
   * @property {boolean}
   */

  /**
   * The number of times that this task has been called.
    * 
    * @private
   * 
   * @property {number}
   */

  /**
   * Indicates whether this task is currently paused or not.
   * 
   * @property {boolean}
   */

  /**
   * @param {Function} fn The method to attach to this task.
   * @param {boolean} once Indicates whether this task will only run once before being deleted or not.
   */
  function Task(fn, once) {
    classCallCheck(this, Task);

    defineProperty(this, "fn", void 0);

    defineProperty(this, "_once", void 0);

    defineProperty(this, "_delete", false);

    defineProperty(this, "_timesCalled", 0);

    defineProperty(this, "paused", false);

    this.fn = fn;
    this._once = once;
  }
  /**
   * Returns whether the task should run only once or not.
   * 
   * @returns {boolean}
   */


  createClass(Task, [{
    key: "run",

    /**
     * Runs the method associated with this task.
     * 
     * @param {...*} args Any other data that should be passed to this task.
     */
    value: function run() {
      if (this.paused) return;
      this.fn.apply(this, arguments);
      this._timesCalled++;
      if (this._once) this._delete = true;
    }
  }, {
    key: "once",
    get: function get() {
      return this._once;
    }
    /**
     * Returns whether the task should be deleted or not.
     * 
     * @returns {boolean}
     */

  }, {
    key: "delete",
    get: function get() {
      return this._delete;
    }
    /**
     * Returns the number of times that this task has been called.
     * 
     * @returns {number}
     */

  }, {
    key: "timesCalled",
    get: function get() {
      return this._timesCalled;
    }
  }]);

  return Task;
}();

/**
 * Hypergiant is used to create signals that run a task when emitted.
 *
 * One of the biggest advtantages that signals have over native JavaScript events is that they don't rely 
 * on correct typing.
 */

var Hypergiant =
/*#__PURE__*/
function () {
  function Hypergiant() {
    classCallCheck(this, Hypergiant);

    defineProperty(this, "_tasks", new Set());
  }

  createClass(Hypergiant, [{
    key: "add",

    /**
     * Add a new signal.
     * 
     * @param {Function} fn The method that should be called when the signal is dispatched.
     * @param {boolean} [once=false] Indicates whether this signal should only be dispatched once and then deleted.
     * 
     * @returns {Hypergiant} Returns this for chaining.
     */
    value: function add(fn) {
      var once = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      this._tasks.add(new Task(fn, once));

      return this;
    }
    /**
     * Dispatch this Hypergiant event and run all of the tasks associated
     * with it along with any data passed to it.
     * 
     * @param {...*} args Any other data that should be passed to the tasks associated with this Hypergiant instance.
     */

  }, {
    key: "dispatch",
    value: function dispatch() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._tasks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var task = _step.value;
          task.run.apply(task, arguments);
          if (task["delete"]) this._tasks["delete"](task);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
    /**
     * Removes a task from this signal by name.
     *
     * @param {Function} task The task to remove.
     *
     * @returns {Hypergiant} Returns this for chaining.
     */

  }, {
    key: "remove",
    value: function remove(fn) {
      var fnToString = fn.toString();
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this._tasks[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var task = _step2.value;
          var taskFnToString = task.fn.toString();

          if (fnToString === taskFnToString) {
            this._tasks["delete"](task);

            break;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return this;
    }
    /**
     * Removes all tasks from this signal.
     *
     * @returns {Hypergiant} Returns this for chaining.
     */

  }, {
    key: "removeAll",
    value: function removeAll() {
      this._tasks.clear();

      return this;
    }
    /**
     * Pauses a task attached to this signal until it is unpaused.
     * 
     * This means that the paused task will not be called and just be silent until the `enable` method is called
     * on it returning it back to its normal state.
     * 
     * @param {Function} task The task to pause.
     * 
     * @returns {Hypergiant} Returns this for chaining.
     */

  }, {
    key: "pause",
    value: function pause(fn) {
      var fnToString = fn.toString();
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this._tasks[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var task = _step3.value;
          var taskFnToString = task.fn.toString();

          if (!task.paused && fnToString === taskFnToString) {
            task.paused = true;
            break;
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return this;
    }
    /**
     * Resumes a task from a paused state.
     * 
     * @param {Function} task The paused task.
     * 
     * @returns {Hypergiant} Returns this for chaining.
     */

  }, {
    key: "resume",
    value: function resume(fn) {
      var fnToString = fn.toString();
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this._tasks[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var task = _step4.value;
          var taskFnToString = task.fn.toString();

          if (task.paused && fnToString === taskFnToString) {
            task.paused = false;
            break;
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return this;
    }
    /**
     * Makes a task a noop function.
     * 
     * @param {Function} task The task to make noop.
     * 
     * @returns {Hypergiant} Returns this for chaining.
     */

  }, {
    key: "noop",
    value: function noop(fn) {
      var fnToString = fn.toString();
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this._tasks[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var task = _step5.value;
          var taskFnToString = task.fn.toString();

          if (fnToString === taskFnToString) {
            task.fn = function () {};

            break;
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
            _iterator5["return"]();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      return this;
    }
  }, {
    key: "tasks",

    /**
     * Returns the tasks created for this signal.
     * 
     * @returns {Set<Task>}
     */
    get: function get() {
      return this._tasks;
    }
    /**
     * Returns the number of tasks currently assigned to this signal.
     * 
     * @returns {number}
     */

  }, {
    key: "numTasks",
    get: function get() {
      return this._tasks.size;
    }
  }]);

  return Hypergiant;
}();

/**
 * Automatically try to determine what type of time the input is and run the conversion
 * to make it the specified type.
 * 
 * This is easier to use but also reduces readability, in my opinion.
 * 
 * @param {number|string} time The time in milliseconds or a string to convert to the other type.
 * @param {boolean} ms Indicates whether the time be returned as milliseconds or as 'hh:mm:ss'.
 * 
 * @returns {number|string}
 */

function auto(time) {
  var ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (isNumeric(time)) {
    time = parseFloat(time.toString());
    if (ms) return time;else return msToTime(time);
  } else {
    if (!ms) return time;else return timeToMs(time.toString());
  }
}
/**
 * Convert a time value from milliseconds to a 'hh:mm:ss' format.
 * 
 * @param {number|string} ms The time might be in milliseconds but it could still be in a string.
 * 
 * @returns {string} The time in 'hh:mm:ss' format.
 */

function msToTime(ms) {
  var hh = Math.floor(parseInt(ms.toString()) / 1000 / 3600);
  var mm = Math.floor(parseInt(ms.toString()) / 1000 / 60 % 60);
  var ss = Math.floor(parseInt(ms.toString()) / 1000 % 60);
  return "".concat(pad(hh), ":").concat(pad(mm), ":").concat(pad(ss));
}
/**
 * Convert a time value from 'hh:mm:ss' format to milliseconds.
 * 
 * @param {string} time The time might be in 'hh:mm:ss' format.
 * 
 * @returns {number} The time in milliseconds.
 */


function timeToMs(time) {
  var hhIndex = time.indexOf(':');
  var mmIndex = time.indexOf(':', hhIndex + 1);
  var ssIndex = time.indexOf(':', mmIndex);
  var hh = parseInt(time.slice(0, hhIndex));
  var mm = parseInt(time.slice(hhIndex + 1, ssIndex));
  var ss = parseInt(time.slice(ssIndex + 1));
  hh *= 3.6 * Math.pow(10, 6);
  mm *= 60000;
  ss *= 1000;
  return hh + mm + ss;
}
/**
 * Check if a provided value is a number.
 * 
 * @param {*} n The value to check.
 * 
 * @returns {boolean} True if the value is a number and false otherwise.
 */


var isNumeric = function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
/**
 * Add a leading 0 to a number below 10.
 * 
 * @param {number} n The number to add a leading zero to.
 * 
 * @returns {string|number} The padded or original number.
 */


var pad = function pad(n) {
  if (n < 10) return "0".concat(n);
  return n;
};

var Task$1 =
/*#__PURE__*/
function () {
  /**
   * The name of this task.
   * 
   * @property {string}
   * 
   * @private
   */

  /**
   * The time to run the task at. If `repeat` is set to `true`, then the task will run at an interval.
   * 
   * @property {string|number}
   * 
   * @private
   */

  /**
   * The callback method that will be called when the task is run.
   * 
   * @property {Function}
   * 
   * @private
   */

  /**
   * Indicates whether the task is supposed to repeat on an interval.
   * 
   * @property {boolean}
   * 
   * @private
   */

  /**
   * The next time that this task should run at.
   * 
   * @property {number}
   */

  /**
   * @param {string} name The name of this task.
   * @param {string|number} time The time to run the task at. If `repeat` is set to `true`, then the task will run at an interval.
   * @param {Function} cb The callback method that will be called when the task is run.
   * @param {boolean} repeat Indicates whether the task is supposed to repeat on an interval.
   */
  function Task(name, time, cb, repeat) {
    _classCallCheck(this, Task);

    _defineProperty(this, "_name", void 0);

    _defineProperty(this, "_time", void 0);

    _defineProperty(this, "_cb", void 0);

    _defineProperty(this, "repeat", void 0);

    _defineProperty(this, "runAt", void 0);

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


  _createClass(Task, [{
    key: "run",

    /**
     * Runs the callback method for this task.
     */
    value: function run() {
      this._cb();
    }
    /**
     * Used by the Task Manager module to update the time that this task should run at next.
     * 
     * @param {number} time The new time to run this task at.
     */

  }, {
    key: "update",
    value: function update(time) {
      this.runAt = time;
    }
  }, {
    key: "name",
    get: function get() {
      return this._name;
    }
    /**
     * Returns the time this task is set to run at next.
     * 
     * @returns {number}
     */

  }, {
    key: "time",
    get: function get() {
      return this.runAt;
    }
  }]);

  return Task;
}();

/**
 * The Task Manager module is responsible for creating and removing tasks from the Hearken timer.
 */

var TaskManager =
/*#__PURE__*/
function () {
  /**
   * A reference to the Hearken timer instance.
   * 
   * @private
   * 
   * @property {Heaken}
   */

  /**
   * All of the tasks that have been created.
   * 
   * @private
   * 
   * @property {Array<Task>}
   */

  /**
   * @param {Hearken} hearken A reference to the Hearken instance.
   */
  function TaskManager(hearken) {
    _classCallCheck(this, TaskManager);

    _defineProperty(this, "_hearken", void 0);

    _defineProperty(this, "_tasks", []);

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


  _createClass(TaskManager, [{
    key: "create",
    value: function create(name, time, cb) {
      var repeat = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var task = new Task$1(name, time, cb, repeat);
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

  }, {
    key: "destroy",
    value: function destroy(name) {
      this._tasks = this._tasks.filter(function (task) {
        return task.name !== name;
      });
      return this;
    }
    /**
     * Removes all tasks.
     * 
     * @returns {TaskManager} Returns this for chaining.
     */

  }, {
    key: "destroyAll",
    value: function destroyAll() {
      this._tasks = [];
      return this;
    }
    /**
     * Checks to see if any tasks are due to be run.
     */

  }, {
    key: "check",
    value: function check() {
      var _this = this;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var task = _step.value;

          if (task.runAt === _this._hearken.currentTime) {
            task.run();

            _this._hearken.ontask.dispatch({
              startTime: _this._hearken.startTime,
              currentTime: _this._hearken.currentTime,
              task: task
            });

            if (task.repeat) task.update(_this._hearken.currentTime - task._time);else _this._tasks = _this._tasks.filter(function (t) {
              return t.name !== task.name;
            });
          }
        };

        for (var _iterator = this._tasks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }]);

  return TaskManager;
}();

var _temp;
/**
 * Hearken is a self-adjusting countdown timer that can be configured to run tasks on an interval or just once.
 */

module.exports = (_temp =
/*#__PURE__*/
function () {
  /**
   * The start time of this instance.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * The current time left on the timer.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * The amount of time between ticks of the timer.
   * 
   * @private
   * 
   * @property {number}
   * 
   * @default 1000
   */

  /**
   * When the timer is counting down, it checks this to make sure its still in step.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * A reference to the task manager module.
   * 
   * @private
   * 
   * @property {TaskManager}
   */

  /**
   * The id of the setTimeout timer.
   * 
   * @private
   * 
   * @property {setTimeout}
   */

  /**
   * The signal that is dispatched when the timer is paused.
   * 
   * @private
   * 
   * @property {Hypergiant}
   */

  /**
   * The signal that is dispatched when the timer is resumed from a paused state.
   * 
   * @private
   * 
   * @property {Hypergiant}
   */

  /**
   * The signal that is dispatched when the timer is stopped.
   * 
   * @private
   * 
   * @property {Hypergiant}
   */

  /**
   * The signal that is dispatched when a task is run.
   * 
   * @private
   * 
   * @property {Hypergiant}
   */

  /**
   * @param {string|number} startTime The time that Hearken will start counting down from. This can be in milliseconds or a string in a '00:00:00' format.
   */
  function Hearken(startTime) {
    _classCallCheck(this, Hearken);

    _defineProperty(this, "_startTime", void 0);

    _defineProperty(this, "_currentTime", void 0);

    _defineProperty(this, "_interval", 1000);

    _defineProperty(this, "_expected", 0);

    _defineProperty(this, "tasks", new TaskManager(this));

    _defineProperty(this, "_timer", void 0);

    _defineProperty(this, "_onpause", new Hypergiant());

    _defineProperty(this, "_onresume", new Hypergiant());

    _defineProperty(this, "_onstop", new Hypergiant());

    _defineProperty(this, "_ontask", new Hypergiant());

    this._startTime = auto(startTime);
    this._currentTime = this._startTime;
  }
  /**
   * Returns the time left on the timer.
   * 
   * @returns {number}
   */


  _createClass(Hearken, [{
    key: "start",

    /**
     * Set the `expected` property and begin the `setTimeout` countdown.
     */
    value: function start() {
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

  }, {
    key: "_tick",
    value: function _tick() {
      var _this = this;

      // Calculate any drift that might have occured.
      var drift = Date.now() - this._expected; // Woah, the drift is larger than the Hearken timer's interval we have to abandon ship.


      if (drift > this._interval) throw new Error('The timer has encountered an error and cannot recover'); // Adjust the Hearken timer's properties to account for the drift.

      this._expected += this._interval;
      this._currentTime -= this._interval;
      this.tasks.check(); // The Hearken timer is up no need to tick anymore.

      if (this._currentTime == 0) {
        this.stop();
        return;
      } // Call `setTimeout` again to keep the Hearken timer ticking
      // accounting for the drift.


      this._timer = setTimeout(function () {
        _this._tick();
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

  }, {
    key: "pause",
    value: function pause(reason) {
      clearTimeout(this._timer);
      this.onpause.dispatch({
        startTime: this._startTime,
        currentTime: this._currentTime,
        reason: reason
      });
    }
    /**
     * Continue the operation of the Hearken timer from a paused state.
     * 
     * The Hearken timer will resume from when it was paused like it was never paused in
     * the first place.
     */

  }, {
    key: "resume",
    value: function resume() {
      this._expected = Date.now();

      this._tick();

      this.onresume.dispatch({
        startTime: this._startTime,
        currentTime: this._currentTime
      });
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

  }, {
    key: "stop",
    value: function stop(reason) {
      clearTimeout(this._timer);
      this._timer = null;
      this.onstop.dispatch({
        startTime: this._startTime,
        currentTime: this._currentTime,
        reason: reason
      });
    }
  }, {
    key: "currentTime",
    get: function get() {
      return this._currentTime;
    }
    /**
     * Returns the onpause signal.
     * 
     * @returns {Hypergiant}
     */

  }, {
    key: "onpause",
    get: function get() {
      return this._onpause;
    }
    /**
     * Returns the onresume signal.
     * 
     * @returns {Hypergiant}
     */

  }, {
    key: "onresume",
    get: function get() {
      return this._onresume;
    }
    /**
     * Returns the onstop signal.
     * 
     * @returns {Hypergiant}
     */

  }, {
    key: "onstop",
    get: function get() {
      return this._onstop;
    }
    /**
     * Returns the ontask signal.
     * 
     * @returns {Hypergiant}
     */

  }, {
    key: "ontask",
    get: function get() {
      return this._ontask;
    }
  }]);

  return Hearken;
}(), _temp);
