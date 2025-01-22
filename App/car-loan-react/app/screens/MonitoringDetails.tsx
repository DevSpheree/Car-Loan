import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

export default function MonitoringDetails({ navigation, route }) {
    const { vehicleId } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.infoBox}>
                <Text style={styles.infoText}>Solicitante: Armando Cabrera</Text>
                <Text style={styles.infoText}>Origen: UTPL</Text>
                <Text style={styles.infoText}>Destino: Sozoranga</Text>
            </View>


                <Text style={styles.sectionTitle}>Ubicación Vehículo</Text>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: -4.007890,
                        longitude: -79.211276,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    <Marker coordinate={{ latitude: -4.007890, longitude: -79.211276 }} />
                </MapView>

                <Text style={styles.sectionTitle}>Ruta del Conductor</Text>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: -4.007890,
                        longitude: -79.211276,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    }}
                >
                    <Polyline
                        coordinates={[
                            { latitude: -4.007890, longitude: -79.211276 },
                            { latitude: -4.009000, longitude: -79.200000 },
                        ]}
                        strokeColor="#0000FF"
                        strokeWidth={3}
                    />
                </MapView>



            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>Volver</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 20,
    },
    infoBox: {
        backgroundColor: '#F8F9FB',
        padding: 15,
        borderRadius: 8,
        marginBottom: 30,
        marginTop: 10,
        width: 200,
        borderColor:'#57AEF1',
        marginHorizontal: "auto",
        borderWidth: 1,
    },
    infoText: {
        fontSize: 14,
        color: '#004270',
        marginBottom: 5,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#004270',
        marginBottom: 10,
    },
    map: {
        width: '100%',
        height: 150,
        marginVertical: 15,
        borderRadius: 8,
    },
    backButton: {
        backgroundColor: '#004270',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    backButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});
