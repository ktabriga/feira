import React from 'react'
import numeral from 'numeral'
import 'numeral/locales/pt-br'

numeral.locale('pt-br')



export const toMoney = x => numeral(x).format('$ 0,0.00')

export default ({ReactNative: {StyleSheet, Animated}, AnimateNumber}) => {

  return class AnimatedCurrency extends React.Component {

    constructor(props) {
      super(props)
      this.animatedValue = new Animated.Value(0)
      this.state = {color: 'rgb(255,255,255)'}
    }

    animate = () => {
      this.animatedValue.setValue(0)
      Animated.timing(this.animatedValue, {
        toValue: 150,
        duration: 800,
      }).start()
    }

    adding = () => {
      this.setState({color:  'rgb(0,232,0)'})
      this.animate()
    }

    subtracting = () => {
      this.setState({color: 'rgb(255,43,43)'})
      this.animate()
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.value > this.props.value) {
        this.adding()
      }
      if (nextProps.value < this.props.value) {
        this.subtracting()
      }
    }

    render() {
      const {value, color} = this.state
      const {color: initialColor = 'rgb(38,38,38)', style} = this.props
      const interpolateColor = this.animatedValue.interpolate({
        inputRange: [0, 20, 150],
        outputRange: [initialColor, color, initialColor]
      })
      return (
        <AnimateNumber
          interval={7}
          style={{color: interpolateColor, fontSize: 24, fontWeight: 'bold', ...style}}
          formatter={toMoney}
          value={this.props.value}/>
      )
    }
  }
}
