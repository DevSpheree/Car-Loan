import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ícono de cámara
import * as ImagePicker from 'expo-image-picker'; // Librería para la cámara

export default function PhotoCapture({ route, navigation }) {
    const { requestData } = route.params;
    const [isUploading, setIsUploading] = useState(false); // Indicador de carga

    const openCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert(
                'Permiso denegado',
                'Se requiere permiso para acceder a la cámara.',
            );
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
        });

        if (!result.canceled) {
            uploadImage(result.assets[0].uri);
        }
    };

    const uploadImage = async (imageUri) => {
        const formData = new FormData();

        // Convertimos la imagen a un archivo válido
        formData.append('image', {
            uri: imageUri,
            type: 'image/jpeg',
            name: 'photo.jpg',
        });

        setIsUploading(true); // Activar indicador de carga

        try {
            const response = await fetch(
                `https://car-loan-go-703279496082.us-east1.run.app/vehicles/${requestData.vehicle_id}/image`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    body: formData,
                }
            );

            const result = await response.json();

            if (response.ok) {
                Alert.alert('Éxito', 'Imagen subida correctamente.');
            } else {
                Alert.alert(
                    'Error al subir imagen',
                    result.message || 'Ocurrió un problema al procesar la solicitud.'
                );
            }
        } catch (error) {
            Alert.alert('Error', 'No se pudo conectar con el servidor.');
        } finally {
            setIsUploading(false); // Desactivar indicador de carga
        }
    };

    const handleNext = () => {
        navigation.navigate('Checklist', { requestData });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.cameraButton} onPress={openCamera} disabled={isUploading}>
                <Ionicons name="camera-outline" size={50} color={isUploading ? '#999' : '#004270'} />
            </TouchableOpacity>

            {isUploading && <ActivityIndicator size="large" color="#004270" style={styles.loading} />}

            <Text style={styles.title}>Toca el ícono para tomar una foto</Text>
            <Text style={styles.content}>Vehículo: {requestData.vehicle_name}</Text>
            <Text style={styles.content}>Solicitante: {requestData.client.email}</Text>

            <TouchableOpacity style={styles.validateButton} onPress={handleNext} disabled={isUploading}>
                <Text style={styles.buttonText}>Realizar Checklist</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#FFF',
        paddingBottom: 130,
    },
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
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 20,
        color: '#004270',
    },
    content: {
        fontSize: 16,
        color: '#4B5563',
        marginVertical: 10,
    },
    validateButton: {
        marginTop: 10,
        backgroundColor: '#004270',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
    loading: {
        marginTop: 10,
    },
});
