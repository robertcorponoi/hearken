<p align="center">
  <img width="250" height="250" src="./hearken.png">
</p>

<h1 align="center">Hearken</h1>

<p align="center">Welcome to Hearken, a self-adjusting countdown timer capable of carrying out tasks. Hearken tasks can be added at any point during operation through a simple API and they can be set to run just once or on an interval.<p>

<div align="center">

[![NPM version](https://img.shields.io/npm/v/hearken.svg?style=flat)](https://www.npmjs.com/package/hearken)
[![Known Vulnerabilities](https://snyk.io/test/github/robertcorponoi/hearken/badge.svg)](https://snyk.io/test/github/robertcorponoi/hearken)
[![NPM downloads](https://img.shields.io/npm/dm/hearken.svg?style=flat)](https://www.npmjs.com/package/hearken)
<a href="https://badge.fury.io/js/hearken"><img src="https://img.shields.io/github/issues/robertcorponoi/hearken.svg" alt="issues" height="18"></a>
<a href="https://badge.fury.io/js/hearken"><img src="https://img.shields.io/github/license/robertcorponoi/hearken.svg" alt="license" height="18"></a>
[![Gitter](https://badges.gitter.im/gitterHQ/gitter.svg)](https://gitter.im/robertcorponoi)

</div>

## **Installation**

To install this module through npm, simply use the following command:

```
$ npm install --save hearken
```

## **Basic Example**

To begin using Hearken in your application, require the module:

```js
const Hearken = require('hearken');
```

Then create a new instance of a Hearken timer and specify the time that it should start counting down from in one of two ways, either in milliseconds or in a string format like '00:00:05'.

```js
const hearken = new Hearken(15000);

// OR

const hearken = new Hearken('00:00:15');
```

Finally, call the Hearken timer's `start` method to begin the timer's operation.

```js
hearken.start();
```

Check out the API below to learn all of the methods and events available for the Hearken timer.

## **API**

### **start**

The `start` method takes no parameters and is used to start the operation of the Hearken timer. Once this method is called,
the timer will begin counting down immediately without wait.

This means that if you set the timer to start at 15 seconds, the first tick will be 14 seconds not 15 seconds.

```js
hearken.start();
// Starts the countdown of the timer.
```

---

### **pause**

The `pause` method takes a single optional parameter which is the reason as to why the Hearken timer is being paused.

This reason will be emitted in the details when listening for the pause event.

| param  | type   | description                               | default |
|--------|--------|-------------------------------------------|---------|
| reason | string | An reason as to why the timer was paused. | null    |

```js
hearken.pause('Short break');
```

This method dispatches a signal which can be responded to like below:

```js
hearken.onpause.add(onHearkenPause);

function onHearkenPause(data) {
  // => { currentTime: 0000, elapsedTime: 0000, reason: 'Short break' }
  console.log(data);
}
```

---

### **resume**

The `resume` method takes no parameters and it is used for continuing the operation of the timer after it has been paused.

```js
hearken.resume();
```

This method emits an event which can be listened to like below:

```js
hearken.onresume.add(onHearkenResume);

function onHearkenResume(data) {
  // => { currentTime: 0000, elapsedTime: 0000 }
  console.log(data);
}
```

---

### **stop**

The `stop` method, like `pause` takes a single parameter which is the reason as to why the Hearken timer was stopped.

This reason will be emitted when listening for the stop event.

Note that Hearken automatically calls this method when the timer reaches 0.

| param  | type   | description                               | default |
|--------|--------|-------------------------------------------|---------|
| reason | string | An reason as to why the timer was paused. | null    |

```js
hearken.stop('No longer needed');
```

This method emits an event which can be listened to like below:

```js
hearken.onstop.add(onHearkenStop);

function onHearkenStop(data) {
  // => { currentTime: 0000, elapsedTime: 0000, reason: 'No longer needed' }
  console.log(data);
}
```

Also note that if you're listening to the stop event, it will emit when the timer reaches 0 with no reason.

---

## **Tasks**

Hearken exposes a tasks API that allows you to easily add and remove tasks from the Hearken timer.

Tasks will emit events that can be listened to when they are run.

A task event can be listened for like below:

```js
hearken.ontask.add(onHearkenTask);

function onHearkenTask(data) {
  // data contains the timer's start time, current time, and all of the task information.
  console.log(data);
}
```

### **tasks.add**

Add a new task to the Hearken timer. If the `repeat` parameter of the task is set to true, then Hearken will repeat this task every `time` seconds.

| param  | type     | description                                                                                                                             | default |
|--------|----------|-----------------------------------------------------------------------------------------------------------------------------------------|---------|
| name   | string   | A reference name for the task that will be used when a task event is emitted or if you would like to remove the task                    |         |
| time   | number   | The time at which Hearken will run the method related to this task. If this task is being repeated, it will be run every `time` seconds |         |
| fn     | Function | The method to run every time this task is set to run.                                                                                   |         |
| repeat | boolean  | Whether to run this task on an interval at every `time` seconds or just once                                                            | false   |

```js
// This will make the timer log 'Hello World!' to the timer every 2 seconds because repeat is set to true.
hearken.tasks.add('hw', 2000, hello, true);

function hello() {
  console.log('Hello World!');
}
```

---

### **tasks.remove**

Remove an existing task from the Hearken timer.

| param | type   | description                                                        | default |
|-------|--------|--------------------------------------------------------------------|---------|
| name  | string | The reference name of the task as defined when the task was added. |         |

```js
// Removes the task named 'hw'.
hearken.tasks.remove('hw');
```

---

### **tasks.clear**

Remove all tasks from the Hearken timer.

```js
hearken.tasks.clear();
```

---

## **License**

MIT