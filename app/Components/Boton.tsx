import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'

type props={
    titulo:string,
    onPress:()=>void,
    variante?:'primario'|'secundario'|'peligro',
    icono?:React.ReactNode,
    posicionIcono?:'izquierda'|'derecha',
    disable?:boolean,
    estilo?:StyleProp<ViewStyle>
}

const Boton = (Props:props) => {
    const getVariante=()=>{
        switch(Props.variante){
            case 'secundario': return styles.secundario;
            case 'peligro': return styles.peligro;
            default: return styles.primario
        }
    }
  return (
    <Pressable onPress={Props.onPress} 
    style={[styles.boton,getVariante(),Props.estilo, Props.disable && styles.disable ]}
    disabled={Props.disable}>
        {Props.icono && Props.posicionIcono !== 'derecha' && Props.icono}
      <Text style={styles.texto}>{Props.titulo}</Text>
        {Props.icono && Props.posicionIcono === 'derecha' && Props.icono}

    </Pressable>
  )
}

export default Boton

const styles = StyleSheet.create({
    boton:{
        flexDirection:'row',
        backgroundColor:'#4B2E1E',
        marginVertical:10,
        padding:5,
        paddingStart:10,
        justifyContent:'center',
        borderRadius:15,
        borderColor:'#3F704D',
        borderWidth:2
    },
    texto:{
        color:'white',
        marginStart:10,
        fontWeight:'bold'
    },
    primario:{
        backgroundColor:'#4B2E1E'
    },
    secundario:{
        backgroundColor:'#A67B5B'
    },peligro:{
        backgroundColor:'red'
    },
    disable:{
        opacity:.6
    }
})