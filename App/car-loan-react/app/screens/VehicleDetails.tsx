import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function VehicleDetails({ route, navigation }) {
    const { vehicle } = route.params; // Recibe los datos del vehículo desde la pantalla anterior

    return (
        <View style={styles.container}>
            {/* Imagen de marcador (o URL real si estuviera disponible en la API) */}
            <Image
                source={{ uri: 'https://www.toyota.com.ec/admin/sites/default/files/2022-07/yaris-cross-potencia-min.png' }} // Cambiar si la API tiene URL de imágenes
                style={styles.vehicleImage}
            />

            {/* Título con Marca y Modelo */}
            <Text style={styles.vehicleTitle}>{`${vehicle.brand} ${vehicle.model}`}</Text>

            {/* Detalles del Vehículo */}
            <View style={styles.detailsContainer}>
                <Text style={styles.detailText}>🎨 Color: {vehicle.color}</Text>
                <Text style={styles.detailText}>📅 Año: {vehicle.year}</Text>
                <Text style={styles.detailText}>⛽ Tipo de combustible: {vehicle.fuel_type}</Text>
                <Text style={styles.detailText}>🛢️ Capacidad de combustible: {vehicle.fuel_capacity}L</Text>
                <Text style={styles.detailText}>⚖️ Peso: {vehicle.weight}kg</Text>
            </View>

            {/* Estadísticas del Vehículo */}
            <View style={styles.statsContainer}>
                <View style={styles.statBox}>
                    <Text style={styles.statValue}>{vehicle.km_actual} km</Text>
                    <Text style={styles.statLabel}>Kilómetros recorridos</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statValue}>{vehicle.km_gallon}</Text>
                    <Text style={styles.statLabel}>Km por galón</Text>
                </View>
            </View>

            {/* Botón para regresar */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate('Mis Vehículos')} // Navega a la pantalla "Mis Vehículos"
            >
                <Text style={styles.backButtonText}>Volver</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    vehicleImage: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginBottom: 20,
        marginTop: 50,
    },
    vehicleTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#004270',
    },
    detailsContainer: {
        marginVertical: 20,
    },
    detailText: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
        marginTop: 20,
    },
    statBox: {
        backgroundColor: '#FFEDC0',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '45%',
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    statLabel: {
        fontSize: 14,
        color: '#555',
    },
    backButton: {
        backgroundColor: '#004270',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 20,
    },
    backButtonText: {
        fontSize: 16,
        color: '#fff',
    },
});
