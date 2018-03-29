import React from 'react'
import { Text, Image, View, TouchableOpacity } from 'react-native'
import { Images, Colors } from '../../Themes'
import {Paper, Title, Section} from '../../Components'
import Icon from 'react-native-vector-icons/MaterialIcons'

const Method = ({label, image, style, selected, onPress}) => (
  <Paper 
    component={TouchableOpacity}
    onPress={onPress}
    elevation={2}
    styles={{
      height: 100, 
      flex: 1, 
      padding: 7, 
      justifyContent: 'flex-end', 
      backgroundColor: selected ? Colors.primary : Colors.white,
      borderRadius: 10,
      ...style
    }}>
    <Image style={{height: 50, width: 50, resizeMode: 'contain'}} source={image}/>
    <Text style={{color: selected ? Colors.white : null, fontSize: 18}}>{label}</Text>
  </Paper>
)

export default function PaymentMethod({selected, onChange, style}) {
  return (
    <Section style={style}>
      <View style={{padding: 20}}>
        <Title size={20}>Forma de Pagamento</Title>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Method 
          onPress={() => onChange('CREDIT')}
          selected={selected==='CREDIT'}
          label='Crédito' 
          image={selected==='CREDIT' ? Images.creditCardWhite : Images.creditCard}
          style={{marginRight: 10}} />
        <Method 
          onPress={() => onChange('DEBIT')}
          selected={selected==='DEBIT'}
          label='Débito' 
          image={selected==='DEBIT' ? Images.debitCardWhite : Images.debitCard} />
        <Method 
          onPress={() => onChange('MONEY')}
          selected={selected==='MONEY'}
          label='Dinheiro' 
          image={selected==='MONEY' ? Images.moneyWhite : Images.money}
          style={{marginLeft: 10}} />
      </View>
    </Section>
  )
}
