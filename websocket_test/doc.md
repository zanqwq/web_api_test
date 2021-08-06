```js
const ws = new WebSocket('ws://localhost:8080');

socket.addEventListener('open', e => {
  ws.send('Hello server');
});
// or
// socket.onopen ...
```

# method
* send

# event
* open
* close
* message
* error