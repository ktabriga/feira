import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TextInput,  DeviceEventEmitter } from 'react-native'
import {ScreenView, RoundedButton} from '../../Components'
import {Colors} from '../../Themes'
import OrderValue from '../Order/OrderValue'
import {connect} from 'react-redux'
import PaymentActions from '../../Redux/PaymentRedux'
import epos700 from 'react-native-epos700'    

const mapDispatchToProps = (dispatch, {navigation: {state: {params}}}) => ({
  startPayment: () => dispatch(PaymentActions.startPayment(params.order))
})

const Step = ({label, active, children, style}) => (
  <View>
    <Text 
      style={{
        fontSize: 24, 
        fontWeight: 'bold', 
        color: active ? Colors.primary : Colors.grey,
        ...style
      }}>{label}</Text>
    {active ? children : null}
  </View>
)

class PaymentScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Pagamento',
  })

  state = {
    current: 'CARD',
    password: ''
  }

  async componentDidMount() {
    await epos700.open()
    await epos700.getCard()
    this.setState({current: 'PASSWORD'})
  }

  componentWillUnmount() {
    epos700.close()
  }
  render () {
    const {navigation, startPayment} = this.props
    const {current, password} = this.state
    return (
      <ScreenView color={Colors.white}>
        <OrderValue value={navigation.state.params.totalValue}/>
        <View style={{padding: 20}}>
          <Step 
            label='1 - Insira o Cartão' active={current === 'CARD'}/>
          <Step 
            label='2 - Informe a Senha' 
            active={current === 'PASSWORD'}
            style={{marginTop: 10}} >
            <TextInput 
              value={password}
              autoFocus
              onChangeText={password => this.setState({password})}
              keyboardType='numeric'
              maxLength={4}
              style={{fontSize: 40}}
              secureTextEntry
              underlineColorAndroid={Colors.primary}/>
            <RoundedButton 
              disabled={password.length < 4}
              onPress={startPayment}
              style={{marginHorizontal: 0}}
              color={Colors.primary}
              text='Confirmar'/>
          </Step>
        </View>
      </ScreenView>
    )
  }
}

export default connect(null, mapDispatchToProps)(PaymentScreen)
