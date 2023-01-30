const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns');

// Create SNS service object.
const snsClient = new SNSClient({ region: process.env.SNS_REGION });

exports.handler = async function(event, context, callback) {
  // console.log('Received event:', JSON.stringify(event, null, 4));
  if (event.queryStringParameters && event.queryStringParameters.token === process.env.TOKEN) {
    const data = await snsClient.send(new PublishCommand({
      Message: JSON.stringify({
        event: 'test',
        data: 'zzzzzzz',
      }), // MESSAGE_TEXT
      TopicArn: 'dispatch', //TOPIC_ARN
    }));
    console.log(data);
    return {
      statusCode: 200,
      body: 'Success',
    };
  }
  return{
    statusCode: 401,
    body: 'Forbidden'
  };
};
