import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TextInput,  DeviceEventEmitter, Slider } from 'react-native'
import {ScreenView, RoundedButton} from '../../Components'
import {Colors, Images} from '../../Themes'
import OrderValue from '../Order/OrderValue'
import {connect} from 'react-redux'
import PaymentActions from '../../Redux/PaymentRedux'
import {getTotalValue, getOrder} from '../Order'
import {currency} from '../../Lib/Money'
import R from 'ramda'
import {Banner, AnimatedCurrency} from '../../Components'

const findMaxValue = ({employes, ignore}) => {
  return R.keys(employes).reduce((max, key) => {
    if (key === ignore) return max 
    if (employes[key] > max.value) {
      return {
        key,
        value: employes[key]
      }
    }
    return max
  }, {key: '', value: 0})
}

const EmployeSplit = ({nome, image, value, onChange, maxValue}) => (
  <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 5}}>
    <View style={{alignItems: 'center', marginLeft: 10}}>
      <Image 
        resizeMode='cover'
        style={{height: 60, width: 60}}
        source={image}/>
    </View>
    <View style={{
      flex: 1, 
      height: 70,
      justifyContent: 'center'}}>
      <Text style={{color: Colors.grey, position: 'absolute', top: 5, left: 15}}>{nome}</Text>
      <Text style={{
        color: Colors.secondary, 
        position: 'absolute',
        fontWeight: 'bold',
        right: 20,
        top: 7
      }}>{currency(value)}</Text>
    <Slider 
      value={value}
      onSlidingComplete={onChange}
      minimumTrackTintColor={Colors.secondary}
      thumbTintColor={Colors.secondary}
      minimumValue={0}
      maximumValue={maxValue}/>
  </View>
</View>
)

export default class SplitScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'SPLIT de Pagamentos',
  })

  constructor(props) {
    super(props)
    const totalValue = getTotalValue(props.navigation)
    this.state = {
      func1: totalValue,
      func2: 0,
      func3: 0,
      func4: 0,
    }
  }

  handlePayment = () => {
    const {navigation} = this.props
    const order = getOrder(navigation)
    const totalValue = getTotalValue(this.props.navigation)
    const {func1, func2, func3, func4} = this.state
    const split = R.keys(this.state)
      .map(key => this.state[key])
      .filter(value => value > 0)
    if (order.method === 'MONEY') {
      this.props.navigation.navigate('ConfirmationScreen', {
        order: {
          ...order,
          split
        }
      })
      return
    }
    this.props.navigation.navigate('PaymentScreen', {
      totalValue,
      order: {
        ...order,
        split
      }
    })
  }

  getDistributedTotal = ({ignore = ''} = {}) => 
    R.keys(this.state).reduce((acc, key) => {
      if (key === ignore) return acc
      return acc + this.state[key]
    }, 0)

  recalculate = employe => value => {
    const employes = this.state
    const totalValue = getTotalValue(this.props.navigation)
    const sum = this.getDistributedTotal({ignore: employe})
    this.setState({
      [employe]: value
    })
    if (sum + value > totalValue) {
      setTimeout(() => {
        this.setState({
          [employe]: totalValue - sum
        })
      })
      return
    } 
  }

  render () {
    const {navigation, startPayment} = this.props
    const {current, password, func1, func2, func3, func4} = this.state
    const totalValue = getTotalValue(navigation)
    const distributedTotal = this.getDistributedTotal()
    return (
      <ScreenView color={Colors.white}>
        <OrderValue value={totalValue}/>
        <View style={{flex: 1, marginHorizontal: 15, marginTop: 20}}>
          <EmployeSplit 
            value={func1}
            maxValue={totalValue}
            onChange={this.recalculate('func1')}
            nome='Marina'
            image={Images.func2}/>
          <EmployeSplit 
            value={func2}
            maxValue={totalValue}
            onChange={this.recalculate('func2')}
            nome='José'
            image={Images.func1}/>
          <EmployeSplit 
            value={func3}
            maxValue={totalValue}
            onChange={this.recalculate('func3')}
            nome='Cleide'
            image={Images.func3}/>
          <EmployeSplit 
            value={func4}
            maxValue={totalValue}
            onChange={this.recalculate('func4')}
            nome='Carla'
            image={Images.func4}/>
          <View style={{borderWidth: 0.8, borderColor: Colors.lightGrey2, marginHorizontal: 18, marginTop: 15}}/>
          <AnimatedCurrency 
            style={{textAlign: 'right', marginRight: 15}}
            color={totalValue === distributedTotal ? Colors.secondary : Colors.warning}
            value={distributedTotal}/>
        </View>
        <RoundedButton
          style={{marginVertical: 20}}
          color={Colors.secondary}
          onPress={this.handlePayment}
          text='Enviar'/>
      </ScreenView>
    )
  }
}

