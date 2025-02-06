import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';

export default function Monitoring({ navigation }) {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchVehicles = async () => {
        try {

            const response = await fetch('https://car-loan-go-703279496082.us-east1.run.app/vehicles');

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json(); // Obtiene el resultado completo
             // Verifica la estructura de los datos
            setVehicles(result.data); // Accede a la propiedad `data` del objeto
        } catch (error) {
            console.error('Error al obtener los vehículos:', error);
            setError(error.message);
        } finally {
            setLoading(false); // Detiene el indicador de carga
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    useEffect(() => {

    }, [vehicles]);

    const renderVehicle = ({ item }) => (
        <View style={styles.vehicleContainer}>
            <Image source={require('../../assets/images/car.jpg')} style={styles.vehicleImage} />
            <View style={styles.vehicleDetails}>
                <Text style={styles.vehicleName}>{item.brand} {item.brand_year}</Text>
                <Text style={styles.vehicleInfo}>Placa: {item.vehicle_plate}</Text>
                <Text style={styles.vehicleInfo}>Color: {item.color}</Text>
                <Text style={styles.vehicleInfo}>Año: {item.year}</Text>
            </View>
            <TouchableOpacity
                style={styles.selectButton}
                onPress={() => navigation.navigate('Detalles Monitoreo', { vehicleId: item.id })}
            >
                <Text style={styles.selectButtonText}>Seleccionar</Text>
            </TouchableOpacity>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#004270" />
                <Text style={styles.loadingText}>Cargando vehículos...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>

            <FlatList
                data={vehicles}
                renderItem={renderVehicle}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#004270',
        marginBottom: 15,
        textAlign: 'center',
    },
    vehicleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: '#F8F9FB',
        padding: 10,
        borderRadius: 8,
    },
    vehicleImage: {
        width: 60,
        height: 60,
        marginRight: 10,
    },
    vehicleDetails: {
        flex: 1,
    },
    vehicleName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#004270',
    },
    vehicleInfo: {
        fontSize: 12,
        color: '#6C757D',
    },
    selectButton: {
        backgroundColor: '#FFC107',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
    },
    selectButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        color: '#004270',
        fontSize: 16,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
});
