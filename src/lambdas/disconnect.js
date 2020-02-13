
const Dynamo    = require('../utils/Dynamo');
const Responses = require('../utils/Responses');

const tableName = process.env.tableName;

exports.handler = async (e) => {

  const {
    connectionId
  } = e.requestContext;

  await Dynamo.delete(connectionId, tableName);

  return Responses._200({ message: 'Disconnected' });

}
