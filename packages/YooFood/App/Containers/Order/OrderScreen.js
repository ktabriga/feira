import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import { Images, Colors } from '../../Themes'
import {ScreenView, RoundedButton} from '../../Components'
import PaymentMethod from './PaymentMethod'
import OrderValue from './OrderValue'
import OrderProducts from './OrderProducts'
import R from 'ramda'
import Icon from 'react-native-vector-icons/MaterialIcons'

const availableProducts = [{
  id: 1,
  code: 1212,
  name: 'Coca Cola',
  price: 4.5,
  image: require('../../Images/Products/coca-cola.png')
}, {
  id: 2,
  code: 1231,
  name: 'Batata Frita',
  price: 6,
  image: require('../../Images/Products/batata-frita.png')
}, {
  id: 3,
  code: 1421,
  name: 'Big Salada',
  price: 12.9,
  image: require('../../Images/Products/big-salada.png')
}, {
  id: 4,
  code: 1323,
  name: 'Big Burger',
  price: 8.7,
  image: require('../../Images/Products/big-burger.png')
}, {
  id: 5,
  code: 1122,
  name: 'Big Bacon',
  price: 9,
  image: require('../../Images/Products/big-bacon.png')
}, {
  id: 6,
  code: 1612,
  name: 'Pão de Queijo',
  price: 7,
  image: require('../../Images/Products/pao-queijo-nutela.png')
}]

const totalValue = (selectedProducts) => {
  return R.keys(selectedProducts)
    .map(id => {
      const product = R.find(R.propEq('id', +id), availableProducts)
      return product.price * selectedProducts[id].amount
    }).reduce(R.add, 0)
}


export default class OrderScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Yoo Food',
    headerRight: (
      <TouchableOpacity
        onPress={() => navigation.state.params.clear()}
        style={{padding: 15}} >
        <Icon
          name='delete'
          size={24}/>
      </TouchableOpacity>
    )
  })

  state = {
    selectedProducts: {},
    method: ''
  }

  componentWillMount() {
    this.props.navigation.setParams({ clear: this.clear })
  }

  handleOnProductPress = product => {
    const {selectedProducts} = this.state
    const newSelectedProducts = {
      ...selectedProducts,
      [product.id]: {
        id: product.id,
        amount: R.pathOr(0, [product.id, 'amount'], selectedProducts) + 1
      }
    }
    this.setState({selectedProducts: newSelectedProducts})
  }

  handlePayment = () => {
  const {selectedProducts} = this.state
  const products = R.keys(selectedProducts)
      .map(id => selectedProducts[id])
      .map(({id, amount}) => {
        const {name, price, code} = R.find(R.propEq('id', id), availableProducts)
        return {
          code,
          description: name,
          price: price,
          amount: amount,
          total: price * amount
        }
      })
    if (this.state.method === 'MONEY') {
      this.props.navigation.navigate('ConfirmationScreen', {
        order: {products, method: this.state.method}
      })
      this.clear()
      return
    }
    this.props.navigation.navigate('PaymentScreen', {
      totalValue: totalValue(this.state.selectedProducts),
      order: {products, method: this.state.method}
    })
    this.clear()
  }

  componentDidMount() {
    this.clear()
  }

  clear = () => {
    this.setState({
      selectedProducts: {},
      method: ''
    })
  }

  render () {
    const {method, selectedProducts} = this.state
    const value = totalValue(selectedProducts)
    return (
      <ScreenView color={Colors.white}>
        <OrderValue
          value={value}/>
        <View style={{flex: 1}}>
          <OrderProducts
            onProductPress={this.handleOnProductPress}
            amounts={this.state.selectedProducts}
            products={availableProducts}/>
        </View>
        <PaymentMethod 
          style={{marginBottom: 30}}
          onChange={method => this.setState({method})}
          selected={this.state.method}/>
        <RoundedButton
          disabled={!method || !value}
          style={{marginVertical: 20}}
          color={Colors.secondary}
          onPress={this.handlePayment}
          text='Pagar'/>
      </ScreenView>
    )
  }
}
