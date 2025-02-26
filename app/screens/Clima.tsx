import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

// Definimos la estructura de datos
type Pronostico = {
    date: string;
    day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
            text: string;
            icon: string;
        };
        daily_chance_of_rain: number;
    };
};

const WeatherPronostico = () => {
    const [pronosticoData, setPronosticoData] = useState<Pronostico[]>([]);
    const [cargando, setCargando] = useState<boolean>(true);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    const apiKey = '5f0592004c0d4d17b83180243252502';
                    const apiURL = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=5&aqi=no&alerts=no`;

                    const response = await axios.get(apiURL);
                    setPronosticoData(response.data.forecast.forecastday);
                    setCargando(false);
                } catch (error) {
                    console.error('Error al obtener datos del clima:', error);
                    setCargando(false);
                }
            },
            (error) => {
                console.error('Error al obtener la ubicación:', error);
                setCargando(false);
            }
        );
    }, []);

    // Función para formatear la fecha como DD/MM/AAAA
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    };

    // Función para obtener el día de la semana
    const getDayOfWeek = (dateString: string): string => {
        const date = new Date(dateString);
        const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        return days[date.getDay()];
    };

    const CargandoScreen = () => (
        <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Cargando Pronóstico...</Text>
            <ActivityIndicator size="large" color="#ffffff" />
        </View>
    );

    const PronosticoScreen = () => (
        <FlatList
            data={pronosticoData}
            renderItem={({ item }) => <ForecastItem forecast={item} />}
            keyExtractor={(item) => item.date}
            contentContainerStyle={styles.listContainer}
        />
    );

    const ForecastItem = ({ forecast }: { forecast: Pronostico }) => {
        const getBackgroundColor = () => {
            if (forecast.day.maxtemp_c < 20) return '#4FC3F7'; 
            if (forecast.day.maxtemp_c <= 30) return '#FFEB3B'; 
            return '#FF7043'; 
        };

        return (
            <View style={[styles.itemContainer, { backgroundColor: getBackgroundColor() }]}> 
                <Text style={styles.dayOfWeek}>{getDayOfWeek(forecast.date)}</Text>
                <Text style={styles.date}>{formatDate(forecast.date)}</Text>
                <Image source={{ uri: `https:${forecast.day.condition.icon}` }} style={styles.icon} />
                <Text style={styles.condition}>{forecast.day.condition.text}</Text>
                <Text style={styles.temp}>Max: {forecast.day.maxtemp_c}°C | Min: {forecast.day.mintemp_c}°C</Text>
                <Text style={styles.rainChance}>Probabilidad de lluvia: {forecast.day.daily_chance_of_rain}%</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Pronóstico del Clima</Text>
            {cargando ? <CargandoScreen /> : <PronosticoScreen />}
        </View>
    );
};

export default WeatherPronostico;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E2A47',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: '#ffffff',
        fontSize: 18,
        marginBottom: 10,
    },
    listContainer: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    itemContainer: {
        borderRadius: 15,
        padding: 20,
        marginVertical: 10,
        width: '90%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 20,
    },
    dayOfWeek: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1C2331',
        marginBottom: 3,
    },
    date: {
        fontSize: 16,
        color: '#1C2331',
        marginBottom: 10,
    },
    icon: {
        width: 80,
        height: 80,
    },
    condition: {
        fontSize: 16,
        color: '#333333',
        marginVertical: 5,
    },
    temp: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1C2331',
        marginBottom: 5,
    },
    rainChance: {
        fontSize: 14,
        color: '#1C2331',
        fontStyle: 'italic',
    },
});

