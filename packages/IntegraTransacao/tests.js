const test = require('ava')
const {generateCreditCard, generateTransaction, getInstallmentsToMethod} = require('./Lib')
const api = require('./ApiFactory')

test('Deve criar um cartão de crédito', t => {
  const creditCard = generateCreditCard()
  t.truthy(creditCard.number.length, 16)
  t.is(creditCard.owner.split(' ').length, 2)
  t.true(['MASTER_CARD', 'ELO', 'VISA'].includes(creditCard.brand))
})

test('Deve criar transação sem erros', t => {
  const transaction = generateTransaction({
    dealer: 100, 
    hid: '1.100', 
    product: 'teste', 
    paymentMethod: 'DEBIT', 
    value: 10
  })
  t.truthy(transaction)
  t.is(transaction.value, 1000)
  t.truthy(transaction.cardNumber)
  t.truthy(transaction.holderName)
  t.truthy(transaction.cardBrand)
})

test('Deve rotnar quantidade de parcelas sem erro', t => {
  t.truthy(getInstallmentsToMethod('DEBIT'))
  t.truthy(getInstallmentsToMethod('CREDIT'))
})


test('Deve chamar api sem erros', t => {
  const fetch = (url, options) => {
    t.truthy(url)
    t.truthy(options)
  }
  const promise = api(fetch).createTransaction({})
})
