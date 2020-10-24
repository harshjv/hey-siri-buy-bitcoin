const zebpay = require('../zebpay')

const {
  API_PASSCODE,
  MAX_AMOUNT
} = process.env

module.exports = async (req, res) => {
  const { body, headers } = req

  if (headers['x-passcode'] !== API_PASSCODE) {
    return res.status(401).send('Something went wrong')
  }

  if (!body) {
    return res.status(400).send('Something went wrong')
  }

  let { amount } = body
  amount = parseInt(amount)

  if (!amount) {
    return res.status(400).send('Invalid amount')
  }

  if (!(amount <= MAX_AMOUNT)) {
    return res.status(400).send('Invalid amount')
  }

  res.send(await zebpay.buyBtc(body.amount))
}
