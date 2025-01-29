import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Validation({ navigation }) {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const userId = await AsyncStorage.getItem('uid');
                const response = await fetch(`https://car-loan-go-703279496082.us-east1.run.app/applications?user_id=${userId}`);
                const data = await response.json();
                if (data.success) {
                    const pendingReturns = data.data.filter((item) => item.return_status === 'NO_FINALIZADA' && item.status === 'APROBADA');
                    setRequests(pendingReturns);
                }
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };

        fetchRequests();
    }, []);

    const handleValidation = (item) => {
        navigation.navigate('Captura de Foto', { requestData: item });
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.title}>{item.vehicle_name}</Text>
            <Text style={styles.content}>Destino: {item.destination}</Text>
            <Text style={styles.content}>Usuario: {item.client.email}</Text>
            <Text style={styles.content}>Fecha de Retorno: {new Date(item.return_date).toLocaleString()}</Text>
            <TouchableOpacity style={styles.validateButton} onPress={() => handleValidation(item)}>
                <Text style={styles.buttonText}>Validar</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={requests}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, backgroundColor: '#FFF' },
    card: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 12, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
    title: { fontSize: 16, fontWeight: 'bold', color: '#004270' },
    validateButton: { marginTop: 10, backgroundColor: '#004270', padding: 10, borderRadius: 5 },
    buttonText: { color: '#fff', textAlign: 'center' },
    content: { marginTop: 8 },
});
