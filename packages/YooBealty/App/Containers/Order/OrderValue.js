import React, { Component } from 'react'
import { Text } from 'react-native'
import { Images, Colors } from '../../Themes'
import {Banner, AnimatedCurrency} from '../../Components'

export default function OrderValue({value}) {
  return (
    <Banner color={Colors.primary} styles={{
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      padding: 0, 
      height: 70, 
      paddingLeft: 20, 
      paddingRight: 20,
      alignItems: 'center' }}>
      <Text style={{color: Colors.white, fontSize: 20}}>Valor Total</Text>
      <AnimatedCurrency 
        color={Colors.white}
        value={value}/>
    </Banner>
  )
}
