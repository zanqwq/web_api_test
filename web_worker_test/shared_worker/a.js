const worker = new SharedWorker("./worker.js");
worker.port.onmessage = e => {
  console.log(e.data);
};

const btn = document.getElementById("btn");
btn.onclick = e => {
  console.log("sending message from a...", worker.port);
  worker.port.postMessage("hello from a");
};
