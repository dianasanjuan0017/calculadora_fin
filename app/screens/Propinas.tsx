import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

interface HistorialEntrada {
  id: string;
  consumo: string;
  porcentajePropina: number;
  propina: string;
  totalPagar: string;
}

const CalculadoraPropinas: React.FC = () => {
  const [consumo, setConsumo] = useState<string>('');
  const [propinaPersonalizada, setPropinaPersonalizada] = useState<string>('');
  const [propinaSeleccionada, setPropinaSeleccionada] = useState<number | null>(null);
  const [historial, setHistorial] = useState<HistorialEntrada[]>([]);

  const opcionesPropina: number[] = [10, 15, 20];

  const calcularPropina = (porcentajePropina: number) => {
    const montoConsumo = parseFloat(consumo);
    if (isNaN(montoConsumo) || montoConsumo <= 0) return;

    const montoPropina = (montoConsumo * porcentajePropina) / 100;
    const total = montoConsumo + montoPropina;

    const nuevaEntrada: HistorialEntrada = {
      id: Math.random().toString(),
      consumo: montoConsumo.toFixed(2),
      porcentajePropina,
      propina: montoPropina.toFixed(2),
      totalPagar: total.toFixed(2),
    };

    setHistorial([nuevaEntrada, ...historial]);
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Calculadora de Propinas 😸</Text>

      <TextInput
        style={styles.entrada}
        placeholder="Monto del consumo"
        keyboardType="numeric"
        placeholderTextColor="#cfd8dc"
        value={consumo}
        onChangeText={setConsumo}
      />

      <Text style={styles.subtitulo}>Selecciona un porcentaje:</Text>
      <View style={styles.contenedorPropinas}>
        {opcionesPropina.map((propina) => (
          <TouchableOpacity
            key={propina}
            style={[
              styles.botonPropina,
              propinaSeleccionada === propina && styles.propinaSeleccionada,
            ]}
            onPress={() => {
              setPropinaSeleccionada(propina);
              setPropinaPersonalizada('');
              calcularPropina(propina);
            }}>
            <Text style={styles.textoBoton}>{propina}%</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.entrada}
        placeholder="Otro porcentaje (%)"
        keyboardType="numeric"
        placeholderTextColor="#cfd8dc"
        value={propinaPersonalizada}
        onChangeText={setPropinaPersonalizada}
        onSubmitEditing={() => {
          const valorPropina = parseFloat(propinaPersonalizada);
          if (!isNaN(valorPropina) && valorPropina > 0) {
            setPropinaSeleccionada(null);
            calcularPropina(valorPropina);
          }
        }}
      />

      <Text style={styles.subtitulo}>Historial de cálculos:</Text>
      {}
      <View style={{ flex: 1 }}>
        <FlatList
          data={historial}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemHistorial}>
              <Text style={styles.textoHistorial}>
                Consumo: <Text style={styles.textoResaltado}>${item.consumo}</Text>
              </Text>
              <Text style={styles.textoHistorial}>
                Propina: <Text style={styles.textoResaltado}>{item.porcentajePropina}% (${item.propina})</Text>
              </Text>
              <Text style={styles.textoHistorial}>
                Total: <Text style={styles.textoResaltado}>${item.totalPagar}</Text>
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,  
    padding: 20,
    backgroundColor: '#1e272e', // Azul oscuro
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#ffdd59', // Amarillo neón
    textShadowColor: '#ff5e57', // Rojo neón
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#d2dae2',
  },
  entrada: {
    borderWidth: 1,
    borderColor: '#485460', // Gris oscuro
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#2f3640', // Gris oscuro
    fontSize: 16,
    color: '#ffffff', // Texto blanco
  },
  contenedorPropinas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  botonPropina: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 12,
    backgroundColor: '#3c40c6', // Azul vibrante
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  propinaSeleccionada: {
    backgroundColor: '#4b7bec', // Azul más claro
    borderWidth: 2,
    borderColor: '#ffdd59', // Amarillo neón
  },
  textoBoton: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemHistorial: {
    backgroundColor: '#34495e', // Azul grisáceo
    padding: 15,
    marginTop: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#ffdd59', // Amarillo neón
  },
  textoHistorial: {
    fontSize: 16,
    color: '#ffffff', // Texto blanco
  },
  textoResaltado: {
    fontWeight: 'bold',
    color: '#ffdd59', // Amarillo neón
  },
});

export default CalculadoraPropinas;
