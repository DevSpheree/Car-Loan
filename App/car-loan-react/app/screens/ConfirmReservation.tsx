import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Ionicons} from "@expo/vector-icons";

export default function ConfirmReservation({ route, navigation }) {
    const { vehicle, pickupDate, pickupTime, returnDate, returnTime, destinationAlias, reason } = route.params; // Incluido el campo 'reason'

    const handleConfirm = async () => {
        try {
            const clientId = await AsyncStorage.getItem('uid');
            if (!clientId) {
                Alert.alert('Error', 'No se encontró el ID del cliente. Inicia sesión nuevamente.');
                return;
            }

            const fullPickupDate = new Date(`${pickupDate}T${pickupTime}:00`);
            const fullReturnDate = new Date(`${returnDate}T${returnTime}:00`);
            const usageTime = Math.round((fullReturnDate - fullPickupDate) / (1000 * 60 * 60));

            const reservationData = {
                vehicle_id: vehicle.id,
                client_id: clientId,
                date: fullPickupDate.toISOString(),
                destination: destinationAlias,
                reason, // Se incluye el motivo en la reserva
                return_date: fullReturnDate.toISOString(),
                return_status: 'NO_FINALIZADA',
                status: 'PENDIENTE',
                usage_time: usageTime,
            };

            const response = await fetch(
                'https://car-loan-go-703279496082.us-east1.run.app/applications',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(reservationData),
                }
            );

            if (response.ok) {
                Alert.alert('Éxito', 'Reserva confirmada exitosamente.');
                navigation.navigate('Mis Vehiculos'); // Navegar a "Mis Vehículos"
            } else {
                const errorText = await response.text();
                console.error('Error al reservar:', errorText);
                Alert.alert('Error', 'Ocurrió un error al realizar la reserva.');
            }
        } catch (error) {
            console.error('Error de red:', error);
            Alert.alert('Error', 'Ocurrió un error de red al realizar la reserva.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.cameraButtonContainer}>
                <TouchableOpacity style={styles.cameraButton}>
                    <Ionicons
                        name="bookmark-outline"
                        size={50}
                        color="#004270"
                    />
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>Detalle</Text>
            <Text style={styles.subtitle}>Por favor revise los datos de la reserva</Text>

            <View style={styles.section}>
                <Text style={styles.text}>
                    Retiro: {pickupDate} {pickupTime}
                </Text>
                <Text style={styles.text}>
                    Retorno: {returnDate} {returnTime}
                </Text>
                <Text style={styles.text}>Destino: {destinationAlias}</Text>
                <Text style={styles.text}>Motivo: {reason}</Text> {/* Mostrar el motivo */}
                <Text style={styles.text}>
                    Vehículo: {vehicle.brand} {vehicle.brand_year}
                </Text>
            </View>

            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                <Text style={styles.confirmButtonText}>Confirmar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', color: '#004270' },
    subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
    section: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#57AEF1',
        borderRadius: 8,
        marginBottom: 20,
        backgroundColor: '#F8F9FB'
    },
    text: { fontSize: 16, marginBottom: 10 },
    confirmButton: {
        backgroundColor: '#004270',
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
    },
    confirmButtonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
    cameraButton: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#FFF8DC', // Fondo claro para el botón
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginTop: 40

    },
    cameraButtonContainer: {  // Estilos para el contenedor del botón
        alignItems: 'center', // Centrar horizontalmente
        marginBottom: 20,
    },
});
