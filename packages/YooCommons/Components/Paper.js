import React from 'react'

export default ({ReactNative: {View, StyleSheet}}) =>  {

  function Paper({children, elevation=5, radius: borderRadius=2, styles, component : Component = View, ...rest}) {
    return (
      <Component style={{
        elevation, 
        backgroundColor:'#f8f8f8', 
        borderRadius, 
        alignItems: 'center',
        justifyContent: 'center',
        ...styles
      }}
      {...rest}>
        {children}
      </Component>
    )
  }

  return Paper
}
