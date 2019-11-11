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

exports["default"] = TaskManager;
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrL1Rhc2tNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbIlRhc2tNYW5hZ2VyIiwiaGVhcmtlbiIsIl9oZWFya2VuIiwibmFtZSIsInRpbWUiLCJjYiIsInJlcGVhdCIsInRhc2siLCJUYXNrIiwidXBkYXRlIiwiY3VycmVudFRpbWUiLCJfdGltZSIsIl90YXNrcyIsInB1c2giLCJmaWx0ZXIiLCJydW5BdCIsInJ1biIsIm9udGFzayIsImRpc3BhdGNoIiwic3RhcnRUaW1lIiwidCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0FBRUE7OztJQUdxQkEsVzs7O0FBRW5COzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7QUFHQSx1QkFBWUMsT0FBWixFQUEwQjtBQUFBOztBQUFBOztBQUFBLG9DQUxJLEVBS0o7O0FBRXhCLFNBQUtDLFFBQUwsR0FBZ0JELE9BQWhCO0FBRUQ7QUFFRDs7Ozs7Ozs7Ozs7Ozs7MkJBVU9FLEksRUFBY0MsSSxFQUFjQyxFLEVBQW9EO0FBQUEsVUFBdENDLE1BQXNDLHVFQUFwQixLQUFvQjtBQUVyRixVQUFNQyxJQUFVLEdBQUcsSUFBSUMsZ0JBQUosQ0FBU0wsSUFBVCxFQUFlQyxJQUFmLEVBQXFCQyxFQUFyQixFQUF5QkMsTUFBekIsQ0FBbkI7QUFFQSxVQUFJQSxNQUFKLEVBQVlDLElBQUksQ0FBQ0UsTUFBTCxDQUFZLEtBQUtQLFFBQUwsQ0FBY1EsV0FBZCxHQUE0QkgsSUFBSSxDQUFDSSxLQUE3Qzs7QUFFWixXQUFLQyxNQUFMLENBQVlDLElBQVosQ0FBaUJOLElBQWpCOztBQUVBLGFBQU8sSUFBUDtBQUVEO0FBRUQ7Ozs7Ozs7Ozs7NEJBT1FKLEksRUFBMkI7QUFFakMsV0FBS1MsTUFBTCxHQUFjLEtBQUtBLE1BQUwsQ0FBWUUsTUFBWixDQUFtQixVQUFDUCxJQUFEO0FBQUEsZUFBZ0JBLElBQUksQ0FBQ0osSUFBTCxLQUFjQSxJQUE5QjtBQUFBLE9BQW5CLENBQWQ7QUFFQSxhQUFPLElBQVA7QUFFRDtBQUVEOzs7Ozs7OztpQ0FLMEI7QUFFeEIsV0FBS1MsTUFBTCxHQUFjLEVBQWQ7QUFFQSxhQUFPLElBQVA7QUFFRDtBQUVEOzs7Ozs7NEJBR1E7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLGNBRUtMLElBRkw7O0FBSUosY0FBSUEsSUFBSSxDQUFDUSxLQUFMLEtBQWUsS0FBSSxDQUFDYixRQUFMLENBQWNRLFdBQWpDLEVBQThDO0FBRTVDSCxZQUFBQSxJQUFJLENBQUNTLEdBQUw7O0FBRUEsWUFBQSxLQUFJLENBQUNkLFFBQUwsQ0FBY2UsTUFBZCxDQUFxQkMsUUFBckIsQ0FBOEI7QUFBRUMsY0FBQUEsU0FBUyxFQUFFLEtBQUksQ0FBQ2pCLFFBQUwsQ0FBY2lCLFNBQTNCO0FBQXNDVCxjQUFBQSxXQUFXLEVBQUUsS0FBSSxDQUFDUixRQUFMLENBQWNRLFdBQWpFO0FBQThFSCxjQUFBQSxJQUFJLEVBQUVBO0FBQXBGLGFBQTlCOztBQUVBLGdCQUFJQSxJQUFJLENBQUNELE1BQVQsRUFBaUJDLElBQUksQ0FBQ0UsTUFBTCxDQUFZLEtBQUksQ0FBQ1AsUUFBTCxDQUFjUSxXQUFkLEdBQTRCSCxJQUFJLENBQUNJLEtBQTdDLEVBQWpCLEtBRUssS0FBSSxDQUFDQyxNQUFMLEdBQWMsS0FBSSxDQUFDQSxNQUFMLENBQVlFLE1BQVosQ0FBbUIsVUFBQ00sQ0FBRDtBQUFBLHFCQUFhQSxDQUFDLENBQUNqQixJQUFGLEtBQVdJLElBQUksQ0FBQ0osSUFBN0I7QUFBQSxhQUFuQixDQUFkO0FBRU47QUFkRzs7QUFFTiw2QkFBbUIsS0FBS1MsTUFBeEIsOEhBQWdDO0FBQUE7QUFjL0I7QUFoQks7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWtCUDs7Ozs7OztBQUVGIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG5pbXBvcnQgVGFzayBmcm9tICcuL1Rhc2snO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBUYXNrIE1hbmFnZXIgbW9kdWxlIGlzIHJlc3BvbnNpYmxlIGZvciBjcmVhdGluZyBhbmQgcmVtb3ZpbmcgdGFza3MgZnJvbSB0aGUgSGVhcmtlbiB0aW1lci5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2tNYW5hZ2VyIHtcclxuXHJcbiAgLyoqXHJcbiAgICogQSByZWZlcmVuY2UgdG8gdGhlIEhlYXJrZW4gdGltZXIgaW5zdGFuY2UuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0hlYWtlbn1cclxuICAgKi9cclxuICBwcml2YXRlIF9oZWFya2VuOiBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFsbCBvZiB0aGUgdGFza3MgdGhhdCBoYXZlIGJlZW4gY3JlYXRlZC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXk8VGFzaz59XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfdGFza3M6IEFycmF5PFRhc2s+ID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7SGVhcmtlbn0gaGVhcmtlbiBBIHJlZmVyZW5jZSB0byB0aGUgSGVhcmtlbiBpbnN0YW5jZS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihoZWFya2VuOiBhbnkpIHtcclxuXHJcbiAgICB0aGlzLl9oZWFya2VuID0gaGVhcmtlbjtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgbmV3IHRhc2suXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhpcyB0YXNrLlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gdGltZSBUaGUgdGltZSB0byBydW4gdGhlIHRhc2sgYXQuIElmIGByZXBlYXRgIGlzIHNldCB0byBgdHJ1ZWAsIHRoZW4gdGhlIHRhc2sgd2lsbCBydW4gYXQgYW4gaW50ZXJ2YWwuXHJcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgVGhlIGNhbGxiYWNrIG1ldGhvZCB0aGF0IHdpbGwgYmUgY2FsbGVkIHdoZW4gdGhlIHRhc2sgaXMgcnVuLlxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3JlcGVhdD1mYWxzZV0gSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHRhc2sgaXMgc3VwcG9zZWQgdG8gcmVwZWF0IG9uIGFuIGludGVydmFsLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtUYXNrTWFuYWdlcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBjcmVhdGUobmFtZTogc3RyaW5nLCB0aW1lOiBudW1iZXIsIGNiOiBGdW5jdGlvbiwgcmVwZWF0OiBib29sZWFuID0gZmFsc2UpOiBUYXNrTWFuYWdlciB7XHJcblxyXG4gICAgY29uc3QgdGFzazogVGFzayA9IG5ldyBUYXNrKG5hbWUsIHRpbWUsIGNiLCByZXBlYXQpO1xyXG5cclxuICAgIGlmIChyZXBlYXQpIHRhc2sudXBkYXRlKHRoaXMuX2hlYXJrZW4uY3VycmVudFRpbWUgLSB0YXNrLl90aW1lKTtcclxuXHJcbiAgICB0aGlzLl90YXNrcy5wdXNoKHRhc2spO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZXMgYSB0YXNrLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSB0YXNrIHRvIHJlbW92ZS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VGFza01hbmFnZXJ9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgZGVzdHJveShuYW1lOiBzdHJpbmcpOiBUYXNrTWFuYWdlciB7XHJcblxyXG4gICAgdGhpcy5fdGFza3MgPSB0aGlzLl90YXNrcy5maWx0ZXIoKHRhc2s6IFRhc2spID0+IHRhc2submFtZSAhPT0gbmFtZSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlcyBhbGwgdGFza3MuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1Rhc2tNYW5hZ2VyfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIGRlc3Ryb3lBbGwoKTogVGFza01hbmFnZXIge1xyXG5cclxuICAgIHRoaXMuX3Rhc2tzID0gW107XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2tzIHRvIHNlZSBpZiBhbnkgdGFza3MgYXJlIGR1ZSB0byBiZSBydW4uXHJcbiAgICovXHJcbiAgY2hlY2soKSB7XHJcblxyXG4gICAgZm9yIChjb25zdCB0YXNrIG9mIHRoaXMuX3Rhc2tzKSB7XHJcblxyXG4gICAgICBpZiAodGFzay5ydW5BdCA9PT0gdGhpcy5faGVhcmtlbi5jdXJyZW50VGltZSkge1xyXG5cclxuICAgICAgICB0YXNrLnJ1bigpO1xyXG5cclxuICAgICAgICB0aGlzLl9oZWFya2VuLm9udGFzay5kaXNwYXRjaCh7IHN0YXJ0VGltZTogdGhpcy5faGVhcmtlbi5zdGFydFRpbWUsIGN1cnJlbnRUaW1lOiB0aGlzLl9oZWFya2VuLmN1cnJlbnRUaW1lLCB0YXNrOiB0YXNrIH0pO1xyXG5cclxuICAgICAgICBpZiAodGFzay5yZXBlYXQpIHRhc2sudXBkYXRlKHRoaXMuX2hlYXJrZW4uY3VycmVudFRpbWUgLSB0YXNrLl90aW1lKTtcclxuXHJcbiAgICAgICAgZWxzZSB0aGlzLl90YXNrcyA9IHRoaXMuX3Rhc2tzLmZpbHRlcigodDogVGFzaykgPT4gdC5uYW1lICE9PSB0YXNrLm5hbWUpO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxufTsiXX0=