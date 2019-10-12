'use strict';

var _events = _interopRequireDefault(require("events"));

var _convert = _interopRequireDefault(require("./utils/convert"));

var _TaskManager = _interopRequireDefault(require("./task/TaskManager"));

var _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

    _defineProperty(_assertThisInitialized(_this), "tasks", new _TaskManager["default"](_assertThisInitialized(_this)));

    _defineProperty(_assertThisInitialized(_this), "_timer", void 0);

    _this._startTime = (0, _convert["default"])(startTime);
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
}(_events["default"].EventEmitter), _temp);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwic3RhcnRUaW1lIiwiVGFza01hbmFnZXIiLCJfc3RhcnRUaW1lIiwiX2N1cnJlbnRUaW1lIiwiX2V4cGVjdGVkIiwiRGF0ZSIsIm5vdyIsIl90aWNrIiwiZHJpZnQiLCJfaW50ZXJ2YWwiLCJFcnJvciIsInRhc2tzIiwiY2hlY2siLCJzdG9wIiwiX3RpbWVyIiwic2V0VGltZW91dCIsIk1hdGgiLCJtYXgiLCJyZWFzb24iLCJjbGVhclRpbWVvdXQiLCJlbWl0IiwiY3VycmVudFRpbWUiLCJFdmVudHMiLCJFdmVudEVtaXR0ZXIiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOzs7QUFHQUEsTUFBTSxDQUFDQyxPQUFQO0FBQUE7QUFBQTtBQUFBOztBQUVFOzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7OztBQUdBLG1CQUFZQyxTQUFaLEVBQTBDO0FBQUE7O0FBQUE7O0FBRXhDOztBQUZ3Qzs7QUFBQTs7QUFBQSxnRUFoQ2QsSUFnQ2M7O0FBQUEsZ0VBdkJkLENBdUJjOztBQUFBLDREQWRiLElBQUlDLHVCQUFKLCtCQWNhOztBQUFBOztBQUl4QyxVQUFLQyxVQUFMLEdBQWtCLHlCQUFRRixTQUFSLENBQWxCO0FBRUEsVUFBS0csWUFBTCxHQUFvQixNQUFLRCxVQUF6QjtBQU53QztBQVF6QztBQUVEOzs7Ozs7O0FBdkVGO0FBQUE7O0FBa0ZFOzs7QUFsRkYsNEJBcUZVO0FBRU4sV0FBS0UsU0FBTCxHQUFpQkMsSUFBSSxDQUFDQyxHQUFMLEVBQWpCOztBQUVBLFdBQUtDLEtBQUw7QUFFRDtBQUVEOzs7Ozs7Ozs7OztBQTdGRjtBQUFBO0FBQUEsNEJBdUdrQjtBQUFBOztBQUVkO0FBQ0EsVUFBTUMsS0FBSyxHQUFHSCxJQUFJLENBQUNDLEdBQUwsS0FBYSxLQUFLRixTQUFoQyxDQUhjLENBS2Q7OztBQUNBLFVBQUlJLEtBQUssR0FBRyxLQUFLQyxTQUFqQixFQUE0QixNQUFNLElBQUlDLEtBQUosQ0FBVSx1REFBVixDQUFOLENBTmQsQ0FRZDs7QUFDQSxXQUFLTixTQUFMLElBQWtCLEtBQUtLLFNBQXZCO0FBQ0EsV0FBS04sWUFBTCxJQUFxQixLQUFLTSxTQUExQjtBQUVBLFdBQUtFLEtBQUwsQ0FBV0MsS0FBWCxHQVpjLENBY2Q7O0FBQ0EsVUFBSSxLQUFLVCxZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBRTFCLGFBQUtVLElBQUw7QUFFQTtBQUVELE9BckJhLENBdUJkO0FBQ0E7OztBQUNBLFdBQUtDLE1BQUwsR0FBY0MsVUFBVSxDQUFDLFlBQU07QUFFN0IsUUFBQSxNQUFJLENBQUNSLEtBQUw7QUFFRCxPQUp1QixFQUlyQlMsSUFBSSxDQUFDQyxHQUFMLENBQVMsQ0FBVCxFQUFZLEtBQUtSLFNBQUwsR0FBaUJELEtBQTdCLENBSnFCLENBQXhCO0FBTUQ7QUFFRDs7Ozs7Ozs7Ozs7O0FBeElGO0FBQUE7QUFBQSwwQkFtSlFVLE1BbkpSLEVBbUp5QjtBQUVyQkMsTUFBQUEsWUFBWSxDQUFDLEtBQUtMLE1BQU4sQ0FBWjtBQUVBLFdBQUtNLElBQUwsQ0FBVSxPQUFWLEVBQW1CO0FBQUVwQixRQUFBQSxTQUFTLEVBQUUsS0FBS0UsVUFBbEI7QUFBOEJtQixRQUFBQSxXQUFXLEVBQUUsS0FBS2xCLFlBQWhEO0FBQThEZSxRQUFBQSxNQUFNLEVBQUVBO0FBQXRFLE9BQW5CO0FBRUQ7QUFFRDs7Ozs7OztBQTNKRjtBQUFBO0FBQUEsNkJBaUtXO0FBRVAsV0FBS2QsU0FBTCxHQUFpQkMsSUFBSSxDQUFDQyxHQUFMLEVBQWpCOztBQUVBLFdBQUtDLEtBQUw7O0FBRUEsV0FBS2EsSUFBTCxDQUFVLFFBQVYsRUFBb0I7QUFBRXBCLFFBQUFBLFNBQVMsRUFBRSxLQUFLRSxVQUFsQjtBQUE4Qm1CLFFBQUFBLFdBQVcsRUFBRSxLQUFLbEI7QUFBaEQsT0FBcEI7QUFFRDtBQUVEOzs7Ozs7Ozs7O0FBM0tGO0FBQUE7QUFBQSx5QkFvTE9lLE1BcExQLEVBb0x3QjtBQUVwQkMsTUFBQUEsWUFBWSxDQUFDLEtBQUtMLE1BQU4sQ0FBWjtBQUVBLFdBQUtBLE1BQUwsR0FBYyxJQUFkO0FBRUEsV0FBS00sSUFBTCxDQUFVLE1BQVYsRUFBa0I7QUFBRXBCLFFBQUFBLFNBQVMsRUFBRSxLQUFLRSxVQUFsQjtBQUE4Qm1CLFFBQUFBLFdBQVcsRUFBRSxLQUFLbEIsWUFBaEQ7QUFBOERlLFFBQUFBLE1BQU0sRUFBRUE7QUFBdEUsT0FBbEI7QUFFRDtBQTVMSDtBQUFBO0FBQUEsd0JBNEU0QjtBQUV4QixhQUFPLEtBQUtmLFlBQVo7QUFFRDtBQWhGSDs7QUFBQTtBQUFBLEVBQXVDbUIsbUJBQU9DLFlBQTlDIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG5pbXBvcnQgRXZlbnRzIGZyb20gJ2V2ZW50cyc7XHJcbmltcG9ydCBjb252ZXJ0IGZyb20gJy4vdXRpbHMvY29udmVydCc7XHJcbmltcG9ydCBUYXNrTWFuYWdlciBmcm9tICcuL3Rhc2svVGFza01hbmFnZXInO1xyXG5cclxuLyoqXHJcbiAqIEhlYXJrZW4gaXMgYSBzZWxmLWFkanVzdGluZyBjb3VudGRvd24gdGltZXIgdGhhdCBjYW4gYmUgY29uZmlndXJlZCB0byBydW4gdGFza3Mgb24gYW4gaW50ZXJ2YWwgb3IganVzdCBvbmNlLlxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBIZWFya2VuIGV4dGVuZHMgRXZlbnRzLkV2ZW50RW1pdHRlciB7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBzdGFydCB0aW1lIG9mIHRoaXMgaW5zdGFuY2UuXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIF9zdGFydFRpbWU6IGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGN1cnJlbnQgdGltZSBsZWZ0IG9uIHRoZSB0aW1lci5cclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2N1cnJlbnRUaW1lOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBhbW91bnQgb2YgdGltZSBiZXR3ZWVuIHRpY2tzIG9mIHRoZSB0aW1lci5cclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBkZWZhdWx0IDEwMDBcclxuICAgKi9cclxuICBwcml2YXRlIF9pbnRlcnZhbDogbnVtYmVyID0gMTAwMDtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiB0aGUgdGltZXIgaXMgY291bnRpbmcgZG93biwgaXQgY2hlY2tzIHRoaXMgdG8gbWFrZSBzdXJlIGl0cyBzdGlsbCBpbiBzdGVwLlxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZXhwZWN0ZWQ6IG51bWJlciA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoZSB0YXNrIG1hbmFnZXIgbW9kdWxlLlxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7VGFza01hbmFnZXJ9XHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIHRhc2tzOiBUYXNrTWFuYWdlciA9IG5ldyBUYXNrTWFuYWdlcih0aGlzKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGlkIG9mIHRoZSBzZXRUaW1lb3V0IHRpbWVyLlxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7c2V0VGltZW91dH1cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3RpbWVyOiBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gc3RhcnRUaW1lIFRoZSB0aW1lIHRoYXQgSGVhcmtlbiB3aWxsIHN0YXJ0IGNvdW50aW5nIGRvd24gZnJvbS4gVGhpcyBjYW4gYmUgaW4gbWlsbGlzZWNvbmRzIG9yIGEgc3RyaW5nIGluIGEgJzAwOjAwOjAwJyBmb3JtYXQuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Ioc3RhcnRUaW1lOiAoc3RyaW5nIHwgbnVtYmVyKSkge1xyXG5cclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgdGhpcy5fc3RhcnRUaW1lID0gY29udmVydChzdGFydFRpbWUpO1xyXG5cclxuICAgIHRoaXMuX2N1cnJlbnRUaW1lID0gdGhpcy5fc3RhcnRUaW1lO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHRpbWUgbGVmdCBvbiB0aGUgdGltZXIuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge251bWJlcn1cclxuICAgKi9cclxuICBnZXQgY3VycmVudFRpbWUoKTogbnVtYmVyIHtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFRpbWU7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRoZSBgZXhwZWN0ZWRgIHByb3BlcnR5IGFuZCBiZWdpbiB0aGUgYHNldFRpbWVvdXRgIGNvdW50ZG93bi5cclxuICAgKi9cclxuICBzdGFydCgpIHtcclxuXHJcbiAgICB0aGlzLl9leHBlY3RlZCA9IERhdGUubm93KCk7XHJcblxyXG4gICAgdGhpcy5fdGljaygpO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogRXZlcnkgc2Vjb25kIEhlYXJrZW4gcnVucyBgX3RpY2tgIGFuZCBiZWdpbnMgYnkgY29ycmVjdGluZyBpdHNlbGYgb2YgYW55IGRyaWZ0XHJcbiAgKiB0aGF0IG1pZ2h0IGhhdmUgb2NjdXJyZWQgZHVyaW5nIG9wZXJhdGlvbi5cclxuICAqIFxyXG4gICogQWZ0ZXIgY29ycmVjdGlvbiwgSGVhcmtlbiBjaGVja3MgdG8gc2VlIGlmIHRoZXJlJ3MgYW55IHRhc2tzIHRoYXQgbmVlZCB0byBiZVxyXG4gICogYWNjb21wbGlzaGVkIGFuZCBpZiB0aGUgdGFza3MgYXJlIHNldCB0byByZXBlYXQsIEhlYXJrZW4gdXBkYXRlcyB0aGUgdGFza3MgdG9cclxuICAqIHRoZWlyIG5ldyBydW4gYXQgdmFsdWVzLlxyXG4gICogXHJcbiAgKiBAcHJpdmF0ZVxyXG4gICovXHJcbiAgcHJpdmF0ZSBfdGljaygpIHtcclxuXHJcbiAgICAvLyBDYWxjdWxhdGUgYW55IGRyaWZ0IHRoYXQgbWlnaHQgaGF2ZSBvY2N1cmVkLlxyXG4gICAgY29uc3QgZHJpZnQgPSBEYXRlLm5vdygpIC0gdGhpcy5fZXhwZWN0ZWQ7XHJcblxyXG4gICAgLy8gV29haCwgdGhlIGRyaWZ0IGlzIGxhcmdlciB0aGFuIHRoZSBIZWFya2VuIHRpbWVyJ3MgaW50ZXJ2YWwgd2UgaGF2ZSB0byBhYmFuZG9uIHNoaXAuXHJcbiAgICBpZiAoZHJpZnQgPiB0aGlzLl9pbnRlcnZhbCkgdGhyb3cgbmV3IEVycm9yKCdUaGUgdGltZXIgaGFzIGVuY291bnRlcmVkIGFuIGVycm9yIGFuZCBjYW5ub3QgcmVjb3ZlcicpO1xyXG5cclxuICAgIC8vIEFkanVzdCB0aGUgSGVhcmtlbiB0aW1lcidzIHByb3BlcnRpZXMgdG8gYWNjb3VudCBmb3IgdGhlIGRyaWZ0LlxyXG4gICAgdGhpcy5fZXhwZWN0ZWQgKz0gdGhpcy5faW50ZXJ2YWw7XHJcbiAgICB0aGlzLl9jdXJyZW50VGltZSAtPSB0aGlzLl9pbnRlcnZhbDtcclxuXHJcbiAgICB0aGlzLnRhc2tzLmNoZWNrKCk7XHJcblxyXG4gICAgLy8gVGhlIEhlYXJrZW4gdGltZXIgaXMgdXAgbm8gbmVlZCB0byB0aWNrIGFueW1vcmUuXHJcbiAgICBpZiAodGhpcy5fY3VycmVudFRpbWUgPT0gMCkge1xyXG5cclxuICAgICAgdGhpcy5zdG9wKCk7XHJcblxyXG4gICAgICByZXR1cm47XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIENhbGwgYHNldFRpbWVvdXRgIGFnYWluIHRvIGtlZXAgdGhlIEhlYXJrZW4gdGltZXIgdGlja2luZ1xyXG4gICAgLy8gYWNjb3VudGluZyBmb3IgdGhlIGRyaWZ0LlxyXG4gICAgdGhpcy5fdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgIHRoaXMuX3RpY2soKTtcclxuXHJcbiAgICB9LCBNYXRoLm1heCgwLCB0aGlzLl9pbnRlcnZhbCAtIGRyaWZ0KSk7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFsdCB0aGUgb3BlcmF0aW9uIG9mIHRoZSBIZWFya2VuIHRpbWVyIHVudGlsIGByZXN1bWVgIGlzIGNhbGxlZC5cclxuICAgKiBcclxuICAgKiBUaGUgcHJvcGVydGllcyBvZiB0aGUgSGVhcmtlbiB0aW1lciB3aWxsIGJlIHNhdmVkIHNvIHRoYXQgdGhlIHRpbWVyIGNhbiByZXN1bWUgbGlrZSBpdCB3YXNcclxuICAgKiBuZXZlciBwYXVzZWQuXHJcbiAgICogXHJcbiAgICogVGhpcyB3aWxsIGFsc28gZW1pdCBhIHBhdXNlIGV2ZW50IHdpdGggdGhlIEhlYXJrZW4gdGltZXIncyBwcm9wZXJ0aWVzIGFuZCB0aGUgcmVhc29uIGZvciB0aGVcclxuICAgKiB0aW1lciBiZWluZyBwYXVzZWQsIGlmIGFueS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3JlYXNvbl0gQSByZWFzb24gYXMgdG8gd2h5IHRoZSBIZWFya2VuIHRpbWVyIHdhcyBwYXVzZWQuXHJcbiAgICovXHJcbiAgcGF1c2UocmVhc29uPzogc3RyaW5nKSB7XHJcblxyXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVyKTtcclxuXHJcbiAgICB0aGlzLmVtaXQoJ3BhdXNlJywgeyBzdGFydFRpbWU6IHRoaXMuX3N0YXJ0VGltZSwgY3VycmVudFRpbWU6IHRoaXMuX2N1cnJlbnRUaW1lLCByZWFzb246IHJlYXNvbiB9KTtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb250aW51ZSB0aGUgb3BlcmF0aW9uIG9mIHRoZSBIZWFya2VuIHRpbWVyIGZyb20gYSBwYXVzZWQgc3RhdGUuXHJcbiAgICogXHJcbiAgICogVGhlIEhlYXJrZW4gdGltZXIgd2lsbCByZXN1bWUgZnJvbSB3aGVuIGl0IHdhcyBwYXVzZWQgbGlrZSBpdCB3YXMgbmV2ZXIgcGF1c2VkIGluXHJcbiAgICogdGhlIGZpcnN0IHBsYWNlLlxyXG4gICAqL1xyXG4gIHJlc3VtZSgpIHtcclxuXHJcbiAgICB0aGlzLl9leHBlY3RlZCA9IERhdGUubm93KCk7XHJcblxyXG4gICAgdGhpcy5fdGljaygpO1xyXG5cclxuICAgIHRoaXMuZW1pdCgncmVzdW1lJywgeyBzdGFydFRpbWU6IHRoaXMuX3N0YXJ0VGltZSwgY3VycmVudFRpbWU6IHRoaXMuX2N1cnJlbnRUaW1lIH0pO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3AgdGhlIG9wZXJhdGlvbiBvZiB0aGUgSGVhcmtlbiB0aW1lciBhbmQgc2V0IGFsbCBwcm9wZXJ0aWVzIGJhY2sgdG8gdGhlaXIgb3JpZ2luYWxcclxuICAgKiB2YWx1ZXMuXHJcbiAgICogXHJcbiAgICogVXNlIHRoaXMgb25seSBpZiB5b3UncmUgZG9uZSB3aXRoIHRoaXMgaW5zdGFuY2Ugb2YgdGhlIHRpbWVyIGFuZCB3YW50IHRvIHN0b3BcclxuICAgKiBpdCBhbmQgZW1pdCB0aGUgc3RvcCBldmVudC5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3JlYXNvbl0gQSByZWFzb24gYXMgdG8gd2h5IHRoZSBIZWFya2VuIHRpbWVyIHdhcyBwYXVzZWQuXHJcbiAgICovXHJcbiAgc3RvcChyZWFzb24/OiBzdHJpbmcpIHtcclxuXHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZXIpO1xyXG5cclxuICAgIHRoaXMuX3RpbWVyID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLmVtaXQoJ3N0b3AnLCB7IHN0YXJ0VGltZTogdGhpcy5fc3RhcnRUaW1lLCBjdXJyZW50VGltZTogdGhpcy5fY3VycmVudFRpbWUsIHJlYXNvbjogcmVhc29uIH0pO1xyXG5cclxuICB9XHJcblxyXG59OyJdfQ==