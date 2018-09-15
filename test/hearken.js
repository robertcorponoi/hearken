'use strict'

const assert = require('assert');
const sinon = require('../node_modules/sinon');
const Hearken = require('../index');

// Test the functionality of the of the core Hearken timer.
describe('Hearken', () => {

  // Make sure that when a Hearken timer is initialized, the
  // `startTime` is correctly normalized.
  describe('Initialization', () => {

    // Case 3: User provides a start time in milliseconds.
    it('should have a start time of 15000 with startTime in milliseconds', () => {
      const hearken = new Hearken(15000);

      assert.deepEqual(hearken.startTime, 15000);
    });

    // Case 2: User provides a start time in milliseconds as a string.
    it('should have a start time of 15000 with startTime in milliseconds as a string', () => {
      const hearken = new Hearken('15000');

      assert.deepEqual(hearken.startTime, 15000);
    });

    // Case 3: User provides a start time in a string format.
    it('should have a start time of 15000 with startTime in "00:00:15" format', () => {
      const hearken = new Hearken('00:00:15');

      assert.deepEqual(hearken.startTime, 15000);
    });

  });

  // Make sure that when a Hearken timer is started, the ticking
  // also begins.
  describe('#start()', () => {

    beforeEach(() => {
      this.clock = sinon.useFakeTimers();
    });

    afterEach(() => {
      this.clock.restore();
    });

    // Check if two seconds have passed using Sinon's fake timers.
    it('should have passed two seconds', () => {
      const hearken = new Hearken('15000');
      hearken.start();

      this.clock.tick(1000);

      assert.deepEqual(hearken.currentTime, 13000);
    });

  });

  // Every interval of the Hearken timer the current time on the
  // Hearken timer should go down.
  describe('#_tick()', () => {

    beforeEach(() => {
      this.clock = sinon.useFakeTimers();
    });

    afterEach(() => {
      this.clock.restore();
    });

    it('should have passed 8 seconds', () => {
      const hearken = new Hearken('15000');
      hearken.start();

      this.clock.tick(7000);

      assert.deepEqual(hearken.currentTime, 7000);
    });

  });

  // When the Hearken timer is paused it should emit an event.
  describe('#pause()', () => {

    beforeEach(() => {
      this.clock = sinon.useFakeTimers();
    });

    afterEach(() => {
      this.clock.restore();
    });

    it('should pause the timer at 12 seconds', () => {
      const hearken = new Hearken('15000');
      hearken.start();

      this.clock.tick(2000);

      hearken.pause();

      this.clock.tick(5000);

      assert.deepEqual(hearken.currentTime, 12000);
    });

    it('should emit an event on pause', () => {
      let spy = sinon.spy();

      const hearken = new Hearken('15000');

      hearken.on('pause', spy);

      hearken.start();

      this.clock.tick(2000);

      hearken.pause();

      assert(spy.calledOnce, true);
    });

  });

  // When the Hearken timer is resumed from being paused, it should
  // emit an event.
  describe('#resume()', () => {

    beforeEach(() => {
      this.clock = sinon.useFakeTimers();
    });

    afterEach(() => {
      this.clock.restore();
    });

    it('should resume the timer after being paused', () => {
      const hearken = new Hearken('15000');
      hearken.start();

      this.clock.tick(2000);

      hearken.pause();

      this.clock.tick(2000);

      hearken.resume();

      assert.deepEqual(hearken.currentTime, 11000);
    });

    it('should emit an event on resume', () => {
      let spy = sinon.spy();

      const hearken = new Hearken('15000');
      hearken.start();

      hearken.on('resume', spy);

      this.clock.tick(2000);

      hearken.pause();

      this.clock.tick(2000);

      hearken.resume();

      assert.deepEqual(spy.calledOnce, true);
    });

  });

  // When the Hearken timer is stopped, the timer should stop ticking
  // and and event should be emitted.
  describe('#stop()', () => {

    beforeEach(() => {
      this.clock = sinon.useFakeTimers();
    });

    afterEach(() => {
      this.clock.restore();
    });

    it('should stop the timer', () => {
      const hearken = new Hearken('15000');
      hearken.start();

      this.clock.tick(2000);

      hearken.stop();

      assert.deepEqual(hearken.timer, null);
    });

    it('should emit an event on stop', () => {
      let spy = sinon.spy();

      const hearken = new Hearken('15000');
      hearken.start();

      hearken.on('stop', spy);

      this.clock.tick(2000);

      hearken.stop();

      assert.deepEqual(spy.calledOnce, true);
    });

  });

  // Make sure Hearken's task system works including adding, removing, and
  // running tasks.
  describe('tasks', () => {

    describe('Add Task', () => {

      // Add a task to the Hearken timer.
      it('should add a new task to the task queue', () => {
        let hearken = new Hearken(15000);

        hearken.tasks.add('hw', 2000, hello, true);

        function hello() {
          return 'Hello World!';
        }

        let res;

        for (let task of hearken.tasks.tasks) {
          if (task.name === 'hw') {
            res = task.fn();
            break;
          }
        }

        assert.deepEqual(res, 'Hello World!');

      });

    });

    // Remove a task from Hearken.
    describe('Remove Task', () => {

      it('should remove task test1 from the task queue', () => {
        let hearken = new Hearken('15000');

        function hello() {
          return 'Hello World!'
        }

        function add() {
          return 2 + 5;
        }

        hearken.tasks.add('hello', 5000, hello).add('add', 1000, add);

        hearken.tasks.remove('add');

        assert.deepEqual(hearken.tasks.tasks.size, 1);
      });

    });

    // Remove all tasks from Hearken.
    describe('Clear All Tasks', () => {

      it('should remove all tasks', () => {
        let hearken = new Hearken('15000');

        function hello() {
          return 'Hello World!'
        }

        function add() {
          return 2 + 5;
        }

        hearken.tasks.add('hello', 5000, hello).add('add', 1000, add);

        hearken.tasks.clear();

        assert.deepEqual(hearken.tasks.tasks.size, 0);
      });

    });

    // Make sure that when a task is run, an event is emitted.
    describe('Task Event', () => {

      beforeEach(() => {
        this.clock = sinon.useFakeTimers();
      });

      afterEach(() => {
        this.clock.restore();
      });

      it('should emit an event for the task at 5 seconds left', () => {
        let hearken = new Hearken('10000');
        let spy = sinon.spy();

        function hello() {
          return 'Hello World!'
        }

        hearken.tasks.add('hello', 5000, hello);

        hearken.on('task', spy);

        hearken.start();

        this.clock.tick(4000);

        assert.deepEqual(spy.calledOnce, true);
      });

    });

  });

});