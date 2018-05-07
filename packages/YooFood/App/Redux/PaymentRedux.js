import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  startPayment: ['payload'],
  paymentFinished: ['payload']
})

export const PaymentTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false
})

/* ------------- Selectors ------------- */

export const loadingSelector = state => state.payment.loading


/* ------------- Reducers ------------- */

export const loading = (state) =>
  state.set('loading', true)

export const finished = (state) => 
  state.set('loading', false)


// failed to get the avatar
export const failure = (state) =>
  state.merge({ fetching: false, error: true, avatar: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.START_PAYMENT]: loading,
  [Types.PAYMENT_FINISHED]: finished
})
