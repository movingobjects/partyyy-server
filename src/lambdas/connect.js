
const Dynamo = require('../utils/Dynamo');
const Responses = require('../utils/Responses');

const tableName = process.env.tableName;

exports.handler = async (e) => {

  const {
    connectionId,
    domainName,
    stage
  } = e.requestContext;

  await Dynamo.write({
    connectionId,
    date: Date.now(),
    messages: [],
    domainName,
    stage
  }, tableName)

  return Responses._200({
    message: 'Connected'
  });

}
