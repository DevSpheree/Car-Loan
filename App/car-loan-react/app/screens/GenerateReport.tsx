import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const GenerateReport = ({ route }) => {
    const { requestData } = route.params;
    const [observations, setObservations] = useState('');
    const API_URL = "https://car-loan-go-703279496082.us-east1.run.app/returns";

    const handleSave = async () => {
        if (!observations.trim()) {
            Alert.alert('Error', 'Por favor, ingresa las observaciones antes de guardar.');
            return;
        }

        const requestBody = {
            application_id: requestData.id,
            observations: observations.trim()
        };

        console.log("📡 Enviando datos a la API:", JSON.stringify(requestBody));

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            const responseData = await response.json();
            console.log("✅ Respuesta de la API:", responseData);

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            Alert.alert('Éxito', 'Devolución guardada exitosamente.');
        } catch (error) {
            console.error("❌ Error al enviar la solicitud:", error);
            Alert.alert('Error', `Hubo un problema al guardar la devolución: ${error.message}`);
        }
    };


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.cameraButtonContainer}>
                <TouchableOpacity style={styles.cameraButton}>
                    <Ionicons name="arrow-undo-circle-outline" size={50} color="#004270" />
                </TouchableOpacity>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.label}>Vehículo:</Text>
                <Text style={styles.value}>{requestData.vehicle_name}</Text>

                <Text style={styles.label}>Destino:</Text>
                <Text style={styles.value}>{requestData.destination}</Text>

                <Text style={styles.label}>Fecha de Retiro:</Text>
                <Text style={styles.value}>{new Date(requestData.date).toLocaleString()}</Text>

                <Text style={styles.label}>Fecha de Retorno:</Text>
                <Text style={styles.value}>{new Date(requestData.return_date).toLocaleString()}</Text>

                <Text style={styles.label}>Motivo:</Text>
                <Text style={styles.value}>{requestData.reason}</Text>

                <Text style={styles.label}>Tiempo de uso:</Text>
                <Text style={styles.value}>{requestData.usage_time || 'N/A'}</Text>

                <Text style={styles.label}>Estado:</Text>
                <Text style={styles.value}>{requestData.status}</Text>
            </View>

            <Text style={styles.label}>Observaciones:</Text>
            <TextInput
                style={styles.input}
                placeholder="Escribe tus observaciones aquí..."
                value={observations}
                onChangeText={setObservations}
                multiline
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Guardar Devolución</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#FFF',
        flexGrow: 1,
    },
    infoContainer: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    value: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#F3F4F6',
        borderRadius: 10,
        padding: 15,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        fontSize: 16,
        color: '#333',
        marginBottom: 20,
        minHeight: 100,
        textAlignVertical: 'top',
    },
    saveButton: {
        backgroundColor: '#004270',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cameraButton: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#FFF8DC',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cameraButtonContainer: {
        alignItems: 'center',
        marginBottom: 7,
    },
});

export default GenerateReport;
