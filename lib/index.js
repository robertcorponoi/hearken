'use strict';

var _hypergiant = _interopRequireDefault(require("hypergiant"));

var _convert = _interopRequireDefault(require("./utils/convert"));

var _TaskManager = _interopRequireDefault(require("./task/TaskManager"));

var _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

    _defineProperty(this, "tasks", new _TaskManager["default"](this));

    _defineProperty(this, "_timer", void 0);

    _defineProperty(this, "_onpause", new _hypergiant["default"]());

    _defineProperty(this, "_onresume", new _hypergiant["default"]());

    _defineProperty(this, "_onstop", new _hypergiant["default"]());

    _defineProperty(this, "_ontask", new _hypergiant["default"]());

    this._startTime = (0, _convert["default"])(startTime);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwic3RhcnRUaW1lIiwiVGFza01hbmFnZXIiLCJIeXBlcmdpYW50IiwiX3N0YXJ0VGltZSIsIl9jdXJyZW50VGltZSIsIl9leHBlY3RlZCIsIkRhdGUiLCJub3ciLCJfdGljayIsImRyaWZ0IiwiX2ludGVydmFsIiwiRXJyb3IiLCJ0YXNrcyIsImNoZWNrIiwic3RvcCIsIl90aW1lciIsInNldFRpbWVvdXQiLCJNYXRoIiwibWF4IiwicmVhc29uIiwiY2xlYXJUaW1lb3V0Iiwib25wYXVzZSIsImRpc3BhdGNoIiwiY3VycmVudFRpbWUiLCJvbnJlc3VtZSIsIm9uc3RvcCIsIl9vbnBhdXNlIiwiX29ucmVzdW1lIiwiX29uc3RvcCIsIl9vbnRhc2siXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVBOzs7QUFHQUEsTUFBTSxDQUFDQyxPQUFQO0FBQUE7QUFBQTtBQUVFOzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7OztBQUdBLG1CQUFZQyxTQUFaLEVBQTBDO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUEsdUNBcEVkLElBb0VjOztBQUFBLHVDQTNEZCxDQTJEYzs7QUFBQSxtQ0FsRGIsSUFBSUMsdUJBQUosQ0FBZ0IsSUFBaEIsQ0FrRGE7O0FBQUE7O0FBQUEsc0NBaENYLElBQUlDLHNCQUFKLEVBZ0NXOztBQUFBLHVDQXZCVixJQUFJQSxzQkFBSixFQXVCVTs7QUFBQSxxQ0FkWixJQUFJQSxzQkFBSixFQWNZOztBQUFBLHFDQUxaLElBQUlBLHNCQUFKLEVBS1k7O0FBRXhDLFNBQUtDLFVBQUwsR0FBa0IseUJBQVFILFNBQVIsQ0FBbEI7QUFFQSxTQUFLSSxZQUFMLEdBQW9CLEtBQUtELFVBQXpCO0FBRUQ7QUFFRDs7Ozs7OztBQXpHRjtBQUFBOztBQTRJRTs7O0FBNUlGLDRCQStJVTtBQUVOLFdBQUtFLFNBQUwsR0FBaUJDLElBQUksQ0FBQ0MsR0FBTCxFQUFqQjs7QUFFQSxXQUFLQyxLQUFMO0FBRUQ7QUFFRDs7Ozs7Ozs7Ozs7QUF2SkY7QUFBQTtBQUFBLDRCQWlLa0I7QUFBQTs7QUFFZDtBQUNBLFVBQU1DLEtBQUssR0FBR0gsSUFBSSxDQUFDQyxHQUFMLEtBQWEsS0FBS0YsU0FBaEMsQ0FIYyxDQUtkOzs7QUFDQSxVQUFJSSxLQUFLLEdBQUcsS0FBS0MsU0FBakIsRUFBNEIsTUFBTSxJQUFJQyxLQUFKLENBQVUsdURBQVYsQ0FBTixDQU5kLENBUWQ7O0FBQ0EsV0FBS04sU0FBTCxJQUFrQixLQUFLSyxTQUF2QjtBQUNBLFdBQUtOLFlBQUwsSUFBcUIsS0FBS00sU0FBMUI7QUFFQSxXQUFLRSxLQUFMLENBQVdDLEtBQVgsR0FaYyxDQWNkOztBQUNBLFVBQUksS0FBS1QsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUUxQixhQUFLVSxJQUFMO0FBRUE7QUFFRCxPQXJCYSxDQXVCZDtBQUNBOzs7QUFDQSxXQUFLQyxNQUFMLEdBQWNDLFVBQVUsQ0FBQyxZQUFNO0FBRTdCLFFBQUEsS0FBSSxDQUFDUixLQUFMO0FBRUQsT0FKdUIsRUFJckJTLElBQUksQ0FBQ0MsR0FBTCxDQUFTLENBQVQsRUFBWSxLQUFLUixTQUFMLEdBQWlCRCxLQUE3QixDQUpxQixDQUF4QjtBQU1EO0FBRUQ7Ozs7Ozs7Ozs7OztBQWxNRjtBQUFBO0FBQUEsMEJBNk1RVSxNQTdNUixFQTZNeUI7QUFFckJDLE1BQUFBLFlBQVksQ0FBQyxLQUFLTCxNQUFOLENBQVo7QUFFQSxXQUFLTSxPQUFMLENBQWFDLFFBQWIsQ0FBc0I7QUFBRXRCLFFBQUFBLFNBQVMsRUFBRSxLQUFLRyxVQUFsQjtBQUE4Qm9CLFFBQUFBLFdBQVcsRUFBRSxLQUFLbkIsWUFBaEQ7QUFBOERlLFFBQUFBLE1BQU0sRUFBRUE7QUFBdEUsT0FBdEI7QUFFRDtBQUVEOzs7Ozs7O0FBck5GO0FBQUE7QUFBQSw2QkEyTlc7QUFFUCxXQUFLZCxTQUFMLEdBQWlCQyxJQUFJLENBQUNDLEdBQUwsRUFBakI7O0FBRUEsV0FBS0MsS0FBTDs7QUFFQSxXQUFLZ0IsUUFBTCxDQUFjRixRQUFkLENBQXVCO0FBQUV0QixRQUFBQSxTQUFTLEVBQUUsS0FBS0csVUFBbEI7QUFBOEJvQixRQUFBQSxXQUFXLEVBQUUsS0FBS25CO0FBQWhELE9BQXZCO0FBRUQ7QUFFRDs7Ozs7Ozs7OztBQXJPRjtBQUFBO0FBQUEseUJBOE9PZSxNQTlPUCxFQThPd0I7QUFFcEJDLE1BQUFBLFlBQVksQ0FBQyxLQUFLTCxNQUFOLENBQVo7QUFFQSxXQUFLQSxNQUFMLEdBQWMsSUFBZDtBQUVBLFdBQUtVLE1BQUwsQ0FBWUgsUUFBWixDQUFxQjtBQUFFdEIsUUFBQUEsU0FBUyxFQUFFLEtBQUtHLFVBQWxCO0FBQThCb0IsUUFBQUEsV0FBVyxFQUFFLEtBQUtuQixZQUFoRDtBQUE4RGUsUUFBQUEsTUFBTSxFQUFFQTtBQUF0RSxPQUFyQjtBQUVEO0FBdFBIO0FBQUE7QUFBQSx3QkE4RzRCO0FBQUUsYUFBTyxLQUFLZixZQUFaO0FBQTJCO0FBRXZEOzs7Ozs7QUFoSEY7QUFBQTtBQUFBLHdCQXFINEI7QUFBRSxhQUFPLEtBQUtzQixRQUFaO0FBQXVCO0FBRW5EOzs7Ozs7QUF2SEY7QUFBQTtBQUFBLHdCQTRINkI7QUFBRSxhQUFPLEtBQUtDLFNBQVo7QUFBd0I7QUFFckQ7Ozs7OztBQTlIRjtBQUFBO0FBQUEsd0JBbUkyQjtBQUFFLGFBQU8sS0FBS0MsT0FBWjtBQUFzQjtBQUVqRDs7Ozs7O0FBcklGO0FBQUE7QUFBQSx3QkEwSTJCO0FBQUUsYUFBTyxLQUFLQyxPQUFaO0FBQXNCO0FBMUluRDs7QUFBQTtBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG5pbXBvcnQgSHlwZXJnaWFudCBmcm9tICdoeXBlcmdpYW50JztcclxuXHJcbmltcG9ydCBjb252ZXJ0IGZyb20gJy4vdXRpbHMvY29udmVydCc7XHJcbmltcG9ydCBUYXNrTWFuYWdlciBmcm9tICcuL3Rhc2svVGFza01hbmFnZXInO1xyXG5cclxuLyoqXHJcbiAqIEhlYXJrZW4gaXMgYSBzZWxmLWFkanVzdGluZyBjb3VudGRvd24gdGltZXIgdGhhdCBjYW4gYmUgY29uZmlndXJlZCB0byBydW4gdGFza3Mgb24gYW4gaW50ZXJ2YWwgb3IganVzdCBvbmNlLlxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBIZWFya2VuIHtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHN0YXJ0IHRpbWUgb2YgdGhpcyBpbnN0YW5jZS5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3N0YXJ0VGltZTogYW55O1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY3VycmVudCB0aW1lIGxlZnQgb24gdGhlIHRpbWVyLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfY3VycmVudFRpbWU6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGFtb3VudCBvZiB0aW1lIGJldHdlZW4gdGlja3Mgb2YgdGhlIHRpbWVyLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICogXHJcbiAgICogQGRlZmF1bHQgMTAwMFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2ludGVydmFsOiBudW1iZXIgPSAxMDAwO1xyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHRoZSB0aW1lciBpcyBjb3VudGluZyBkb3duLCBpdCBjaGVja3MgdGhpcyB0byBtYWtlIHN1cmUgaXRzIHN0aWxsIGluIHN0ZXAuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKi9cclxuICBwcml2YXRlIF9leHBlY3RlZDogbnVtYmVyID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogQSByZWZlcmVuY2UgdG8gdGhlIHRhc2sgbWFuYWdlciBtb2R1bGUuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge1Rhc2tNYW5hZ2VyfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgdGFza3M6IFRhc2tNYW5hZ2VyID0gbmV3IFRhc2tNYW5hZ2VyKHRoaXMpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgaWQgb2YgdGhlIHNldFRpbWVvdXQgdGltZXIuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge3NldFRpbWVvdXR9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfdGltZXI6IGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHNpZ25hbCB0aGF0IGlzIGRpc3BhdGNoZWQgd2hlbiB0aGUgdGltZXIgaXMgcGF1c2VkLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtIeXBlcmdpYW50fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX29ucGF1c2U6IEh5cGVyZ2lhbnQgPSBuZXcgSHlwZXJnaWFudCgpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgc2lnbmFsIHRoYXQgaXMgZGlzcGF0Y2hlZCB3aGVuIHRoZSB0aW1lciBpcyByZXN1bWVkIGZyb20gYSBwYXVzZWQgc3RhdGUuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0h5cGVyZ2lhbnR9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfb25yZXN1bWU6IEh5cGVyZ2lhbnQgPSBuZXcgSHlwZXJnaWFudCgpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgc2lnbmFsIHRoYXQgaXMgZGlzcGF0Y2hlZCB3aGVuIHRoZSB0aW1lciBpcyBzdG9wcGVkLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtIeXBlcmdpYW50fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX29uc3RvcDogSHlwZXJnaWFudCA9IG5ldyBIeXBlcmdpYW50KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBzaWduYWwgdGhhdCBpcyBkaXNwYXRjaGVkIHdoZW4gYSB0YXNrIGlzIHJ1bi5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7SHlwZXJnaWFudH1cclxuICAgKi9cclxuICBwcml2YXRlIF9vbnRhc2s6IEh5cGVyZ2lhbnQgPSBuZXcgSHlwZXJnaWFudCgpO1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IHN0YXJ0VGltZSBUaGUgdGltZSB0aGF0IEhlYXJrZW4gd2lsbCBzdGFydCBjb3VudGluZyBkb3duIGZyb20uIFRoaXMgY2FuIGJlIGluIG1pbGxpc2Vjb25kcyBvciBhIHN0cmluZyBpbiBhICcwMDowMDowMCcgZm9ybWF0LlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHN0YXJ0VGltZTogKHN0cmluZyB8IG51bWJlcikpIHtcclxuXHJcbiAgICB0aGlzLl9zdGFydFRpbWUgPSBjb252ZXJ0KHN0YXJ0VGltZSk7XHJcblxyXG4gICAgdGhpcy5fY3VycmVudFRpbWUgPSB0aGlzLl9zdGFydFRpbWU7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgdGltZSBsZWZ0IG9uIHRoZSB0aW1lci5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIGdldCBjdXJyZW50VGltZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fY3VycmVudFRpbWU7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgb25wYXVzZSBzaWduYWwuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge0h5cGVyZ2lhbnR9XHJcbiAgICovXHJcbiAgZ2V0IG9ucGF1c2UoKTogSHlwZXJnaWFudCB7IHJldHVybiB0aGlzLl9vbnBhdXNlOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIG9ucmVzdW1lIHNpZ25hbC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7SHlwZXJnaWFudH1cclxuICAgKi9cclxuICBnZXQgb25yZXN1bWUoKTogSHlwZXJnaWFudCB7IHJldHVybiB0aGlzLl9vbnJlc3VtZTsgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBvbnN0b3Agc2lnbmFsLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtIeXBlcmdpYW50fVxyXG4gICAqL1xyXG4gIGdldCBvbnN0b3AoKTogSHlwZXJnaWFudCB7IHJldHVybiB0aGlzLl9vbnN0b3A7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgb250YXNrIHNpZ25hbC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7SHlwZXJnaWFudH1cclxuICAgKi9cclxuICBnZXQgb250YXNrKCk6IEh5cGVyZ2lhbnQgeyByZXR1cm4gdGhpcy5fb250YXNrOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgYGV4cGVjdGVkYCBwcm9wZXJ0eSBhbmQgYmVnaW4gdGhlIGBzZXRUaW1lb3V0YCBjb3VudGRvd24uXHJcbiAgICovXHJcbiAgc3RhcnQoKSB7XHJcblxyXG4gICAgdGhpcy5fZXhwZWN0ZWQgPSBEYXRlLm5vdygpO1xyXG5cclxuICAgIHRoaXMuX3RpY2soKTtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIEV2ZXJ5IHNlY29uZCBIZWFya2VuIHJ1bnMgYF90aWNrYCBhbmQgYmVnaW5zIGJ5IGNvcnJlY3RpbmcgaXRzZWxmIG9mIGFueSBkcmlmdFxyXG4gICogdGhhdCBtaWdodCBoYXZlIG9jY3VycmVkIGR1cmluZyBvcGVyYXRpb24uXHJcbiAgKiBcclxuICAqIEFmdGVyIGNvcnJlY3Rpb24sIEhlYXJrZW4gY2hlY2tzIHRvIHNlZSBpZiB0aGVyZSdzIGFueSB0YXNrcyB0aGF0IG5lZWQgdG8gYmVcclxuICAqIGFjY29tcGxpc2hlZCBhbmQgaWYgdGhlIHRhc2tzIGFyZSBzZXQgdG8gcmVwZWF0LCBIZWFya2VuIHVwZGF0ZXMgdGhlIHRhc2tzIHRvXHJcbiAgKiB0aGVpciBuZXcgcnVuIGF0IHZhbHVlcy5cclxuICAqIFxyXG4gICogQHByaXZhdGVcclxuICAqL1xyXG4gIHByaXZhdGUgX3RpY2soKSB7XHJcblxyXG4gICAgLy8gQ2FsY3VsYXRlIGFueSBkcmlmdCB0aGF0IG1pZ2h0IGhhdmUgb2NjdXJlZC5cclxuICAgIGNvbnN0IGRyaWZ0ID0gRGF0ZS5ub3coKSAtIHRoaXMuX2V4cGVjdGVkO1xyXG5cclxuICAgIC8vIFdvYWgsIHRoZSBkcmlmdCBpcyBsYXJnZXIgdGhhbiB0aGUgSGVhcmtlbiB0aW1lcidzIGludGVydmFsIHdlIGhhdmUgdG8gYWJhbmRvbiBzaGlwLlxyXG4gICAgaWYgKGRyaWZ0ID4gdGhpcy5faW50ZXJ2YWwpIHRocm93IG5ldyBFcnJvcignVGhlIHRpbWVyIGhhcyBlbmNvdW50ZXJlZCBhbiBlcnJvciBhbmQgY2Fubm90IHJlY292ZXInKTtcclxuXHJcbiAgICAvLyBBZGp1c3QgdGhlIEhlYXJrZW4gdGltZXIncyBwcm9wZXJ0aWVzIHRvIGFjY291bnQgZm9yIHRoZSBkcmlmdC5cclxuICAgIHRoaXMuX2V4cGVjdGVkICs9IHRoaXMuX2ludGVydmFsO1xyXG4gICAgdGhpcy5fY3VycmVudFRpbWUgLT0gdGhpcy5faW50ZXJ2YWw7XHJcblxyXG4gICAgdGhpcy50YXNrcy5jaGVjaygpO1xyXG5cclxuICAgIC8vIFRoZSBIZWFya2VuIHRpbWVyIGlzIHVwIG5vIG5lZWQgdG8gdGljayBhbnltb3JlLlxyXG4gICAgaWYgKHRoaXMuX2N1cnJlbnRUaW1lID09IDApIHtcclxuXHJcbiAgICAgIHRoaXMuc3RvcCgpO1xyXG5cclxuICAgICAgcmV0dXJuO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLyBDYWxsIGBzZXRUaW1lb3V0YCBhZ2FpbiB0byBrZWVwIHRoZSBIZWFya2VuIHRpbWVyIHRpY2tpbmdcclxuICAgIC8vIGFjY291bnRpbmcgZm9yIHRoZSBkcmlmdC5cclxuICAgIHRoaXMuX3RpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICB0aGlzLl90aWNrKCk7XHJcblxyXG4gICAgfSwgTWF0aC5tYXgoMCwgdGhpcy5faW50ZXJ2YWwgLSBkcmlmdCkpO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbHQgdGhlIG9wZXJhdGlvbiBvZiB0aGUgSGVhcmtlbiB0aW1lciB1bnRpbCBgcmVzdW1lYCBpcyBjYWxsZWQuXHJcbiAgICogXHJcbiAgICogVGhlIHByb3BlcnRpZXMgb2YgdGhlIEhlYXJrZW4gdGltZXIgd2lsbCBiZSBzYXZlZCBzbyB0aGF0IHRoZSB0aW1lciBjYW4gcmVzdW1lIGxpa2UgaXQgd2FzXHJcbiAgICogbmV2ZXIgcGF1c2VkLlxyXG4gICAqIFxyXG4gICAqIFRoaXMgd2lsbCBhbHNvIGVtaXQgYSBwYXVzZSBldmVudCB3aXRoIHRoZSBIZWFya2VuIHRpbWVyJ3MgcHJvcGVydGllcyBhbmQgdGhlIHJlYXNvbiBmb3IgdGhlXHJcbiAgICogdGltZXIgYmVpbmcgcGF1c2VkLCBpZiBhbnkuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtyZWFzb25dIEEgcmVhc29uIGFzIHRvIHdoeSB0aGUgSGVhcmtlbiB0aW1lciB3YXMgcGF1c2VkLlxyXG4gICAqL1xyXG4gIHBhdXNlKHJlYXNvbj86IHN0cmluZykge1xyXG5cclxuICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lcik7XHJcblxyXG4gICAgdGhpcy5vbnBhdXNlLmRpc3BhdGNoKHsgc3RhcnRUaW1lOiB0aGlzLl9zdGFydFRpbWUsIGN1cnJlbnRUaW1lOiB0aGlzLl9jdXJyZW50VGltZSwgcmVhc29uOiByZWFzb24gfSk7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29udGludWUgdGhlIG9wZXJhdGlvbiBvZiB0aGUgSGVhcmtlbiB0aW1lciBmcm9tIGEgcGF1c2VkIHN0YXRlLlxyXG4gICAqIFxyXG4gICAqIFRoZSBIZWFya2VuIHRpbWVyIHdpbGwgcmVzdW1lIGZyb20gd2hlbiBpdCB3YXMgcGF1c2VkIGxpa2UgaXQgd2FzIG5ldmVyIHBhdXNlZCBpblxyXG4gICAqIHRoZSBmaXJzdCBwbGFjZS5cclxuICAgKi9cclxuICByZXN1bWUoKSB7XHJcblxyXG4gICAgdGhpcy5fZXhwZWN0ZWQgPSBEYXRlLm5vdygpO1xyXG5cclxuICAgIHRoaXMuX3RpY2soKTtcclxuXHJcbiAgICB0aGlzLm9ucmVzdW1lLmRpc3BhdGNoKHsgc3RhcnRUaW1lOiB0aGlzLl9zdGFydFRpbWUsIGN1cnJlbnRUaW1lOiB0aGlzLl9jdXJyZW50VGltZSB9KTtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdG9wIHRoZSBvcGVyYXRpb24gb2YgdGhlIEhlYXJrZW4gdGltZXIgYW5kIHNldCBhbGwgcHJvcGVydGllcyBiYWNrIHRvIHRoZWlyIG9yaWdpbmFsXHJcbiAgICogdmFsdWVzLlxyXG4gICAqIFxyXG4gICAqIFVzZSB0aGlzIG9ubHkgaWYgeW91J3JlIGRvbmUgd2l0aCB0aGlzIGluc3RhbmNlIG9mIHRoZSB0aW1lciBhbmQgd2FudCB0byBzdG9wXHJcbiAgICogaXQgYW5kIGVtaXQgdGhlIHN0b3AgZXZlbnQuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtyZWFzb25dIEEgcmVhc29uIGFzIHRvIHdoeSB0aGUgSGVhcmtlbiB0aW1lciB3YXMgcGF1c2VkLlxyXG4gICAqL1xyXG4gIHN0b3AocmVhc29uPzogc3RyaW5nKSB7XHJcblxyXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVyKTtcclxuXHJcbiAgICB0aGlzLl90aW1lciA9IG51bGw7XHJcblxyXG4gICAgdGhpcy5vbnN0b3AuZGlzcGF0Y2goeyBzdGFydFRpbWU6IHRoaXMuX3N0YXJ0VGltZSwgY3VycmVudFRpbWU6IHRoaXMuX2N1cnJlbnRUaW1lLCByZWFzb246IHJlYXNvbiB9KTtcclxuXHJcbiAgfVxyXG5cclxufTsiXX0=