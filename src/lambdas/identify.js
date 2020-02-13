
const Dynamo    = require('../utils/Dynamo');
const Responses = require('../utils/Responses');
const Socket    = require('../utils/Socket');

const tableName = process.env.tableName;

// serverless deploy function --function websocket-identify

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

    if (body.group === 'ppl' || body.group === 'projection') {

      await Dynamo.write({
        ...record,
        group: body.group
      }, tableName);

      await Socket.send({
        domainName,
        stage,
        connectionId,
        message: `Identified as '${body.group}'`
      });

    } else {

      await Socket.send({
        domainName,
        stage,
        connectionId,
        message: `Invalid group '${body.group}'`
      });

    }

    return Responses._200({ message: 'OK' });

  } catch (error) {

    return Responses._400({ message: `Problem with message: '${e.body}'` });

  }

}
