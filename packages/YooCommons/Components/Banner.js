import React from 'react'

export default ({ReactNative: {View, StyleSheet}}) =>  {
  function Banner({children, color='grey', styles}) {
    return (
      <View style={{
        padding: 20,
        backgroundColor: color,
        ...styles
      }}>
        {children}
      </View>
    )
  }
  return Banner
}
