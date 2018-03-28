import moment from 'moment'

const DATE = 'DD/MM/YYYY'
const DATE_TIME = 'DD/MM/YYYY HH:mm:ss'

export const simpleDate = date => moment(date).format(DATE)
export const simpleDateNow = () => moment().format(DATE)
export const simpleDateTimeNow = () => moment().format(DATE_TIME)
