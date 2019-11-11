'use strict'

const chai = require('chai');
const sinon = require('sinon');
const Hearken = require('../index');

let hearken;
let clock;

describe('Converting times between string and millisecond format', () => {

  it('should take an input of 15000 and set the start time to 15000', () => {

    hearken = new Hearken(15000);

    chai.expect(hearken._startTime).to.equal(15000);

  });

  it('should take an input of `15000` as a string and set the start time to 15000', () => {

    hearken = new Hearken('15000');

    chai.expect(hearken._startTime).to.equal(15000);

  });

  it('should take a start time of `00:00:15` and set the start time to 15000', () => {

    hearken = new Hearken('00:00:15');

    chai.expect(hearken._startTime).to.equal(15000);

  });

});

describe('Starting the timer', () => {

  beforeEach(() => {

    hearken = new Hearken(15000);

    clock = sinon.useFakeTimers();

  });

  afterEach(() => {

    hearken = null;

    clock.restore();

  });

  it('should have started at 15000 and passed two seconds', () => {

    hearken.start();

    clock.tick(1000);

    chai.expect(hearken.currentTime).to.equal(13000);

  });

});

describe('Ticking the timer down', () => {

  beforeEach(() => {

    hearken = new Hearken(15000);

    clock = sinon.useFakeTimers();

  });

  afterEach(() => {

    hearken = null;

    clock.restore();

  });

  it('should have passed 8 seconds', () => {

    hearken.start();

    clock.tick(7000);

    chai.expect(hearken.currentTime).to.equal(7000);

  });

});

describe('Pausing the timer', () => {

  beforeEach(() => {

    hearken = new Hearken(15000);

    clock = sinon.useFakeTimers();

  });

  afterEach(() => {

    hearken = null;

    clock.restore();

  });

  it('should pause the timer at 12 seconds', () => {

    hearken.start();

    clock.tick(2000);

    hearken.pause();

    chai.expect(hearken.currentTime).to.equal(12000);

  });

  it('should emit an event on pause', () => {

    const spy = sinon.spy();

    hearken.onpause.add(spy);

    hearken.start();

    clock.tick(2000);

    hearken.pause();

    chai.expect(spy.calledOnce).to.be.true;

  })

});

describe('Resuming the timer from a paused state', () => {

  beforeEach(() => {

    hearken = new Hearken(15000);

    clock = sinon.useFakeTimers();

  });

  afterEach(() => {

    hearken = null;

    clock.restore();

  });

  it('should resume the timer after being paused', () => {

    hearken.start();

    clock.tick(2000);

    hearken.pause();

    clock.tick(2000);

    hearken.resume();

    chai.expect(hearken.currentTime).to.equal(11000);

  });

  it('should emit an event on resume', () => {

    const spy = sinon.spy();

    hearken.onresume.add(spy);

    hearken.start();

    clock.tick(2000);

    hearken.pause();

    clock.tick(2000);

    hearken.resume();

    chai.expect(spy.calledOnce).to.be.true;

  })

});

describe('Stopping the timer', () => {

  beforeEach(() => {

    hearken = new Hearken(15000);

    clock = sinon.useFakeTimers();

  });

  afterEach(() => {

    hearken = null;

    clock.restore();

  });

  it('should stop the timer', () => {

    hearken.start();

    clock.tick(2000);

    hearken.stop();

    chai.expect(hearken._timer).to.be.null;

  });

  it('should emit an event on stop', () => {

    const spy = sinon.spy();

    hearken.onstop.add(spy);

    hearken.start();

    clock.tick(2000);

    hearken.stop();

    chai.expect(spy.calledOnce).to.be.true;

  })

});

describe('Tasks', () => {

  beforeEach(() => {

    hearken = new Hearken(15000);

    clock = sinon.useFakeTimers();

  });

  afterEach(() => {

    hearken = null;

    clock.restore();

  });

  it('run a task on an interval', () => {

    function hello() {

      return 'Hello World!';

    }

    const spy = sinon.spy(hello);

    hearken.tasks.create('helloworld', 2000, spy, true);

    hearken.start();

    clock.tick(4000);

    chai.expect(spy.calledTwice).to.be.true;

  });

  it('run a task once', () => {

    function hello() {

      return 'Hello World!';

    }

    const spy = sinon.spy(hello);

    hearken.tasks.create('helloworld', 14000, spy);

    hearken.start();

    clock.tick(4000);

    chai.expect(spy.calledOnce).to.be.true;

  });

  it('emit an event when a task is run', () => {

    const spy = sinon.spy();

    function hello() {

      return 'Hello World!';

    }

    hearken.ontask.add(spy);

    hearken.tasks.create('helloworld', 14000, hello);

    hearken.start();

    clock.tick(4000);

    chai.expect(spy.calledOnce).to.be.true;

  });

  it('destroying a task', () => {

    function hello() {

      return 'Hello World!';

    }

    function hello2() {

      return 'Hello World!';

    }

    hearken.tasks.create('helloworld', 2000, hello).create('helloworld2', 1000, hello2);

    hearken.start();

    clock.tick(2000);

    hearken.tasks.destroy('helloworld2');

    chai.expect(hearken.tasks._tasks.length).to.equal(1);

  });

  it('destroying all tasks', () => {

    function hello() {

      return 'Hello World!';

    }

    function hello2() {

      return 'Hello World!';

    }

    hearken.tasks.create('helloworld', 2000, hello).create('helloworld2', 1000, hello2);

    hearken.start();

    clock.tick(2000);

    hearken.tasks.destroyAll();

    chai.expect(hearken.tasks._tasks.length).to.equal(0);

  });

});