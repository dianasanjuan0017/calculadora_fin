import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Boton from '../Components/Boton'


const Tienda = () => {

    
    type prod={
        id:number,
        title:string,
        price:number,
        description:string,
        category:string,
        image:string,
        rating:{
            rate:number,
            count:number
        }
    }

    const [producto,setProducto]=useState<prod>();
    const [loading,setLoading]=useState<boolean>(true);
    
    const loadData= async()=>{
        setLoading(true);
        try{
            const respuesta=await fetch('https://fakestoreapi.com/products/1');
            if(!respuesta.ok){
                console.log('error1');
                throw new Error('Ocurrio el error : ${respuesta.status}');
            }
            const datos= await respuesta.json();
            console.log(datos);
            setProducto(datos);
            setLoading(false);

        }catch(e){
            console.log('Error : ',e)
        }
    }

    const screenload=()=>{
        return(
            <View>
                <Text>Tienda</Text>
                <Text>Producto : {producto?.title}</Text>
                <Text>descripcion : {producto?.description}</Text>
            </View>
        )
    
    }

    const screenUnLoad=()=>{
        return(
        <View>
            <Boton titulo='Carga datos' onPress={loadData}/>
            <Text>Cargando datos</Text>
            <ActivityIndicator/>
        </View>
        )
        
    }
  return (
    <View>
        {loading?screenUnLoad():screenload()}
    </View>
  )
}

export default Tienda

const styles = StyleSheet.create({})