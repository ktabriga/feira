const {Buffer} = require('buffer')

module.exports = (fetch) => {
  const hashLogin = Buffer.from('yoopay:yoopay').toString('base64') 

  const makeBaseAuth = (user, password) => 
    `Basic ${hashLogin}`


  const createTransaction = (transaction) => 
    fetch('https://app.yoopay.com.br/rabbitmq/api/exchanges/%2f/amq.default/publish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': makeBaseAuth('yoopay', 'yoopay')
      },
      body: JSON.stringify({
        properties: {},
        routing_key: "q_transaction", 
        payload: JSON.stringify(transaction), 
        payload_encoding: "string"
      })
    })


  return {
    createTransaction
  }
}
