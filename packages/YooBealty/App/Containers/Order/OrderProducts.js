import React, { Component } from 'react'
import { Text, Image, View, TouchableOpacity } from 'react-native'
import numeral from 'numeral'
import { Images, Colors } from '../../Themes'
import R from 'ramda'


export const toCurrency = x => numeral(x).format('$ 0,0.00')


const Label = ({label}) => (
  <Text style={{fontSize: 11, color: Colors.darkGrey}}>{label}</Text>
)

const Amount = ({value}) => {
  if (!value) return null
  return (
    <View style={{height: 20, width: 20, borderRadius: 10, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 0, left: 0}}>
      <Text
        style={{
          fontSize: 12,
          fontWeight: 'bold',
          color: Colors.white
        }}>
        {value}
      </Text>
    </View>
  )
}

const Product = ({product = {}, onPress, amount}) => (
  <View style={{padding: 5, flex: 1, height: 105}}>
    <TouchableOpacity
      style={{
        flex: 1,
        backgroundColor: Colors.lightGrey,
        padding: 5,
        alignItems: 'center',
        borderRadius: 5,
      }}
      onPress={() => onPress && onPress(product)}>
      <Image
        style={{height: 54, width: 70, resizeMode: 'cover'}}
        source={product.image}/>
      <Label label={product.name} />
      <Label label={toCurrency(product.price)} />
    </TouchableOpacity>
    <Amount value={amount}/>
  </View>
)

export default class OrderProducts extends Component {
  render () {
    const {amounts, onProductPress} = this.props
    const rows = R.splitEvery(3, this.props.products)
      .map((productsRow, index) => (
        <View style={{flexDirection: 'row'}} key={index}>
          {
            productsRow.map(product => (
              <Product
                key={product.id}
                product={product}
                amount={R.path([product.id, 'amount'], amounts)}
                onPress={onProductPress}/>
            ))
          }
        </View>
      ))
    return (
      <View style={{marginHorizontal: 25, marginTop: 15, flex: 1, justifyContent: 'space-around'}}>
        {rows}
      </View>
    )
  }
}

