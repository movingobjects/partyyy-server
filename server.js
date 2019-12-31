const WebSocket = require('ws');
const uuid = require('node-uuid');

const server = new WebSocket.Server({
  port: 8089
});

server.on('connection', (ws) => {

  ws.id = uuid.v4();

  console.log(`[${ws.id}] Connected`);
  ws.send(`Connected as ${ws.id}`);

  ws.on('message', (message) => {
    console.log(`[${ws.id}] Received: "${message}"`);
    ws.send(`Message received ("${message}")`)
  });

  ws.on('close', () => {
    console.log(`[${ws.id}] Disconnected`);
  });

});
