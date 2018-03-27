import numeral from 'numeral'
export const currency = x => numeral(x).format('$ 0,0.00')
