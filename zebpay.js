const axios = require('axios')
const BN = require('bignumber.js')
const { v4: uuidv4 } = require('uuid')

const {
  ZEBPAY_CLIENT_ID,
  ZEBPAY_ACCESS_TOKEN
} = process.env

BN.config({ DECIMAL_PLACES: 8 })

const formatter = new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 })
const format = amount => formatter.format(amount).replace(/.00$/, '')

const zebpayPublic = axios.create({
  baseURL: 'https://www.zebapi.com/pro/v1/'
})

const zebpayPrivate = axios.create({
  baseURL: 'https://www.zebapi.com/api/v1/',
  headers: {
    client_id: ZEBPAY_CLIENT_ID,
    Authorization: `Bearer ${ZEBPAY_ACCESS_TOKEN}`,
    'Content-Type': 'application/json'
  }
})

const createPrivateRequestHeaders = () => ({
  RequestId: uuidv4(),
  timestamp: Math.ceil(Date.now() / 1000)
})

const getRate = () => zebpayPublic('/market/BTC-INR/ticker')
  .then(response => response.data)
  .then(({ buy: price }) => price)

const getBalance = () => {
  return zebpayPrivate('/wallet/balance', {
    headers: createPrivateRequestHeaders()
  })
    .then(response => response.data)
    .then(({ data }) => {
      return data.reduce((acc, { balance, currency }) => {
        if (['BTC', 'INR'].includes(currency)) {
          acc[currency] = currency === 'INR' ? format(balance) : balance
        }

        return acc
      }, {})
    })
}

const buyBtc = amount => getRate().then(price => {
  price = BN(price).times(0.99999).dp(2)
  const BTC = BN(amount).div(price).toString()

  return zebpayPrivate('/orders', {
    method: 'POST',
    headers: createPrivateRequestHeaders(),
    data: {
      trade_pair: 'BTC-INR',
      side: 'bid',
      size: BTC,
      price
    }
  })
    .then(response => response.data)
    .then(order => {
      const formattedAmount = format(amount)
      const formattedSats = format(BN(BTC).times(1e8))

      if (order.statusDescription === 'success') {
        return `Bought ${formattedSats} satoshi for ₹${formattedAmount}`
      } else {
        return `Something went wrong while buying ${formattedSats} satoshi for ₹${formattedAmount} - ${order.statusDescription}`
      }
    })
})

module.exports = {
  getBalance,
  getRate,
  buyBtc,
  format
}
