# Hearken

Hearken is a self-adjusting countdown timer that can be configured to run tasks either one time or on an interval. Tasks can be added to the timer at anytime through a simple API and the timer will automatically remove old tasks so you don't have to worry about that.

## **Installation**

Hearken is available through the NPM registry and you can install with simply:

```
$ npm install --save hearken
```

## **Basic Example**

Using Hearken in your project is simple and concise.

First, simple require the Hearken timer and create a new instance of the timer, providing the only required parameter which is a time to start counting down from.
The start time can be in milliseconds or in a '00:00:15' format. From there you just call the `start()` method to begin the countdown immediately.

Check out the API below to learn all of the methods available for the Hearken timer.

```js
const Hearken = require('hearken');

let hearken = new Hearken('15000');
hearken.start();
```

## **API**

- [`start`](#start())
- [`pause`](#pause(reason))
- [`resume`](#resume())
- [`stop`](#stop(reason))
- [`addTask`](#addTask(name,time,fn,repeat=false))
- [`removeTask`](#removeTask(name))
- [`clearTasks`](#clearTasks())

### **start()**

The start method takes no parameters and it is used to start the countdown of the timer. Once this method is called, the timer will begin counting down immediately without wait.

**Note**: If you pause the timer, do not use `start()` to resume it, use the `resume()` method instead.

```js
hearken.start();
// Starts the countdown of the timer.
```

---

### **pause(reason)**

| Property    | Description                                                | Type   | Default |
| ---------   | ---------------------------------------------------------- | ------ | ------- |
| reason      | An optional reason for pausing the timer.                  | string | null |

The pause method takes a single optional parameter and it is used to stop the operation of the timer temporairly.

Pause emits an event when called with the provided reason included.

```js
hearken.pause('Short break');
// The timer will pause until resumed with the reason of 'Short break';

hearken.on('pause', (data) => {
  console.log(data);
  // => { currentTime: { ms: '0000', time: '00:00:00' }, elapsedTime: { ms: '0000', time: '00:00:00' }, reason: 'Short break' }
});
```

---

## **resume()**

The resume method takes no parameters and it is used for continuing the operation of the timer after it has been paused.

Resume emits an event when called.

**Example**

```js
hearken.resume();
// The timer will continue from being paused until paused again, stopped, or it reaches 0.

hearken.on('resume', (data) => {
  // => { currentTime: { ms: '0000', time: '00:00:00' }, elapsedTime: { ms: '0000', time: '00:00:00' } }
});
```

---

## **stop(reason)**

| Property    | Description                                                | Type   | Default |
| ---------   | ---------------------------------------------------------- | ------ | ------- |
| reason      | An optional reason for stopping the timer.                  | string | null |

The stop method takes a single optional parameter and it is used to end the timer. This method resets the timer and all properties, including tasks, are lost so only use `stop()` if you're absolutely done with the current Hearken timer instance.

Stop emits an event when called with the provided reason included.

**Example**

```js
hearken.stop('No longer needed');
// Stops the timer immediately with the reason of 'No longer needed'.

hearken.on('stop', (data) => {
  console.log(data);
  // => { currentTime: { ms: '0000', time: '00:00:00' }, elapsedTime: { ms: '0000', time: '00:00:00' }, reason: 'No longer needed' }
});
```

---

## **addTask(name,time,fn,repeat=false)**

| Property    | Description                                                | Type   | Default |
| ---------   | ---------------------------------------------------------- | ------ | ------- |
| name      | A reference name that will be used by Hearken to identify the task. This will also be the name used if you want to delete the task manually at any point.                  | string | none (required) |
| time | The time to run the task at. If repeat is set to true, the task will run every [time] seconds. | string | none (required) |
| fn | The method to associate with the task. | Function | none (required) |
| repeat | Whether to repeat the task every [time] seconds. | boolean | false |

The addTask method creates a new job for the timer to perform either one time or at an interval if the repeat property is set to true.

**Example**:

```js
hearken.addTask('task1', '2000', hello('John'), true);
// This will make the timer log 'Hello John!' to the timer every 2 seconds because repeat is set to true.

function hello(name) {
  console.log(`Hello ${name}!`);
}
```

---

## **removeTask(name)**

| Property    | Description                                                | Type   | Default |
| ---------   | ---------------------------------------------------------- | ------ | ------- |
| name      | The name of the task to be deleted. This is the name that was set when the task was added to the timer.                  | string | null |

The removeTask method takes a single parameter which is the name of the task to be deleted. This has to be the same name that was used when the task was first added.

**Example**

```js
hearken.removeTask('task1');
// Removes the task named 'task1'.
```

---

## **clearTasks()**

The clearTasks method takes no parameters and it simply clears the task list so there are no jobs for the timer to perform.

**Example**

```js
hearken.clearTasks();
// Removes all tasks from the instance of the Hearken timer.
```

---

## **Task Events**

When a task is performed by the Hearken timer, an event is fired with the details about the time and the task that was just performed.

```js
hearken.on('event', (data) => {
  console.log(data);
  // => { currentTime: { ms: '0000', time: '00:00:00' }, elapsedTime: { ms: '0000', time: '00:00:00' }, event: { name: 'test', time: 2000, fn: [Function fn], repeat: true })}
});
```

---

## **License**

[MIT](LICENSE.md).