
const Dynamo    = require('../utils/Dynamo');
const Responses = require('../utils/Responses');
const Socket    = require('../utils/Socket');

const tableName = process.env.tableName;

exports.handler = async (e) => {

  const {
    connectionId
  } = e.requestContext;

  const body = JSON.parse(e.body);

  try {

    const record = await Dynamo.get(connectionId, tableName);

    const {
      domainName,
      stage
    } = record;

    switch (body.to) {

      case 'projection':
        break;

      case 'ppl':
        break;

      case 'ppls':
        break;


    }

    await Socket.send({
      domainName,
      stage,
      connectionId,
      message: `Received message: '${body.message}'`
    })

    return Responses._200({ message: 'OK' });

  } catch (error) {

    return Responses._400({ message: `Problem with message: '${e.body}'` });

  }

}
