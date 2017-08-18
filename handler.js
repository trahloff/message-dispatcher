const AWS = require('aws-sdk')
const headers = {
  'Access-Control-Allow-Origin': '*', // Required for CORS support to work
  'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
}

exports.message = function (event, context, cb) {
  try {
    const body = JSON.parse(event.body)
    const sns = new AWS.SNS()
    const params = {
      Message: body.name + '\n\n' + body.message + '\n\n' + body.email,
      Subject: 'New Message',
      TopicArn: 'arn:aws:sns:eu-central-1:294557341534:personal-page-message'
    }
    sns.publish(params, (err, data) => {
      const response = {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify({
          error: err,
          data: data
        })
      }
      cb(null, response)
    })
  } catch (e) {
    const response = {
      statusCode: 400,
      headers: headers,
      body: JSON.stringify({
        error: e,
        input: event
      })
    }
    cb(null, response)
  }
}
