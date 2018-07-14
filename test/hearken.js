'use strict'

const assert = require('assert');
const Hearken = require('../index');
const sinon = require('../node_modules/sinon');

describe('Hearken', () => {

  describe('#constructor()', () => {

    it('should have a start time of 15000 with startTime in milliseconds', () => {
      const hearken = new Hearken('15000');

      assert.deepEqual(hearken.startTime, 15000);
    });

    it('should have a start time of 15000 with startTime in "00:00:15" format', () => {
      const hearken = new Hearken('00:00:15');

      assert.deepEqual(hearken.startTime, 15000);
    });

  });

  describe('#start()', () => {

    beforeEach(() => {
      this.clock = sinon.useFakeTimers();
    });

    afterEach(() => {
      this.clock.restore();
    });

    it('should have passed two seconds', () => {
      const hearken = new Hearken('15000');
      hearken.start();

      this.clock.tick(1000);

      assert.deepEqual(hearken.currentTime, 13000);
    });

  });

  describe('#onTick()', () => {

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

  describe('tasks', () => {

    describe('#addTask()', () => {

      it('should add a new task to the task queue', () => {
        let hearken = new Hearken('15000');

        hearken.addTask('test1', '2000', hello('World'), true);

        function hello(name) {
          return `Hello ${name}!`;
        }

        const result = hearken.tasks[0].fn;
        assert.deepEqual(result, 'Hello World!');
      });

    });

    describe('#removeTask()', () => {

      it('should remove task test1 from the task queue', () => {
        let hearken = new Hearken('15000');

        const pretestTasks = [
          {
            name: 'pretest1',
            time: '1000',
            fn: () => console.log('Testing')
          },
          {
            name: 'pretest2',
            time: '5000',
            fn: () => console.log('Testing2')
          }
        ];

        hearken.tasks = pretestTasks;

        hearken.addTask('test1', '2000', () => console.log('Hello World!'), true);
        hearken.removeTask('test1');

        assert.deepEqual(hearken.tasks, pretestTasks);
      });

    });

    describe('#clearTasks()', () => {

      it('should remove all tasks from the task queue', () => {
        let hearken = new Hearken('15000');

        const pretestTasks = [
          {
            name: 'pretest1',
            time: '1000',
            fn: () => console.log('Testing')
          },
          {
            name: 'pretest2',
            time: '5000',
            fn: () => console.log('Testing2')
          }
        ];

        hearken.tasks = pretestTasks;

        hearken.clearTasks();

        assert.deepEqual(hearken.tasks, []);
      });

    });

    describe('task event', () => {

      beforeEach(() => {
        this.clock = sinon.useFakeTimers();
      });

      afterEach(() => {
        this.clock.restore();
      });

      it('should emit an event for the task at 5 seconds left', () => {
        let hearken = new Hearken('10000');
        let spy = sinon.spy();

        hearken.addTask('test-task-1', '5000', () => console.log('Hello World!'));

        hearken.on('task', spy);

        hearken.start();

        this.clock.tick(4000);

        assert.deepEqual(spy.calledOnce, true);
      });

    });

  });

});