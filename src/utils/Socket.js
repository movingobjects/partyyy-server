
const AWS = require('aws-sdk');

const create = (domainName, stage) => {
  return new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint: `${domainName}/${stage}`,
  });
};

const send = ({ domainName, stage, connectionId, message }) => {

  const ws = create(domainName, stage);

  return ws.postToConnection({
    Data: message,
    ConnectionId: connectionId
  }).promise();

}

module.exports = { send };
