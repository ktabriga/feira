import React from 'react'

export default ({ReactNative: {View, StyleSheet, defaultPadding=20}}) =>  {

  function ScreenView({children, color, padding, style}) {
    return (
      <View 
        style={{
          flex: 1,
          backgroundColor: color ,
          padding: padding ? defaultPadding : 0,
          ...style
        }}>
        {children}
      </View>
    )
  }

  return ScreenView
}
