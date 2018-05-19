# Hearken
Hearken is a self-adjusting countdown timer that is capable of carrying out tasks for [node](http://nodejs.org/).

```js
const Hearken = require("hearken");

const options = {
    startTime: "15000", // Can also be: "00:00:15".
    tasks: [
        {
            name: "hello", // Whatever you want, this is used as a reference for deleting tasks.
            time: "2000",  // Can also be: "00:00:02".
            repeat: true,  // Since repeat is set to true, the task will now run every 2 seconds instead of just once at 2 seconds left.
            fn: () => hello("Bob"), // The task (function) to run.
        },
        {
            name: "add",
            time: "7000",
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
Hearken is a [Node.js](http://nodejs.org/) module available through the [npm registry](https://www.npmjs.com/).

To install, use the [```npm install```](https://docs.npmjs.com/cli/install) command:

```js
$ npm install --save hearken
```

## **Features**
- Events for different stages of the time such as paused and stopped.
- Customizable events.
- Can work with time in 00:00:05 format or in milliseconds.
- Performs, adds, and deletes custom tasks on the fly.

## **Docs**
- Full hawken documenation available [here](documentation.md).

## **Security Issues**
Any security issues with this project should be handled according to the [Security Policies and Procedures](security.md).

## **License**
[MIT](LICENSE.md).