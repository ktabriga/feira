import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import PaymentActions from '../Redux/PaymentRedux'
import { NavigationActions } from "react-navigation";

const wait = (time) => new Promise((resolve) => {
  setTimeout(resolve, time)
})

export function * payment(action) {
  yield call(wait, 1000)
  yield put(PaymentActions.paymentFinished({date: Date.now()}))
  yield put(NavigationActions.reset({
    index: 1,
    actions: [
      NavigationActions.navigate({routeName: 'OrderScreen'}),
      NavigationActions.navigate({routeName: 'ConfirmationScreen', params: {order: action.payload}}),
    ],
  }))
}
