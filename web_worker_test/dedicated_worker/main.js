const worker = new Worker("./worker.js");
worker.onmessage = e => {
  alert(e.data);
};

const btn = document.getElementById("btn");
btn.onclick = e => {
  console.log("asking worker to do some work...");
  worker.postMessage("hello worker, do some work")
};