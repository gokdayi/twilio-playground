const twilio = require('twilio')
const { accountSID, authToken, phoneSource, phoneTarget } = require('../config')

const client = new twilio(accountSID, authToken)

exports.sendbasic = async (req, res) => {
  try {
    const result = await client.messages
      .create({
        body: 'Hello from Node',
        to: phoneTarget, // Text this number
        from: phoneSource, // From a valid Twilio number
      })

    console.log(result)
    res.status(200).send({
      result
    })
  } catch (error) {
    res.status(500).send({
      error
    })
  }
}

exports.sendmessage = async (req, res) => {
  try {
    const { message } = req.body

    if(!message || message.trim() === '') {
      return res.status(400).send({
        message: 'Message body cannot be empty'
      })
    }

    const result = await client.messages.create({
      body: message,
      to: phoneTarget,
      from: phoneSource
    })

    const { errorCode, errorMessage } = message
    if(errorCode || errorMessage) {
      return res.status(400).send({
        errorCode,
        errorMessage,
        message: 'An unexpected error occurred while sending the message'
      })
    }

    res.status(200).send({
      result
    })
  } catch (error) {
    return res.status(500).send({
      error
    })
  }
}