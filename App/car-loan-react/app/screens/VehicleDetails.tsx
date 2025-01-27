import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '@/firebaseConfig';
import AsyncStorage from "@react-native-async-storage/async-storage"; // Asegúrate de tener tu configuración de Firebase aquí

export default function VehicleDetails({ route, navigation }) {
    const { vehicle } = route.params;
    const [role, setRole] = React.useState('');

    React.useEffect(() => {
        const fetchRole = async () => {
            try {
                const storedRole = await AsyncStorage.getItem("role"); // Recupera el rol del almacenamiento
                if (storedRole) {
                    setRole(storedRole);
                } else {
                    Alert.alert("Error", "No se pudo recuperar el rol del usuario.");
                }
            } catch (error) {
                console.error("Error al obtener el rol:", error);
                Alert.alert("Error", "Ocurrió un problema al recuperar el rol del usuario.");
            }
        };

        fetchRole();
    }, []);


    const handleAction = () => {
        if (role === 'ADMIN') {
            navigation.goBack();
        } else if (role === 'CLIENT') {
            navigation.navigate('Reservar Vehiculo', { vehicle }); // Pasa el objeto vehicle a la pantalla de reserva
        }
    };

    return (
        <View style={styles.container}>
            {/* Imagen genérica */}
            <Image
                source={{ uri: vehicle.img_url || 'https://acroadtrip.blob.core.windows.net/catalogo-imagenes/xl/RT_V_253bb2bf37834fcc94aab18693c17252.webp' }}
                style={styles.vehicleImage}
            />

            {/* Título */}
            <Text style={styles.vehicleTitle}>{`${vehicle.brand} ${vehicle.brand_year}`}</Text>

            {/* Detalles */}
            <View style={styles.detailsContainer}>
                <Text style={styles.detailText}>Placa: {vehicle.vehicle_plate}</Text>
                <Text style={styles.detailText}>Responsable: {vehicle.responsible}</Text>
                <Text style={styles.detailText}>Tipo: {vehicle.type}</Text>
                <Text style={styles.detailText}>Ubicación: {vehicle.activity_location}</Text>
                <Text style={styles.detailText}>Año: {vehicle.year}</Text>
            </View>

            {/* Estadísticas */}
            <View style={styles.statsContainer}>
                <View style={styles.statBox}>
                    <Text style={styles.statValue}>{vehicle.fuel || 'N/A'}</Text>
                    <Text style={styles.statLabel}>Tipo de combustible</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statValue}>{vehicle.fuel_capacity}</Text>
                    <Text style={styles.statLabel}>Capacidad de combustible</Text>
                </View>
            </View>

            {/* Botón */}
            <TouchableOpacity style={styles.actionButton} onPress={handleAction}>
                <Text style={styles.actionButtonText}>
                    {role === 'ADMIN' ? 'Volver' : 'Reservar'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 20 },
    vehicleImage: { width: '100%', height: 200, resizeMode: 'contain', marginBottom: 20 },
    vehicleTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#004270' },
    detailsContainer: { marginVertical: 20 },
    detailText: { fontSize: 16, marginBottom: 5, color: '#333' },
    statsContainer: { flexDirection: 'row', justifyContent: 'center', marginVertical: 20 },
    statBox: { backgroundColor: '#FFEDC0', padding: 15, borderRadius: 10, alignItems: 'center', width: '45%', marginHorizontal:10 },
    statValue: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    statLabel: { fontSize: 14, color: '#555' },
    actionButton: { backgroundColor: '#004270', paddingVertical: 15, borderRadius: 10, alignItems: 'center', marginVertical: 20 },
    actionButtonText: { fontSize: 16, color: '#fff' },
});
