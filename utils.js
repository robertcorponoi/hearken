"use strict"

module.exports = {
    /**
     * Takes a time in milliseconds and converts it to a time string format.
     * @private
     * @param {string} ms - The time to convert in milliseconds.
     * @returns {string}
     */
    msToTime (ms) {
        this.checkTypes(["string"], arguments);

        let hh = Math.floor(((ms / 1000) / 3600));
        let mm = Math.floor((((ms / 1000) / 60) % 60));
        let ss = Math.floor(((ms / 1000) % 60));

        return `${this.padTime(hh)}:${this.padTime(mm)}:${this.padTime(ss)}`;
    },

    /**
     * Takes a time in string format and converts it to milliseconds.
     * @private
     * @param {string} time - The time to convert in a string format.
     * @returns {string}
     */
    timeToMs (time) {
        this.checkTypes(["string"], arguments)
        if (time.indexOf(":") == -1) return time;

        let hhIndex = time.indexOf(":");
        let mmIndex = time.indexOf(":", hhIndex + 1);
        let ssIndex = time.indexOf(":", mmIndex);

        let hh = time.slice(0, hhIndex);
        let mm = time.slice(hhIndex + 1, ssIndex);
        let ss = time.slice(ssIndex + 1);

        hh *= (3.6 * (10 ** 6));
        mm *= 60000;
        ss *= 1000;

        let ms = (hh + mm + ss).toString();

        return ms
    },

    /**
     * Add a leading zero to a time unit if it is below 10.
     * @private
     * @param {number} time - An integer provided by converting milliseconds to different formats.
     * @returns {string}
     */
    padTime (time) {
        if (time < 10) {
            return `0${time}`;
        }
        return `${time}`;
    },

    /**
     * Almost all timer events have the same basic pieces of information so we build them here.
     * @private
     * @param {string} startTime - The time in ms that the timer started.
     * @param {string} currentTime - The time in ms when the event is hit.
     * @param {string} [other=null] - Some events emit extra information, this option is for that information.
     * @returns {Object}
     */
    buildEvent (startTime, currentTime = 0, other = { name: null, value: null, }) {
        let elapsedTime = (startTime - currentTime);

        let event = {
            currentTime: {
                ms: currentTime.toString(),
                time: this.msToTime(currentTime.toString())
            },
            elapsedTime: {
                ms: elapsedTime.toString(),
                time: this.msToTime(elapsedTime.toString())
            }
        };

        if (other.name) event[other.name] = other.value;

        return event;
    },

    /**
     * Get the exact type of a provided value.
     * @private
     * @param {*} value - The input to get the type of.
     * @returns {string}
     */
    getType (value) {
        return Object.prototype.toString.call(value).replace(/^\[object |\]$/g, "").toLowerCase();
    },

    /**
     * Validate the types given to the function against the types they are supposed to be.
     * @private
     * @param {Array} expected - The types the function expects.
     * @param {Array} args - The arguments provided to the function.
     */
    checkTypes (expected, args) {
        for (let i = 0, len = expected.length; i < len; ++i) {
            let expectedVal = expected[i];
            let actualVal = this.getType(args[i]);

            if (expectedVal != actualVal) throw new TypeError(`Expected: ${expectedVal}; Received: ${actualVal}`);
        }
    },

    /**
     * Used to sort tasks by comparing times and order.
     * @private
     * @param {Object} a
     * @param {Object} b
     * @returns {number}
     */
    compare (a, b) {
        if (a.runAt < b.runAt) return -1;
        if (a.runAt > b.runAt) return 1;

        if (a.runAt == b.runAt) {
            if (a.order < b.order) return -1;
            if (a.order > b.order) return 1;
        }

        return 0;
    },
}