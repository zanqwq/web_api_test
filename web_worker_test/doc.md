Web worker makes it possible to run a script operation in a background thread separate from the main execution thread of web application.

In addition to the standard js set of functions (such as `String`, `Array`, `Object`, `JSON`, etc)
you can run almost any code you like inside a worker thread. (some are not allow, like dom manipulation, `window` ...)

# concepts and usage
both side send message through `postMessage` method, and are respond to messages via the `onmessage` event handler

workers can also spawn new workers.

# worker types
* dedicated worker: utilized by a singe script
* shared workers: utilized by multiple scripts running in different windows, iframs, etc.
* service workers: act as proxy servers that sit between web applications, the browser and network

#  Worker global ctx and func
workers run in a different global ctx than the current `window`
* `DedicatedWorkerGlobalScope`
* `SharedWorkerGlobalScope`
* `ServiceWorkerGlobalScope`

* `WorkerGlobalScope.importScripts` (all worker)
* `DedicatedWorkerGlobalScope.postMessage` (dedicated workers only)

[supported web apis](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API#supported_web_apis)

# example
## dedicated worker example
```js
// dedicated worker in main thread
if (window.Worker) {
  var myWorker = new Worker('worker.js'); // worker thread
  myWorker.onmessage = e => {
    console.log(e.data);
  };
  myWorker.postMessage("hello worker");
  myWorker.terminate(); // terminate worker
}

// worker.js in worker thread
onmessage = e => {
  console.log(e.data);
  postMessage("hello main");
}
importScripts("foo.js"); // spawning sub workers
```

## shared worker example
```js
// shared worker (accessible by multiple scripts)
// have to communicate via a `port` object
// Note: shared worker must in the same origin (protocol + host + port)
// the port connection needs to be started either implicitly by the use of the `onmessage` event handler
// or explicitly with `start` method before any messages can be posted.
// calling `start` is only needed if the `message` event is wired up via the `addEventListener` method

// site a index.js in main thread 0
if (window.worker) {
  var myWorker = new SharedWorker("worker.js");
  myWorker.onmessage = e => {
    console.log(e.data);
  };
  // or 
  // myWorker.addEventListener("message", e => {});
  // myWorker.port.start();

  myWorker.port.postMessage("hello from main thread 0");
}

// site b index.js in main thread 1
if (window.worker) {
  var myWorker = new SharedWorker("worker.js");
  myWorker.onmessage = e => {
    console.log(e.data);
  };
  myWorker.port.postMessage("hello from main thread 1");
}

// worker.js in worker thread
onconnect = e => {
  for (let i = 0; i < e.ports.length; i++) {
    e.ports[i].onmessage = () => {
      console.log(e.ports[i].data);
      e.ports[i].postMessage(`hello from worker thread to main thread ${i}`);
    };

    e.ports[i].onmessage = _e => {
      e.ports[i].postMessage("receive: ", _e.data);
    };
  }
};
```
