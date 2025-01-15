import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';

export default function MyVehicles({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [vehicles, setVehicles] = useState([]);
    const [filteredVehicles, setFilteredVehicles] = useState([]);

    // Función para consumir la API
    const fetchVehicles = async () => {
        try {
            const response = await fetch('https://car-loan-go-703279496082.us-east1.run.app/vehicles');
            const data = await response.json();
            if (data.success) {
                setVehicles(data.data);
                setFilteredVehicles(data.data);
            } else {
                console.error('Error al obtener los vehículos:', data.message);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    // Función para filtrar vehículos
    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.trim() === '') {
            setFilteredVehicles(vehicles);
        } else {
            const filtered = vehicles.filter((vehicle) =>
                `${vehicle.Brand} ${vehicle.Model}`.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredVehicles(filtered);
            console.log(filteredVehicles)
        }
    };

    const renderVehicleItem = ({ item }) => (
        <View style={styles.vehicleItem}>
            {/* Imagen del vehículo (puedes usar un marcador si no hay una URL) */}
            <Image
                source={{ uri: 'https://via.placeholder.com/100' }} // Sustituir por una URL real si existe
                style={styles.vehicleImage}
            />
            <View style={styles.vehicleInfo}>
                <Text style={styles.vehicleTitle}>{`${item.brand} ${item.model}`}</Text>
                <Text style={styles.vehicleDetail}>Color: {item.color}</Text>
                <Text style={styles.vehicleDetail}>Año: {item.year}</Text>
                <Text style={styles.vehicleDetail}>Capacidad de combustible: {item.fuel_capacity}L</Text>
                <Text style={styles.vehicleDetail}>Tipo de combustible: {item.fuel_type}</Text>
            </View>
            <TouchableOpacity
                style={styles.viewButton}
                onPress={() => navigation.navigate('Detalles Vehículo', { vehicle: item })}
            >
                <Text style={styles.viewButtonText}>Visualizar</Text>
            </TouchableOpacity>
        </View>
    );



    return (
        <View style={styles.container}>
            {/* Barra de búsqueda */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar por marca o modelo"
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
                <TouchableOpacity style={styles.filterButton}>
                    <Text style={styles.filterIcon}>⚙️</Text>
                </TouchableOpacity>
            </View>

            {/* Lista de vehículos */}
            <Text style={styles.vehicleCount}>
                {filteredVehicles.length} vehículos disponibles
            </Text>
            <FlatList
                data={filteredVehicles}
                renderItem={renderVehicleItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.vehicleList}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
    },
    filterButton: {
        marginLeft: 10,
    },
    filterIcon: {
        fontSize: 20,
        color: '#004270',
    },
    vehicleCount: {
        fontSize: 16,
        color: '#FFA500',
        marginBottom: 10,
    },
    vehicleList: {
        paddingBottom: 20,
    },
    vehicleItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        elevation: 2,
    },
    vehicleImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 10,
    },
    vehicleInfo: {
        flex: 1,
    },
    vehicleTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#004270',
    },
    vehicleDetail: {
        fontSize: 10,
        color: '#555',
    },
    viewButton: {
        backgroundColor: '#FFA500',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    viewButtonText: {
        fontSize: 8,
        color: '#fff',
        fontWeight: 'bold',
    },
});
