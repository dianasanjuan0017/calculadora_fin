import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Propiedades={
    titulo:string,
    nombre:string,
    imagen:any 
}

const Header = (props : Propiedades) => {
  return (
    <View style={styles.container}>
      <View>
        <Image source={props.imagen} style={styles.imagen} />
      </View>
      <View>
        <Text style={styles.titulo}>{props.titulo}</Text>
        <Text>{props.nombre}</Text>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        padding:10,
        width:'100%',
        borderColor:'black',
        borderWidth:2
    }, 
    imagen:{
        width:80,
        height:80,
        borderRadius:80,
        borderWidth:2,
        borderColor:'black'
    },titulo:{
        fontSize:30,
        fontWeight:'bold'
    }
})