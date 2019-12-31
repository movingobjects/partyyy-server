const WebSocket = require('ws');
const uuid = require('uuid');

const server = new WebSocket.Server({
  port: 8089
});

const clients = [],
      ppls    = [];

console.log('Server Started');

server.on('connection', (ws) => addClient(ws));

function addClient(ws) {

  const index = clients.length;

  clients.push({
    ws: ws,
    id: uuid.v4()
  });

  ws.on('message', (message) => onClientData(index, JSON.parse(message)));
  ws.on('close', () => onClientClose(index));

  clientLog(index, 'connected')

}

function onClientData(index, data) {

  const client = clients[index];

  let ppl;

  switch (data.type) {

    case 'identify':

      client.group = data.group;

      if (client.group === 'ppl') {

        client.pplId = data.id;

        ppl = ppls.find((p) => p.id === client.pplId)

        if (!ppl) {
          ppls.push({
            id: data.id
          });
        } else {
          sendToClient(index, {
            type: 'ppl',
            name: ppl.name
          })
        }

      }

      break;

    case 'updatePpl':

      ppl = ppls.find((p) => p.id === client.pplId)

      if (ppl) {
        Object.assign(ppl, data.ppl);
      }

      sendToProjection({
        type: 'pplUpdate',
        ppls: ppls
      });

      break;


  }

}
function onClientClose(index) {

  clientLog(index, 'Disconnected')

}

function clientLog(index, msg) {

  const client = clients[index],
        id     = client.id;

  console.log(`[${id}] ${msg}`);

}

function sendToClient(index, data) {

  const client = clients[index],
        ws     = client.ws;

  ws.send(JSON.stringify(data));

}
function sendToProjection(data) {

  const index = clients.findIndex((c) => c.group === 'projection');

  if (index !== -1) {
    sendToClient(index, data);
  }

}
