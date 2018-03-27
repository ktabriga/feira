import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { Colors } from '../../Themes'
import {ScreenView, RoundedButton} from '../../Components'
import epos700 from 'react-native-epos700'
import {simpleDateNow, simpleDateTimeNow} from '../../Lib/Dates'
import R from 'ramda'
import './padPolyfill'

const format = (value, size) => String(value).substring(0, size).padEnd(size)
const formatMoney = (value, size) => value.toFixed(2).padStart(size)
const formatNumber = (value, size) => String(value).padStart(size)

const makeProductLine = ({code, description, amount, price, total}) => {
  const line = [
    format(code, 4),
    format(description, 9),
    formatNumber(amount, 3),
    //formatMoney(price, 6),
    //formatMoney(total, 6),
  ]
  return line.join(' ')
}
const paymentMethodDescription = paymentMethod => {
  switch (paymentMethod) {
    case 'CREDIT': return 'Cart. Credito'
    case 'DEBIT':  return 'Cart. Debito '
    case 'MONEY':  return 'Dinheiro     '
  }
}
const nfPt1Template = ({products, itemsAmount, total, paymentMethod}) => [
  'Av. Cerro Azul, 647 - Maringá-PR',
  'CNPJ: 94.271.971/0001-10',
  `DATA: ${simpleDateNow()}`,
  '--------------------------------',
  'Documento Auxiliar de Nota Fiscal de Consumiduto Eletrônica',
  '--------------------------------',
  'Detalhe da Venda',
  '--------------------------------',
  'CODIG DESCRIC QTD               ',
  //'3242 COCA-COLA   1  14,90  15,98',
  ...products.map(makeProductLine),
  '--------------------------------',
  `QTD. TOTAL DE ITENS          ${formatNumber(itemsAmount, 3)}`,
  `VALOR TOTAL R$            ${formatMoney(total, 6)}`,
  `VALOR A PAGAR R$          ${formatMoney(total, 6)}`,
  'FORMA DE PAGAMENTO    VALOR PAGO',
  `${paymentMethodDescription(paymentMethod)}             ${formatMoney(total, 6)}`,
  '--------------------------------',
  'Consulte pela Chave de Acesso em',
  'https://nfse.fazend.pr.gov.br/nfse/NFeConsulta3',
  '4118 4304 0542 3950 20345 20394',
  '--------------------------------',
]

export default class ConfirmationScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Pedido Realizado',
  })

  printNote = async ({total, products, method}) => {
    const totals = products.reduce((acc, product) => ({
      itemsAmount: acc.itemsAmount + product.amount,
    }), {total: 0, itemsAmount: 0})
    const nfPpt1 = nfPt1Template({products, paymentMethod: method, ...totals, total})
    const nfPt2 = [
      'NFC-e nro 00004354 serie 0034',
      simpleDateTimeNow(),
      'Protocolo da Autorização:',
      '141 2423423 98720',
      'Data da Autorização',
      simpleDateTimeNow()
    ]
    const nfPt3 = [
      '--------------------------------',
      'Informações dos Tributos Totais Incidentes',
      'Trib aprox R$: 2.28 Fed 2.10 Est',
      'Fonte: IBT/FECOMERCIO Arf57',
      '________________________________',
      '',
      'ESTAB: 29384789        TERM: 923',
      simpleDateTimeNow(),
      `1234********789 ${paymentMethodDescription(method)}`,
      `VALOR: ${formatMoney(total, 6)}`,
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    ]

    await epos700.print('YOOFOOD E CIA LTDA', true)
    await this.printLines(nfPpt1, false)
    await this.printLines(nfPt2, true)
    await epos700.printQRCode('Essa NF é apenas uma demonstração feita pela YooPay')
    return await this.printLines(nfPt3, false)
  }

  handlePrint = async () => {
    const {order: {products, method, split}} = this.props.navigation.state.params
    for (const total of split) {
      await this.printNote({total, products, method})
    }
  }

  printLines = async (data, isBold) => {
    const lines = R.splitEvery(2, data)
      .map(lines => lines.join('\n'))
    for (const line of lines) {
      await epos700.print(line, isBold)
    }
  }

  handleNewOrder = () => {
    this.props.navigation.goBack()
  }

  render () {
    return (
      <ScreenView padding>
        <View style={{alignItems: 'center'}}>
          <Text style={{color: Colors.primary, fontSize: 22, fontWeight: 'bold'}}>
            Seu pedido foi realizado.
          </Text>
          <Text style={{color: Colors.primary, fontSize: 22, fontWeight: 'bold'}}>
            Obrigado!
          </Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <RoundedButton
            onPress={this.handlePrint}
            style={{marginHorizontal: 0}}
            color={Colors.primary}
            text='Imprimir'/>
          <RoundedButton
            onPress={this.handleNewOrder}
            style={{marginHorizontal: 0}}
            color={Colors.primary}
            reverse
            text='Novo Pedido'/>
        </View>
      </ScreenView>
    )
  }
}
