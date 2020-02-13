
const Responses = require('../utils/Responses');

exports.handler = async (e) => {

  return Responses._200({
    message: 'default'
  });

}
