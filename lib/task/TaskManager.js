'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Task = _interopRequireDefault(require("./Task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      var task = new _Task["default"](name, time, cb, repeat);
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

exports["default"] = TaskManager;
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrL1Rhc2tNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbIlRhc2tNYW5hZ2VyIiwiaGVhcmtlbiIsIl9oZWFya2VuIiwibmFtZSIsInRpbWUiLCJjYiIsInJlcGVhdCIsInRhc2siLCJUYXNrIiwidXBkYXRlIiwiY3VycmVudFRpbWUiLCJfdGltZSIsIl90YXNrcyIsInB1c2giLCJmaWx0ZXIiLCJydW5BdCIsInJ1biIsImVtaXQiLCJzdGFydFRpbWUiLCJ0Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOzs7Ozs7Ozs7Ozs7QUFFQTs7O0lBR3FCQSxXOzs7QUFFbkI7Ozs7Ozs7O0FBVUE7Ozs7Ozs7O0FBU0E7OztBQUdBLHVCQUFZQyxPQUFaLEVBQTBCO0FBQUE7O0FBQUE7O0FBQUEsb0NBTEosRUFLSTs7QUFFeEIsU0FBS0MsUUFBTCxHQUFnQkQsT0FBaEI7QUFFRDtBQUVEOzs7Ozs7Ozs7Ozs7OzsyQkFVT0UsSSxFQUFjQyxJLEVBQWNDLEUsRUFBb0Q7QUFBQSxVQUF0Q0MsTUFBc0MsdUVBQXBCLEtBQW9CO0FBRXJGLFVBQU1DLElBQVUsR0FBRyxJQUFJQyxnQkFBSixDQUFTTCxJQUFULEVBQWVDLElBQWYsRUFBcUJDLEVBQXJCLEVBQXlCQyxNQUF6QixDQUFuQjtBQUVBLFVBQUlBLE1BQUosRUFBWUMsSUFBSSxDQUFDRSxNQUFMLENBQVksS0FBS1AsUUFBTCxDQUFjUSxXQUFkLEdBQTRCSCxJQUFJLENBQUNJLEtBQTdDOztBQUVaLFdBQUtDLE1BQUwsQ0FBWUMsSUFBWixDQUFpQk4sSUFBakI7O0FBRUEsYUFBTyxJQUFQO0FBRUQ7QUFFRDs7Ozs7Ozs7Ozs0QkFPUUosSSxFQUEyQjtBQUVqQyxXQUFLUyxNQUFMLEdBQWMsS0FBS0EsTUFBTCxDQUFZRSxNQUFaLENBQW1CLFVBQUNQLElBQUQ7QUFBQSxlQUFnQkEsSUFBSSxDQUFDSixJQUFMLEtBQWNBLElBQTlCO0FBQUEsT0FBbkIsQ0FBZDtBQUVBLGFBQU8sSUFBUDtBQUVEO0FBRUQ7Ozs7Ozs7O2lDQUswQjtBQUV4QixXQUFLUyxNQUFMLEdBQWMsRUFBZDtBQUVBLGFBQU8sSUFBUDtBQUVEO0FBRUQ7Ozs7Ozs0QkFHUTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsY0FFS0wsSUFGTDs7QUFJSixjQUFJQSxJQUFJLENBQUNRLEtBQUwsS0FBZSxLQUFJLENBQUNiLFFBQUwsQ0FBY1EsV0FBakMsRUFBOEM7QUFFNUNILFlBQUFBLElBQUksQ0FBQ1MsR0FBTDs7QUFFQSxZQUFBLEtBQUksQ0FBQ2QsUUFBTCxDQUFjZSxJQUFkLENBQW1CLE1BQW5CLEVBQTJCO0FBRXpCQyxjQUFBQSxTQUFTLEVBQUUsS0FBSSxDQUFDaEIsUUFBTCxDQUFjZ0IsU0FGQTtBQUl6QlIsY0FBQUEsV0FBVyxFQUFFLEtBQUksQ0FBQ1IsUUFBTCxDQUFjUSxXQUpGO0FBTXpCSCxjQUFBQSxJQUFJLEVBQUVBO0FBTm1CLGFBQTNCOztBQVVBLGdCQUFJQSxJQUFJLENBQUNELE1BQVQsRUFBaUJDLElBQUksQ0FBQ0UsTUFBTCxDQUFZLEtBQUksQ0FBQ1AsUUFBTCxDQUFjUSxXQUFkLEdBQTRCSCxJQUFJLENBQUNJLEtBQTdDLEVBQWpCLEtBRUssS0FBSSxDQUFDQyxNQUFMLEdBQWMsS0FBSSxDQUFDQSxNQUFMLENBQVlFLE1BQVosQ0FBbUIsVUFBQ0ssQ0FBRDtBQUFBLHFCQUFhQSxDQUFDLENBQUNoQixJQUFGLEtBQVdJLElBQUksQ0FBQ0osSUFBN0I7QUFBQSxhQUFuQixDQUFkO0FBRU47QUF0Qkc7O0FBRU4sNkJBQW1CLEtBQUtTLE1BQXhCLDhIQUFnQztBQUFBO0FBc0IvQjtBQXhCSztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBMEJQOzs7Ozs7O0FBRUYiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbmltcG9ydCBUYXNrIGZyb20gJy4vVGFzayc7XHJcblxyXG4vKipcclxuICogVGhlIFRhc2sgTWFuYWdlciBtb2R1bGUgaXMgcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIGFuZCByZW1vdmluZyB0YXNrcyBmcm9tIHRoZSBIZWFya2VuIHRpbWVyLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFza01hbmFnZXIge1xyXG5cclxuICAvKipcclxuICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgSGVhcmtlbiB0aW1lciBpbnN0YW5jZS5cclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0hlYWtlbn1cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF9oZWFya2VuOiBhbnk7XHJcblxyXG5cclxuICAvKipcclxuICAgKiBBbGwgb2YgdGhlIHRhc2tzIHRoYXQgaGF2ZSBiZWVuIGNyZWF0ZWQuXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtBcnJheTxUYXNrPn1cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF90YXNrczogQXJyYXk8VGFzaz4gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtIZWFya2VufSBoZWFya2VuIEEgcmVmZXJlbmNlIHRvIHRoZSBIZWFya2VuIGluc3RhbmNlLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGhlYXJrZW46IGFueSkge1xyXG5cclxuICAgIHRoaXMuX2hlYXJrZW4gPSBoZWFya2VuO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBuZXcgdGFzay5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGlzIHRhc2suXHJcbiAgICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSB0aW1lIFRoZSB0aW1lIHRvIHJ1biB0aGUgdGFzayBhdC4gSWYgYHJlcGVhdGAgaXMgc2V0IHRvIGB0cnVlYCwgdGhlbiB0aGUgdGFzayB3aWxsIHJ1biBhdCBhbiBpbnRlcnZhbC5cclxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiBUaGUgY2FsbGJhY2sgbWV0aG9kIHRoYXQgd2lsbCBiZSBjYWxsZWQgd2hlbiB0aGUgdGFzayBpcyBydW4uXHJcbiAgICogQHBhcmFtIHtib29sZWFufSBbcmVwZWF0PWZhbHNlXSBJbmRpY2F0ZXMgd2hldGhlciB0aGUgdGFzayBpcyBzdXBwb3NlZCB0byByZXBlYXQgb24gYW4gaW50ZXJ2YWwuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1Rhc2tNYW5hZ2VyfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIGNyZWF0ZShuYW1lOiBzdHJpbmcsIHRpbWU6IG51bWJlciwgY2I6IEZ1bmN0aW9uLCByZXBlYXQ6IGJvb2xlYW4gPSBmYWxzZSk6IFRhc2tNYW5hZ2VyIHtcclxuXHJcbiAgICBjb25zdCB0YXNrOiBUYXNrID0gbmV3IFRhc2sobmFtZSwgdGltZSwgY2IsIHJlcGVhdCk7XHJcblxyXG4gICAgaWYgKHJlcGVhdCkgdGFzay51cGRhdGUodGhpcy5faGVhcmtlbi5jdXJyZW50VGltZSAtIHRhc2suX3RpbWUpO1xyXG5cclxuICAgIHRoaXMuX3Rhc2tzLnB1c2godGFzayk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlcyBhIHRhc2suXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIHRhc2sgdG8gcmVtb3ZlLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtUYXNrTWFuYWdlcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBkZXN0cm95KG5hbWU6IHN0cmluZyk6IFRhc2tNYW5hZ2VyIHtcclxuXHJcbiAgICB0aGlzLl90YXNrcyA9IHRoaXMuX3Rhc2tzLmZpbHRlcigodGFzazogVGFzaykgPT4gdGFzay5uYW1lICE9PSBuYW1lKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmVzIGFsbCB0YXNrcy5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VGFza01hbmFnZXJ9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgZGVzdHJveUFsbCgpOiBUYXNrTWFuYWdlciB7XHJcblxyXG4gICAgdGhpcy5fdGFza3MgPSBbXTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVja3MgdG8gc2VlIGlmIGFueSB0YXNrcyBhcmUgZHVlIHRvIGJlIHJ1bi5cclxuICAgKi9cclxuICBjaGVjaygpIHtcclxuXHJcbiAgICBmb3IgKGNvbnN0IHRhc2sgb2YgdGhpcy5fdGFza3MpIHtcclxuXHJcbiAgICAgIGlmICh0YXNrLnJ1bkF0ID09PSB0aGlzLl9oZWFya2VuLmN1cnJlbnRUaW1lKSB7XHJcblxyXG4gICAgICAgIHRhc2sucnVuKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2hlYXJrZW4uZW1pdCgndGFzaycsIHtcclxuXHJcbiAgICAgICAgICBzdGFydFRpbWU6IHRoaXMuX2hlYXJrZW4uc3RhcnRUaW1lLFxyXG5cclxuICAgICAgICAgIGN1cnJlbnRUaW1lOiB0aGlzLl9oZWFya2VuLmN1cnJlbnRUaW1lLFxyXG5cclxuICAgICAgICAgIHRhc2s6IHRhc2tcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICh0YXNrLnJlcGVhdCkgdGFzay51cGRhdGUodGhpcy5faGVhcmtlbi5jdXJyZW50VGltZSAtIHRhc2suX3RpbWUpO1xyXG5cclxuICAgICAgICBlbHNlIHRoaXMuX3Rhc2tzID0gdGhpcy5fdGFza3MuZmlsdGVyKCh0OiBUYXNrKSA9PiB0Lm5hbWUgIT09IHRhc2submFtZSk7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59OyJdfQ==