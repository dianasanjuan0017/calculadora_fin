import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const ListaProductos = () => {
    // Definimos la estructura de datos de cada producto
    type producto = {
        id: number,  // Ahora `id` es obligatorio
        title: string,
        price: number,
        description?: string,
        category?: string,
        image: string,
        rating?: {
            rate: number,
            count: number
        }
    };

    // Estados de la aplicación
    const [Productos, setProductos] = useState<producto[]>([]);
    const [Cargando, setCargando] = useState<boolean>(true);

    // Carga de datos con `useEffect`
    useEffect(() => {
        const CargaDatos = async () => {
            setCargando(true);
            try {
                // Realizamos la petición `fetch`
                const respuesta = await fetch('https://fakestoreapi.com/products');

                // Verificamos si la respuesta es válida
                if (!respuesta.ok) {
                    throw new Error(`Error al conectar con la fuente de datos: ${respuesta.status}`);
                }

                // Convertimos la respuesta a JSON
                const datos = await respuesta.json();

                // Nos aseguramos de que cada producto tenga un `id`
                const productosConId = datos.map((item: any, index: number) => ({
                    ...item,
                    id: item.id ?? index // Si `id` es `undefined`, usamos el índice
                }));

                setProductos(productosConId);
                setCargando(false);
                console.log(productosConId);
            } catch (error) {
                console.log('Error durante la obtención de datos', error);
                setCargando(false);
            }
        };
        CargaDatos();
    }, []);

    // Pantalla de carga
    const UnLoadScreen = () => (
        <View style={styles.center}>
            <Text>Cargando Datos...</Text>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );

    // Pantalla con la lista de productos
    const LoadScreen = () => (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Productos</Text>
            <FlatList
                data={Productos}
                renderItem={({ item }) => <ProductoItem {...item} />}
                keyExtractor={(item) => item.id.toString()} // Convertimos `id` a string
            />
        </View>
    );

    // Componente para mostrar cada producto
    const ProductoItem = (props: producto) => (
        <View style={styles.containerItem}>
            <Text style={styles.productTitle}>Producto: {props.title}</Text>
            <Text style={styles.productPrice}>Precio: ${props.price}</Text>
            <Image source={{ uri: props.image }} style={styles.image} />
        </View>
    );

    return (
        <View style={styles.container}>
            {Cargando ? <UnLoadScreen /> : <LoadScreen />}
        </View>
    );
};

export default ListaProductos;

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        padding: 10
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    containerItem: {
        backgroundColor: '#FA8',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#000',
        padding: 10,
        marginVertical: 8,
        alignItems: 'center',
        width: 300
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    productPrice: {
        fontSize: 14,
        color: '#333'
    },
    image: {
        height: 80,
        width: 80,
        borderRadius: 40,
        marginTop: 5
    }
});
