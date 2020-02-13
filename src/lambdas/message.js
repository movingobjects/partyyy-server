
const Dynamo = require('../utils/Dynamo');
const Responses = require('../utils/Responses');
const Socket = require('../utils/Socket');

const tableName = process.env.tableName;

exports.handler = async (e) => {

  const {
    connectionId
  } = e.requestContext;

  const body = JSON.parse(e.body);

  try {

    const record = await Dynamo.get(connectionId, tableName);

    const {
      messages,
      domainName,
      stage
    } = record;

    messages.push(body.message);

    await Dynamo.write({
      ...record,
      messages
    }, tableName);

    await Socket.send({
      domainName,
      stage,
      connectionId,
      message: `Hey, here's a reply to your message`
    })

    return Responses._200({
      message: 'Message received'
    });

  } catch (error) {

    return Responses._400({
      message: 'Problem receiving message'
    });

  }

}
