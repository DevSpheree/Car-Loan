import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Alert,
    TextInput,
} from 'react-native';

const API_URL = 'https://car-loan-go-703279496082.us-east1.run.app/applications';
const USER_ID = 'XnR9OUTJeUbmFTO9b5l1V5XkVQE3'; // ID del usuario quemado

export default function Requests({ navigation }) {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await fetch(`${API_URL}?user_id=${USER_ID}`);
            const data = await response.json();
            setRequests(data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusPress = (request) => {
        navigation.navigate('RequestDetails', { request });
    };

    const renderRequest = ({ item }) => (
        <View style={styles.requestCard}>
            <Text style={styles.vehicleName}>{item.vehicle_name}</Text>
            <Text style={styles.requestDetails}>Destino: {item.destination}</Text>
            <Text style={styles.requestDetails}>Fecha de retiro: {new Date(item.date).toLocaleString()}</Text>
            <Text style={styles.requestDetails}>Fecha de retorno: {new Date(item.return_date).toLocaleString()}</Text>
            <TouchableOpacity
                style={[
                    styles.statusButton,
                    item.status === 'PENDIENTE' && styles.pending,
                    item.status === 'ACEPTADO' && styles.accepted,
                    item.status === 'RECHAZADO' && styles.rejected,
                ]}
                onPress={() => handleStatusPress(item)}
            >
                <Text style={styles.statusText}>{item.status}</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Solicitudes</Text>
            {loading ? (
                <Text>Cargando...</Text>
            ) : (
                <FlatList
                    data={requests}
                    keyExtractor={(item) => item.id}
                    renderItem={renderRequest}
                />
            )}
        </View>
    );
}

export function RequestDetails({ route, navigation }) {
    const { request } = route.params;

    const handleConfirm = async () => {
        try {
            await fetch(`${API_URL}/${request.id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'ACEPTADO' }),
            });
            Alert.alert('Éxito', 'La solicitud ha sido aceptada.');
            navigation.goBack();
        } catch (error) {
            console.error('Error confirming request:', error);
            Alert.alert('Error', 'No se pudo aceptar la solicitud.');
        }
    };

    const handleReject = () => {
        navigation.navigate('RejectReason', { request });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalles de la Solicitud</Text>
            <Text style={styles.requestDetails}>Vehículo: {request.vehicle_name}</Text>
            <Text style={styles.requestDetails}>Destino: {request.destination}</Text>
            <Text style={styles.requestDetails}>Fecha de retiro: {new Date(request.date).toLocaleString()}</Text>
            <Text style={styles.requestDetails}>Fecha de retorno: {new Date(request.return_date).toLocaleString()}</Text>
            <Text style={styles.requestDetails}>Motivo: {request.reason}</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
                    <Text style={styles.buttonText}>Rechazar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                    <Text style={styles.buttonText}>Confirmar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export function RejectReason({ route, navigation }) {
    const { request } = route.params;
    const [reason, setReason] = useState('');

    const handleReject = async () => {
        if (!reason.trim()) {
            Alert.alert('Error', 'Por favor ingresa un motivo.');
            return;
        }

        try {
            await fetch(`${API_URL}/${request.id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'RECHAZADO', reason }),
            });
            Alert.alert('Éxito', 'La solicitud ha sido rechazada.');
            navigation.goBack();
        } catch (error) {
            console.error('Error rejecting request:', error);
            Alert.alert('Error', 'No se pudo rechazar la solicitud.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Motivo de Rechazo</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingresa el motivo de rechazo"
                value={reason}
                onChangeText={setReason}
            />
            <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
                <Text style={styles.buttonText}>Confirmar Rechazo</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
    requestCard: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
    },
    vehicleName: { fontSize: 18, fontWeight: 'bold' },
    requestDetails: { fontSize: 14, marginTop: 5 },
    statusButton: {
        marginTop: 10,
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    pending: { backgroundColor: '#FEBE10' },
    accepted: { backgroundColor: '#004270' },
    rejected: { backgroundColor: '#ACACAC' },
    statusText: { color: '#fff', fontWeight: 'bold' },
    buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
    confirmButton: { backgroundColor: '#004270', padding: 15, borderRadius: 8, flex: 1, marginRight: 10 },
    rejectButton: { backgroundColor: '#FEBE10', padding: 15, borderRadius: 8, flex: 1 },
    buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
    input: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
    },
});
