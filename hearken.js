import Events from 'events';

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

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

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
 * @since 2.0.0
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

var Task =
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
   * @property {Heaken}
   * 
   * @private
   */

  /**
   * All of the tasks that have been created.
   * 
   * @property {Array<Task>}
   * 
   * @private
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
      var task = new Task(name, time, cb, repeat);
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

            _this._hearken.emit('task', {
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
function (_Events$EventEmitter) {
  _inherits(Hearken, _Events$EventEmitter);

  /**
   * The start time of this instance.
   * 
   * @property {number}
   * 
   * @private
   */

  /**
   * The current time left on the timer.
   * 
   * @property {number}
   * 
   * @private
   */

  /**
   * The amount of time between ticks of the timer.
   * 
   * @property {number}
   * 
   * @private
   * 
   * @default 1000
   */

  /**
   * When the timer is counting down, it checks this to make sure its still in step.
   * 
   * @property {number}
   * 
   * @private
   */

  /**
   * A reference to the task manager module.
   * 
   * @property {TaskManager}
   * 
   * @private
   */

  /**
   * The id of the setTimeout timer.
   * 
   * @property {setTimeout}
   * 
   * @private
   */

  /**
   * @param {string|number} startTime The time that Hearken will start counting down from. This can be in milliseconds or a string in a '00:00:00' format.
   */
  function Hearken(startTime) {
    var _this;

    _classCallCheck(this, Hearken);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Hearken).call(this));

    _defineProperty(_assertThisInitialized(_this), "_startTime", void 0);

    _defineProperty(_assertThisInitialized(_this), "_currentTime", void 0);

    _defineProperty(_assertThisInitialized(_this), "_interval", 1000);

    _defineProperty(_assertThisInitialized(_this), "_expected", 0);

    _defineProperty(_assertThisInitialized(_this), "tasks", new TaskManager(_assertThisInitialized(_this)));

    _defineProperty(_assertThisInitialized(_this), "_timer", void 0);

    _this._startTime = auto(startTime);
    _this._currentTime = _this._startTime;
    return _this;
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
      var _this2 = this;

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
        _this2._tick();
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
      this.emit('pause', {
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

      this.emit('resume', {
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
      this.emit('stop', {
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
  }]);

  return Hearken;
}(Events.EventEmitter), _temp);
