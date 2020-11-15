const zebpay = require('../zebpay')

const {
  APP_PASSCODE,
  MAX_AMOUNT
} = process.env

module.exports = async (req, res) => {
  const { body, headers } = req

  if (headers['x-passcode'] !== APP_PASSCODE) {
    return res.status(401).send('You are unauthorized to perform this action')
  }

  if (!body) {
    return res.status(400).send('Invalid amount')
  }

  let { amount } = body
  amount = parseInt(amount)

  if (!amount || !(amount <= MAX_AMOUNT)) {
    return res.status(400).send('Invalid amount')
  }

  const response = await zebpay.buyBtc(amount)

  res.send(response)
}
