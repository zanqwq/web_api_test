onconnect = e => {
  for (let i = 0; i < e.ports.length; i++) {
    e.ports[i].postMessage(
      `hello thread ${i}, you've connected me`
    );

    e.ports[i].onmessage = _e => {
      e.ports[i].postMessage(
        `hello thread ${i}, i've received your message "${_e.data}"`
      );
    };
  }
};