import React from 'react'

export default ({ReactNative: {Text}, color, size=15}) =>  {

  function Title({children, size = size}) {
    return (
      <Text style={{fontSize: size, color, fontWeight: 'bold', marginBottom: 10}}>
        {children.toUpperCase()}
      </Text>
    )
  }
  return Title
}
