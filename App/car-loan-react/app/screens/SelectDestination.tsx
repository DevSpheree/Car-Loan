import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function SelectDestination({ route, navigation }) {
    const { setDestination } = route.params;
    const [selectedLocation, setSelectedLocation] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);

    const handleMapPress = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;

        // Actualiza la ubicación seleccionada
        setSelectedLocation({ latitude, longitude });
    };

    const handleConfirm = () => {
        if (!selectedLocation) {
            Alert.alert('Error', 'Por favor selecciona un destino en el mapa.');
            return;
        }

        // Convierte las coordenadas a texto simple (puedes agregar una descripción más detallada si es necesario)
        const destinationText = `Lat: ${selectedLocation.latitude}, Lng: ${selectedLocation.longitude}`;
        setDestination(destinationText);

        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Seleccionar Destino</Text>

            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: -2.189412, // Coordenadas iniciales (puedes ajustarlas)
                    longitude: -79.889066,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
                onPress={handleMapPress}
            >
                {selectedLocation && (
                    <Marker coordinate={selectedLocation} title="Destino seleccionado" />
                )}
            </MapView>

            <Text style={styles.destinationText}>
                {selectedLocation
                    ? `Destino seleccionado: Lat: ${selectedLocation.latitude.toFixed(
                        4
                    )}, Lng: ${selectedLocation.longitude.toFixed(4)}`
                    : 'Selecciona un punto en el mapa'}
            </Text>

            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                <Text style={styles.confirmButtonText}>Confirmar Destino</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 20, marginTop:10},
    title: { fontSize: 20, fontWeight: 'bold', margin: 20 },
    map: { flex: 1, marginBottom: 20 },
    destinationText: { fontSize: 16, marginHorizontal: 20, marginBottom: 10, textAlign: 'center' },
    confirmButton: {
        backgroundColor: '#004270',
        padding: 15,
        borderRadius: 8,
        margin: 20,
    },
    confirmButtonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
