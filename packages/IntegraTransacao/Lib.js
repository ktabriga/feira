const Nonsense = require('Nonsense')
const ns = new Nonsense()

const availableBrands = ['MASTER_CARD', 'ELO', 'VISA']
const availableTransactionStatus = [
  'PROCESSING',
  'AUTHORIZED',
  'PAID',
  'REFUNDED',
  'WAITING_PAYMENT',
  'PENDING_REFUND',
  'REFUSED'
]
const now = () => new Date().toISOString()

const generateCreditCard = () => {
  return {
    owner: ns.name(),
    brand: ns.pick(availableBrands),
    number: String(ns.integerInRange(1111111111111111, 9999999999999999))
  }
}

const getInstallmentsToMethod = (method) => {
  if (method === 'DEBIT') {
    return 1
  } 

  return ns.integerInRange(1, 12)
}

const  generateTransaction = ({
  dealerId, 
  hid, 
  product, 
  paymentMethod,
  value
}) => {
  const feeValue = ns.integerInRange(100, 400)
  const creditCard = generateCreditCard()
  return {
    hid: hid,
    code: 'YP' + ns.integerInRange(111111, 99999),
    status: ns.pick(availableTransactionStatus),
    paymentMethod,
    installments: getInstallmentsToMethod(paymentMethod),
    nsu: ns.integerInRange(1, 999),
    dealerId,
    productItemId: product,
    createdAt: now(),
    updatedAt: now(),
    value: value * 100,
    feeValue,
    valueLiquid: value * 100 - feeValue,
    cardNumber: creditCard.number,
    holderName: creditCard.owner,
    cardBrand: creditCard.brand
  }
}


module.exports = {
  generateCreditCard,
  generateTransaction,
  getInstallmentsToMethod
}
