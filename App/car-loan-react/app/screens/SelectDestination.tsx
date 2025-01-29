import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function SelectDestination({ navigation }) {
    const [selectedLocation, setSelectedLocation] = useState(null);

    const handleMapPress = (event) => {
        setSelectedLocation(event.nativeEvent.coordinate);
    };

    const handleConfirm = () => {
        if (!selectedLocation) {
            Alert.alert('Error', 'Por favor selecciona un destino en el mapa.');
            return;
        }

        // Simplemente regresa a la pantalla anterior
        navigation.navigate('Reservar Vehiculo');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Seleccionar Destino</Text>

            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: -2.189412,
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

            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                <Text style={styles.confirmButtonText}>Confirmar Destino</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 20, marginTop: 10 },
    title: { fontSize: 20, fontWeight: 'bold', margin: 20, color: '#004270', marginTop: 20 },
    map: { flex: 1, marginBottom: 20, borderRadius: 10 },
    confirmButton: {
        backgroundColor: '#004270',
        padding: 15,
        borderRadius: 8,
        margin: 20,
    },
    confirmButtonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
