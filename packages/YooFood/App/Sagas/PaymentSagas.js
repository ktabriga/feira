import {Alert} from 'react-native'
import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import PaymentActions from '../Redux/PaymentRedux'
import { NavigationActions } from "react-navigation"
import integraTransacao from 'integra-transacao'

const wait = (time) => new Promise((resolve) => {
  setTimeout(resolve, time)
})

const showError = (...messages) => Alert.alert('Oops', 'Não foi possível realizar a transação.\nMotivo: ' + messages.join(' '))

export function * payment(action) {
  const {order, totalValue} = action.payload
  try {
    const response = yield call(sendTransaction, {order, totalValue})
    yield put(PaymentActions.paymentFinished({date: Date.now()}))
    if (!response.ok) {
      return showError(response.status, JSON.stringify(response.data || ''))
    }
    yield put(NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({routeName: 'OrderScreen'}),
        NavigationActions.navigate({routeName: 'ConfirmationScreen', params: {order}}),
      ],
    }))
  } catch(e) {
    yield put(PaymentActions.paymentFinished({date: Date.now()}))
    showError(e.message)
  }
}

function sendTransaction({order, totalValue}) {
  const transaction = integraTransacao.generateTransaction({
    hid: "1.100.101.",
    dealerId: 101,
    product: 1,
    paymentMethod: order.method,
    value: totalValue
  })
  return integraTransacao.api.createTransaction(transaction)
}
