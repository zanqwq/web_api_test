onmessage = e => {
  console.log("receive message from main thread: ", e.data)

  console.log("worker starts work");
  setTimeout(() => {
    postMessage("worker done work")
  }, 4000);
};