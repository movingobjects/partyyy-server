
const AWS = require('aws-sdk');

const client = new AWS.DynamoDB.DocumentClient();

const Dynamo = {

  async get(connectionId, tableName) {

    const data = await client.get({
      TableName: tableName,
      Key: { connectionId }
    }).promise();

    if (!data || !data.Item) {
      throw Error(`There was an error fetching the data for connectionId of ${connectionId} from ${TableName}`);
    }

    return data.Item;

  },

  async write(data, tableName) {

    if (!data.connectionId) {
      throw Error('No connectionId on the data');
    }

    const res = await client.put({
      TableName: tableName,
      Item: data,
    }).promise();

    if (!res) {
      throw Error(`There was an error inserting connectionId of ${data.connectionId} in table ${TableName}`);
    }

    return data;

  },

  async delete(connectionId, tableName) {

    return client.delete({
      TableName: tableName,
      Key: { connectionId }
    }).promise();

  }

};

module.exports = Dynamo;
