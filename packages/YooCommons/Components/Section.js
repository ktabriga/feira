import React from 'react'

export default ({ReactNative: {View, StyleSheet}}) =>  {

  function Section({children, style}) {
    return (
      <View style={[styles.root, style]}>
        {children}
      </View>
    )
  }

  const styles = StyleSheet.create({
    root: {
      marginHorizontal: 25,
      marginTop: 15,
      paddingBottom: 0,
      alignItems: 'center'
    }
  })

  return Section
}
