"use strict"

const assert = require("assert");
const Hearken = require("../index");

describe("Hearken Timer", function () {
    describe("#constructor()", function () {
        let options = {};

        it("should have a startTime of '15000'", function () {
            options.startTime = "15000";
            let hearken = new Hearken(options);

            assert(hearken.startTime, "15000");
        });

        it("should have a startTime of '934000'", function () {
            options.startTime = "00:15:34";
            let hearken = new Hearken(options);

            assert(hearken.startTime, "934000");
        });

        it("should have a startTime of '843795000'", function () {
            options.startTime = "234:23:15";
            let hearken = new Hearken(options);

            assert(hearken.startTime, "843795000");
        });
    });

    describe("#start()", function () {
        let options = {
            startTime: "15000",
            tasks: [
                {
                    name: "hello",
                    time: "2000",
                    repeat: true,
                    fn: () => console.log("hello"),
                },
            ]
        };

        let hearken = new Hearken(options);

        hearken.start();

        let currentTime = hearken.currentTime;
        let tasks = hearken.tasks;
        let fn = "[Function: fn]";
        tasks[0].fn = fn;

        hearken.stop();

        it("should equal 15000", function (done) {
            assert.strictEqual(currentTime, 14000);
            done();
        });

        it("should equal a task object", function (done) {
            let expected = [
                {
                    name: 'hello',
                    time: '2000',
                    repeat: true,
                    fn: "[Function: fn]",
                    runAt: '13000'
                }
            ]
            assert.deepStrictEqual(tasks, expected);
            done();
        });
    });

    describe("#addTask()", function () {
        let options = {
            startTime: "15000",
            tasks: [
                {
                    name: "hello",
                    time: "2000",
                    repeat: true,
                    fn: () => console.log("hello"),
                },
                {
                    name: "add",
                    time: "7000",
                    fn: () => console.log(3 + 5),
                },
            ]
        };

        let hearken = new Hearken(options);
        hearken.currentTime = "14000";
        hearken.addTask(options.tasks);
        let tasks = hearken.tasks;
        
        it("should have a name of add", function () {
            assert(hearken.tasks[0].name, "add");
        });
    });
});