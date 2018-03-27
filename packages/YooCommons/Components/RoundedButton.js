import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default ({ReactNative: {StyleSheet, TouchableOpacity, Text}, Theme: {Fonts, Colors, Metrics}}) => {
  const styles = StyleSheet.create({                                  
    button: {                                                         
        height: 50,                                                     
        borderRadius: 5,                                                
        marginHorizontal: Metrics.section,                              
        marginVertical: Metrics.baseMargin,                             
        justifyContent: 'center'                                        
      },                                                                
    buttonText: {                                                     
        color: Colors.snow,                                             
        textAlign: 'center',                                            
        fontWeight: 'bold',                                             
        fontSize: Fonts.size.regular,                                   
        marginVertical: Metrics.baseMargin                              
      }                                                                 
  })                                                                  
  
  return class RoundedButton extends Component {
    static propTypes = {
      onPress: PropTypes.func,
      text: PropTypes.string,
      children: PropTypes.string,
      navigator: PropTypes.object
    }

    getText () {
      const buttonText = this.props.text || this.props.children || ''
      return buttonText.toUpperCase()
    }


    render () {
      const {disabled, color, style, reverse} = this.props
      let finalStyle = {backgroundColor: disabled ? Colors.grey : color}
      let textStyle
      if (reverse) {
        finalStyle = {
          backgroundColor: 'transparent',
          borderColor: disabled ? Colors.grey : color,
          borderWidth: 1
        }
        textStyle = {
          color
        }
      }
      return (
        <TouchableOpacity 
          style={[styles.button, finalStyle, style]} 
          onPress={!disabled ? this.props.onPress : null}>
          <Text style={[styles.buttonText, textStyle]}>{this.getText()}</Text>
        </TouchableOpacity>
      )
    }
  }
}
