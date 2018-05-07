const apiFactory = require('./ApiFactory')
const lib = require('./Lib')

module.exports = {
  ...lib,
  api: apiFactory(fetch)
}
