import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Propiedades={
    fecha:string,
    telefono:string
}

const Foother = ( props:Propiedades ) => {
  return (
    <View style={styles.container}>
      <Text style={styles.texto} >{props.fecha}</Text>
      <Text style={styles.texto}>{props.telefono}</Text>
    </View>
  )
}

export default Foother

const styles = StyleSheet.create({
    container:{
        borderColor:'black',
        borderWidth:2,
        width:'100%',
        alignItems:'center',
    },texto:{
        fontSize:20,
        fontWeight:'bold'
    }
})