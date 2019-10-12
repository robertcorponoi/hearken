'use strict';
/**
 * A task is a job that can be assigned to a Hearken instance and it either runs at an interval
 * or just one time.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

exports["default"] = Task;
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrL1Rhc2sudHMiXSwibmFtZXMiOlsiVGFzayIsIm5hbWUiLCJ0aW1lIiwiY2IiLCJyZXBlYXQiLCJfbmFtZSIsIl90aW1lIiwiX2NiIiwicnVuQXQiXSwibWFwcGluZ3MiOiJBQUFBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUlxQkEsSTs7O0FBRW5COzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7QUFPQTs7Ozs7O0FBTUEsZ0JBQVlDLElBQVosRUFBMEJDLElBQTFCLEVBQXdDQyxFQUF4QyxFQUFzREMsTUFBdEQsRUFBdUU7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFFckUsU0FBS0MsS0FBTCxHQUFhSixJQUFiO0FBRUEsU0FBS0ssS0FBTCxHQUFhSixJQUFiO0FBRUEsU0FBS0ssR0FBTCxHQUFXSixFQUFYO0FBRUEsU0FBS0MsTUFBTCxHQUFjQSxNQUFkO0FBRUEsU0FBS0ksS0FBTCxHQUFhLEtBQUtGLEtBQWxCO0FBRUQ7QUFFRDs7Ozs7Ozs7OztBQXNCQTs7OzBCQUdNO0FBRUosV0FBS0MsR0FBTDtBQUVEO0FBRUQ7Ozs7Ozs7OzJCQUtPTCxJLEVBQWM7QUFFbkIsV0FBS00sS0FBTCxHQUFhTixJQUFiO0FBRUQ7Ozt3QkFuQ2tCO0FBRWpCLGFBQU8sS0FBS0csS0FBWjtBQUVEO0FBRUQ7Ozs7Ozs7O3dCQUttQjtBQUVqQixhQUFPLEtBQUtHLEtBQVo7QUFFRDs7Ozs7OztBQXNCRiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuLyoqXHJcbiAqIEEgdGFzayBpcyBhIGpvYiB0aGF0IGNhbiBiZSBhc3NpZ25lZCB0byBhIEhlYXJrZW4gaW5zdGFuY2UgYW5kIGl0IGVpdGhlciBydW5zIGF0IGFuIGludGVydmFsXHJcbiAqIG9yIGp1c3Qgb25lIHRpbWUuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrIHtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG5hbWUgb2YgdGhpcyB0YXNrLlxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7c3RyaW5nfVxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgdGltZSB0byBydW4gdGhlIHRhc2sgYXQuIElmIGByZXBlYXRgIGlzIHNldCB0byBgdHJ1ZWAsIHRoZW4gdGhlIHRhc2sgd2lsbCBydW4gYXQgYW4gaW50ZXJ2YWwuXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtzdHJpbmd8bnVtYmVyfVxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgX3RpbWU6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGNhbGxiYWNrIG1ldGhvZCB0aGF0IHdpbGwgYmUgY2FsbGVkIHdoZW4gdGhlIHRhc2sgaXMgcnVuLlxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259XHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIF9jYjogRnVuY3Rpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSB0YXNrIGlzIHN1cHBvc2VkIHRvIHJlcGVhdCBvbiBhbiBpbnRlcnZhbC5cclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge2Jvb2xlYW59XHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICByZXBlYXQ6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBuZXh0IHRpbWUgdGhhdCB0aGlzIHRhc2sgc2hvdWxkIHJ1biBhdC5cclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKi9cclxuICBydW5BdDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGlzIHRhc2suXHJcbiAgICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSB0aW1lIFRoZSB0aW1lIHRvIHJ1biB0aGUgdGFzayBhdC4gSWYgYHJlcGVhdGAgaXMgc2V0IHRvIGB0cnVlYCwgdGhlbiB0aGUgdGFzayB3aWxsIHJ1biBhdCBhbiBpbnRlcnZhbC5cclxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiBUaGUgY2FsbGJhY2sgbWV0aG9kIHRoYXQgd2lsbCBiZSBjYWxsZWQgd2hlbiB0aGUgdGFzayBpcyBydW4uXHJcbiAgICogQHBhcmFtIHtib29sZWFufSByZXBlYXQgSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHRhc2sgaXMgc3VwcG9zZWQgdG8gcmVwZWF0IG9uIGFuIGludGVydmFsLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgdGltZTogbnVtYmVyLCBjYjogRnVuY3Rpb24sIHJlcGVhdDogYm9vbGVhbikge1xyXG5cclxuICAgIHRoaXMuX25hbWUgPSBuYW1lO1xyXG5cclxuICAgIHRoaXMuX3RpbWUgPSB0aW1lO1xyXG5cclxuICAgIHRoaXMuX2NiID0gY2I7XHJcblxyXG4gICAgdGhpcy5yZXBlYXQgPSByZXBlYXQ7XHJcblxyXG4gICAgdGhpcy5ydW5BdCA9IHRoaXMuX3RpbWU7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgbmFtZSBvZiB0aGlzIHRhc2suXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgKi9cclxuICBnZXQgbmFtZSgpOiBzdHJpbmcge1xyXG5cclxuICAgIHJldHVybiB0aGlzLl9uYW1lO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHRpbWUgdGhpcyB0YXNrIGlzIHNldCB0byBydW4gYXQgbmV4dC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIGdldCB0aW1lKCk6IG51bWJlciB7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMucnVuQXQ7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUnVucyB0aGUgY2FsbGJhY2sgbWV0aG9kIGZvciB0aGlzIHRhc2suXHJcbiAgICovXHJcbiAgcnVuKCkge1xyXG5cclxuICAgIHRoaXMuX2NiKCk7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlZCBieSB0aGUgVGFzayBNYW5hZ2VyIG1vZHVsZSB0byB1cGRhdGUgdGhlIHRpbWUgdGhhdCB0aGlzIHRhc2sgc2hvdWxkIHJ1biBhdCBuZXh0LlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lIFRoZSBuZXcgdGltZSB0byBydW4gdGhpcyB0YXNrIGF0LlxyXG4gICAqL1xyXG4gIHVwZGF0ZSh0aW1lOiBudW1iZXIpIHtcclxuXHJcbiAgICB0aGlzLnJ1bkF0ID0gdGltZTtcclxuXHJcbiAgfVxyXG5cclxufTsiXX0=