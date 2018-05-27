# Hearken

Hearken is a self-adjusting countdown timer that can perform specified tasks at intervals. Hearken lets you specify your tasks before initializing including whehter you want them to be repeat tasks or just one time and you can also add/remove tasks while the timer is operating.

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

## **Installation**

Hearken is available through the NPM registry and you can install with simply:

```
$ npm install --save hearken
```

## **Features**

Hearken has many robust features and options such as:

- Events for every stage of the timer (pause, resume, stop, etc.).
- You can create your own events as a task.
- Can work with time in millseconds or HH:MM:SS format.
- Performs, adds, and deletes custom tasks on the fly.
- More coming soon!

## **Docs**

Full hawken documenation available [here](documentation.md).

## **Security Issues**

Any security issues with this project should be handled according to the [Security Policies and Procedures](security.md).

## **License**

[MIT](LICENSE.md).