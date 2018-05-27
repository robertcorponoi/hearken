"use strict"

const assert = require("assert");
const utils = require("../utils");

describe("Hearken Utilities", function () {
    describe("#msToTime()", function () {
        it("should equal 00:00:05", function () {
            assert.equal(utils.msToTime("5000"), "00:00:05");
        });

        it("should equal 00:00:45", function () {
            assert.equal(utils.msToTime("45000"), "00:00:45");
        });

        it("should equal 00:07:15", function () {
            assert.equal(utils.msToTime("435000"), "00:07:15");
        });

        it("should equal 00:23:05", function () {
            assert.equal(utils.msToTime("1385000"), "00:23:05");
        });

        it("should equal 03:15:23", function () {
            assert.equal(utils.msToTime("11723000"), "03:15:23");
        });

        it("should equal 15:07:25", function () {
            assert.equal(utils.msToTime("54445000"), "15:07:25");
        });
    });

    describe("#timeToMs()", function () {
        it("should equal 5000", function () {
            assert.equal(utils.timeToMs("00:00:05"), "5000");
        });

        it("should equal 45000", function () {
            assert.equal(utils.timeToMs("00:00:45"), "45000");
        });

        it("should equal 435000", function () {
            assert.equal(utils.timeToMs("00:07:15"), "435000");
        });

        it("should equal 1385000", function () {
            assert.equal(utils.timeToMs("00:23:05"), "1385000");
        });

        it("should equal 11723000", function () {
            assert.equal(utils.timeToMs("03:15:23"), "11723000");
        });

        it("should equal 54445000", function () {
            assert.equal(utils.timeToMs("15:07:25"), "54445000");
        });
    });

    describe("#padTime()", function () {
        it("should equal 05", function () {
            assert(utils.padTime(5), "05");
        });

        it("should equal 15", function () {
            assert(utils.padTime(15), "15");
        });
    });

    describe("#buildEvent()", function () {
        it("should return an object with a reason", function () {
            let expected = {
                currentTime: { ms: "12000", time: "00:00:12" },
                elapsedTime: { ms: "3000", time: "00:00:03" },
                reason: "Just because."
            };

            assert.deepEqual(utils.buildEvent("15000", "12000", { name: "reason", value: "Just because." } ), expected);
        });

        it("should return an object without a reason", function () {
            let expected = {
                currentTime: { ms: "12000", time: "00:00:12" },
                elapsedTime: { ms: "3000", time: "00:00:03" }
            };

            assert.deepEqual(utils.buildEvent("15000", "12000"), expected);
        });
    });

    describe("#getType()", function () {
        it("should equal number", function () {
            assert(utils.getType("5"), "number");
        });

        it("should equal array", function () {
            assert(utils.getType([]), "array");
        });
    });

    describe("#checkTypes()", function () {
        function checkTypes(expected, args) {
            if (expected != args) throw new Error("failed.");
        }
        assert.throws(function () { checkTypes("string", "number"); }, Error);
    });

    describe("#compare()", function () {
        it("should equal the expected output", function () {
            let input = [
                {
                    name: "one",
                    time: "2000",
                },
                {
                    name: "two",
                    time: "1000",
                }
            ]

            assert.deepEqual(input.sort(utils.compare), input);
        });
    });
});