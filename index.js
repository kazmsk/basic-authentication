'use strict';

//difinition variables
const USER = 'USER';
const PASS = 'PASS';

exports.handler = (event, context, callback) => {
  console.log('start function');

  // event params
  console.log(JSON.stringify(event));

  // request
  const request = event.Records[0].cf.request;

  // request headers
  const headers = request.headers;

  // authorization headers
  const authorization = headers.authorization || headers.Authorization;

  // basic authorization string
  const authString = 'Basic ' + new Buffer(USER + ':' + PASS).toString('base64');

  console.log(authString);

  if (!authorization || authorization[0].value != authString) {
    const body = 'Unauthorized';
    const response = {
      status: '401',
      statusDescription: 'Unauthorized',
      body: body,
      headers: {
        'www-authenticate': [{key: 'WWW-Authenticate', value:'Basic'}]
      }
    };
    console.log(JSON.stringify(response));
    callback(null, response);
  } else {
    callback(null, request);
  }
};