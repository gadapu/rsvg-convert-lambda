'use strict';
var convert = require('./convert');

module.exports.hello = async (event, context) => {
  var eventRecord = event.Records && event.Records[0];
	if (!eventRecord) {
		return context.fail('no records in the event');
	}
	if (eventRecord.eventSource !== 'aws:s3' || !eventRecord.s3) {
		context.fail('unsupported event source');
	}
	convert(eventRecord.s3.bucket.name, eventRecord.s3.object.key).then(context.done, context.fail);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
