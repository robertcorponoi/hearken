# Hearken

This documentation is split into the following sections and subsections:

- [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Options](#options)
    - [Example](#basic-example)

- [Properties](#properties)
- [Methods](#methods)
    - [Timer](#timer)
    - [Tasks](#tasks)

- [Events](#events)

## **Getting Started**

### **Installation**

The first step to including the Hearken timer in any of your projects is to install it via:
```js
$ npm install --save hearken
```

After successfuly installing Hearken, choose where you would like to initialize it and at the top of the file place:

```js
const Hearken = require("hearken");
```

### **Options**

Before you can make an instance of a new Hearken timer, you have to specify an options object with, at the very minimum, a time for the timer to start counting down from.

The available options are:

| Property  | Description                                              | Type  | Default | Required |
| --------- | -------------------------------------------------------- | ----- | ------- | -------- |
| startTime | The time that the timer should begin counting down from. | Mixed | 0       | true     |
| tasks     | Tasks that the timer should complete during operation.   | Array | []      | false    |

Tasks consists of an array of objects that tells the timer what tasks to do during its operation. These tasks can be run at intervals (ex. every 2 seconds) or just at one time (at 5 seconds left). While you can add tasks to the timer at any time, you can define a set of tasks at initialization with the following options:

| Property  | Description                                              | Type     |
| --------- | -------------------------------------------------------- | -------- |
| name      | Any name that will be used to reference the task.        | string   |
| time      | The time on the timer the task will run, if repeat is true, it will run every {time} seconds.   | Mixed  |
| repeat    | (optional) Whether the task will run at an interval or just once.   | Boolean  |
| fn        | Tasks that the timer should complete during operation.   | Function    |

### **Basic Example**

A visual example is always best so a simple initialization of a Hearken timer with tasks looks like below:

```js
const Hearken = require("hearken");

const options = {
    startTime: "15000",             // Time can be input as milliseconds or as HH:MM:SS so in our case it would be "00:00:15".
    tasks: [
        {
            name: "hello",          // Name to reference to the task.
            time: "2000",           // Just as with the start time, it can also be "00:00:02".
            repeat: true,           // If repeat is set to true, the task will run at an interval instead of just once. So in this case it would run every 2 seconds.
            fn: () => hello("Bob"), // The task to run, either a function in the block or a reference to a function (which must be wrapped in an anonymous function as shown).
        },
        {
            name: "add",
            time: "7000",           // Repeat option is not set so the task will run just once at 7 seconds.
            fn: () => add(),
        },
    ]
};

let hearken = new Hearken(options);
hearken.start();

function hello(name) {
    return `Hello ${name}!`;
}

function add() {
    return (3 + 5);
}
```

**Note on Times**: As shown above, times can be passed in three different ways, either by specifying a millisecond time directly (```15000``` or ```"15000"```), a time string (```"00:00:15"```), or a shorthand notation (```"15s"```).

**Note on Functions**: When passing in tasks, the function you pass in must always have an anonymous function wrapper like ```() => function()```. This prevents the function from running right away and correctly passes it to the timer. If you forget to do this, an error will be thrown.

What this basic example will do is start a Hearken timer at 15 seconds. Since the ```hello()``` function is set to repeat every 2 seconds, it will run at 13 seconds, 11 seconds, 9 seconds, 7 seconds, 5 seconds, 3 seconds, and 1 second left. This ```add()``` function will run once at 7 seconds and then be removed from the task list.

## **Properties**

The following properties of the Hearken timer are available anytime after initialization:

| Property    | Description                                                | Type   |
| ---------   | ---------------------------------------------------------- | ------ |
| startTime   | The initial time that the timer started counting down from | string |
| currentTime | The time on the timer when this is invoked.                | string |
| tasks       | The current task list on the timer.                        | Array  |

In relation to the example provided under the [Getting Started - Basic Example](#basic-example) section, the properties would look like:

```js
let startTime = hearken.startTime       // "15000".

let currentTime = hearken.currentTime   // Depends when invoked, anywhere from "15000" down to "0".

let tasks = hearken.tasks               // [{ name: "hello", time: "2000", repeat: true, fn: [Function] }, { name: "add", time: "7000", fn: [Function] }].
```

**Note on Properties**: Because these properties are initialized when the timer is started, you can use these in your options object when initializing the class. This means that you can use ```hearken.currentTime``` as a parameter for a task if desired.

## **Methods**

The following are methods of Hearken that are available to use after initiaizing an instance of the class.

## **Timer**

Time base timer contains the following methods:

- [```start()```](#start())
- [```pause(reason)```](#pause(reason))
- [```resume()```](#resume())
- [```stop(reason)```](#stop(reason))

## **start()**

Start has no parameters and it is used to start the countdown of the timer. Once this method is called, the timer will begin immediately without wait. 

**Note**: If you pause the timer, do not use ```start()``` to resume it, use ```resume()``` instead.

## **pause(reason)**

| Property    | Description                                                | Type   | Default |
| ---------   | ---------------------------------------------------------- | ------ | ------- |
| reason      | An optional reason for pausing the timer.                  | string | null |

Pause takes a reason as an optional parameter and it's used if you need to temporaily stop operation of the timer.

## **resume()**

Resume has no parameters and is only used for starting a timer again after it has been paused.

## **stop(reason)**

| Property    | Description                                                | Type   | Default |
| ---------   | ---------------------------------------------------------- | ------ | ------- |
| reason      | An optional reason for stopping the timer.                  | string | null |

Stop takes a reason as an optional parameter and is used to end the timer. This resets the timer and all properties are lost so only use this method if you're absolutely done with the timer.

## **Tasks**

While tasks are part of the timer, for documentation purposes it is easier to record them seperately:

- [```addTask([Tasks])```](#addTask([Tasks]))
- [```removeTask(name)```](#removeTask(name))
- [```clearTasks()```](#clearTasks())
- [```getTasks()```](#getTasks())

## **addTask([Tasks])**

Adds an array of one or more objects of tasks to the timer.

| Property    | Description                                                | Type   |
| ---------   | ---------------------------------------------------------- | ------ |
| task      | The task object                  | Object |
| task[name] | A unique name for the task used for reference. | string |
| task[time] | The time on the timer that the task should run. | Mixed |
| task[repeat] | Whether to repeat the task on an interval. When this is true, the task runs every {task[time]} instead of at  a specific time. | boolean
| task[fn] | The function to run when the task comes up. | Function |

An example of a task Array is shown below:

```js
let tasks: [
    {
        name: "hello", // Whatever you want, this is used as a reference for deleting tasks.
        time: "2000",  // Can also be: "00:00:02" or "2s".
        repeat: true,  // Since repeat is set to true, the task will now run every 2 seconds instead of just once at 2 seconds left.
        fn: () => hello("Bob"), // The task (function) to run.
    },
    {
        name: "add",
        time: "00:00:07",
        fn: () => add(),
    },
]

hearken.addTasks(tasks);
```

## **removeTask(name)**

| Property    | Description                                                | Type   |
| ---------   | ---------------------------------------------------------- | ------ |
| name      | The reference name of the task                  | string |

Removes a task by its name from the task list. This is automatically used internally when a task is set to run only once.

## **clearTasks()**

Clears all tasks from the task list.

## **getTasks()**

Returns all tasks currently on the task list. The returned format is as shown below:

```js
[
    {
        name: "hello world" // task name.
        time: "8000"        // time set for task to run.
        repeat: false       // whether or not the task is run on an interval.
        fn: [Function]      // The function that is assigned to the task.
    },
    {
        // More task objects...
    }
]
```

## **Events**

Almost every action of the timer returns an event so you can have even more control. Below is a list of all returned events:

- [**Pause(reason)**](#pause(reason)-event)
- [**Resume()**](#resume()-event)
- [**Stop(reason)**](#stop(reason)-event)
- [**AddTask([tasks])**](#addtask([tasks])-event)
- [**RemoveTask(name)**](#removetask(name)-event)
- [**ClearTasks()**](#cleartasks()-event)

### **Pause(reason) Event**

```js
hearken.on("pause", function (data) {
    // Your code.
});
```

The pause data object contains:

```js
{
    currentTime: {
        ms:   "1000",           // The current time left on the timer in milliseconds.
        time: "00:00:01",       // The current time left on the timer in a string format.
    },
    elapsedTime: {
        ms:   "4000",           // The elapsed time so far in milliseconds.
        time: "00:00:04",       // The elapsed time so far in a string format.
    },
    reason: "Just because.",    // The reason the timer was paused (if one was provided).
}
```

### **Resume() Event**

```js
hearken.on("resume", function (data) {
    // Your code.
});
```

While the resume data object isn't different than the pause one, you might want to do something different when resuming over pausing.

```js
{
    currentTime: {
        ms:   "1000",           // The current time left on the timer in milliseconds.
        time: "00:00:01",       // The current time left on the timer in a string format.
    },
    elapsedTime: {
        ms:   "4000",           // The elapsed time so far in milliseconds.
        time: "00:00:04",       // The elapsed time so far in a string format.
    },
}
```

### **Stop(reason) Event**

The stop event is fired whenever the timer is manually stopped or when it has reached 0.

```js
hearken.on("stop", function (data) {
    // Your code.
});
```

The stop data object is as follows:

```js
{
    currentTime: {
        ms:   "0",              // The current time left on the timer in milliseconds.
        time: "00:00:00",       // The current time left on the timer in a string format.
    },
    elapsedTime: {
        ms:   "15000",          // The elapsed time so far in milliseconds.
        time: "00:00:15",       // The elapsed time so far in a string format.
    },
    reason: "I'm tired."        // The reason the timer was stopped (if stopped manually).
}
```

### **AddTask([tasks]) Event**

```js
hearken.on("taskAdded", function (data) {
    // Your code.
});
```

The taskAdded data object is as follows:

```js
{
    currentTime: {
        ms:   "0",              // The current time left on the timer in milliseconds.
        time: "00:00:00",       // The current time left on the timer in a string format.
    },
    elapsedTime: {
        ms:   "15000",          // The elapsed time so far in milliseconds.
        time: "00:00:15",       // The elapsed time so far in a string format.
    },
    tasks: [{}]                 // The current list of tasks associated with the timer.
}
```

### **RemoveTask(name) Event**

```js
hearken.on("taskRemoved", function (data) {
    // Your code.
});
```

The taskRemoved data object is as follows:

```js
{
    currentTime: {
        ms:   "0",              // The current time left on the timer in milliseconds.
        time: "00:00:00",       // The current time left on the timer in a string format.
    },
    elapsedTime: {
        ms:   "15000",          // The elapsed time so far in milliseconds.
        time: "00:00:15",       // The elapsed time so far in a string format.
    },
    tasks: [{}],                // The current list of tasks associated with the timer.
}
```

### **ClearTasks() Event**

```js
hearken.on("tasksCleared", function (data) {
    // Your code.
});
```

The tasksCleared data object is as follows:

```js
{
    currentTime: {
        ms:   "0",              // The current time left on the timer in milliseconds.
        time: "00:00:00",       // The current time left on the timer in a string format.
    },
    elapsedTime: {
        ms:   "15000",          // The elapsed time so far in milliseconds.
        time: "00:00:15",       // The elapsed time so far in a string format.
    },
    tasks: [{}]                 // All of the tasks that were cleared.
}
```