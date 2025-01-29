import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    TextInput,
    Platform, ScrollView, Modal,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Ionicons} from "@expo/vector-icons";
import MapView, {Marker} from "react-native-maps";

export default function ReserveVehicle({ route, navigation }) {
    const { vehicle } = route.params;
    const [destinationAlias, setDestinationAlias] = useState('');
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [pickupTime, setPickupTime] = useState('08:00');
    const [returnTime, setReturnTime] = useState('17:00');
    const [reason, setReason] = useState(''); // Nuevo campo para la razón
    const [calendarType, setCalendarType] = useState(null);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [timePickerType, setTimePickerType] = useState(null);

    // Estado para manejar la visibilidad del modal del mapa
    const [mapModalVisible, setMapModalVisible] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);

    const handleTimeChange = (event, selectedTime) => {
        setShowTimePicker(false);
        if (!selectedTime) return;

        const hours = selectedTime.getHours().toString().padStart(2, '0');
        const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;

        if (timePickerType === 'pickup') setPickupTime(formattedTime);
        if (timePickerType === 'return') setReturnTime(formattedTime);
    };

    const handleReserve = () => {
        if (!pickupDate || !returnDate) {
            Alert.alert('Error', 'Por favor selecciona ambas fechas.');
            return;
        }

        if (!destinationAlias) {
            Alert.alert('Error', 'Por favor ingresa un alias para el destino.');
            return;
        }

        if (!reason) {
            Alert.alert('Error', 'Por favor proporciona una razón para la reserva.');
            return;
        }

        navigation.navigate('ConfirmReservation', {
            vehicle,
            pickupDate,
            pickupTime,
            returnDate,
            returnTime,
            destinationAlias,
            reason, // Enviando el campo a la siguiente pantalla
        });
    };

    return (
        <ScrollView>
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
                <Text style={styles.title}>
                    Reservar {vehicle.brand} {vehicle.brand_year}
                </Text>

                {/* Alias del destino con botón al lado */}
                <View style={styles.inputWithButton}>
                    <TextInput
                        style={styles.inputField}
                        value={destinationAlias}
                        onChangeText={setDestinationAlias}
                    />
                    {!destinationAlias && <Text style={styles.placeholderText}>Alias para el destino</Text>}
                    <TouchableOpacity
                        style={styles.destinationButton}
                        onPress={() => setMapModalVisible(true)}
                    >
                        <Ionicons name="map-outline" size={20} color="#004270" />
                    </TouchableOpacity>
                </View>

                {/* Razón para la reserva */}
                <View style={styles.inputWithButton}>
                    <TextInput
                        style={styles.inputField}
                        value={reason}
                        onChangeText={setReason}
                    />
                    {!reason && <Text style={styles.placeholderText}>Razón para la reserva</Text>}
                </View>

                <TouchableOpacity
                    onPress={() => setCalendarType('pickup')}
                    style={styles.input}
                >
                    <Text style={styles.text}>
                        {pickupDate ? `Fecha de retiro: ${pickupDate}` : 'Seleccionar fecha de retiro'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setCalendarType('return')}
                    style={styles.input}
                >
                    <Text style={styles.text}>
                        {returnDate ? `Fecha de retorno: ${returnDate}` : 'Seleccionar fecha de retorno'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setTimePickerType('pickup');
                        setShowTimePicker(true);
                    }}
                    style={styles.input}
                >
                    <Text style={styles.text}>{`Hora de retiro: ${pickupTime}`}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setTimePickerType('return');
                        setShowTimePicker(true);
                    }}
                    style={styles.input}
                >
                    <Text style={styles.text}>{`Hora de retorno: ${returnTime}`}</Text>
                </TouchableOpacity>

                {calendarType && (
                    <Calendar
                        onDayPress={(day) => {
                            if (calendarType === 'pickup') setPickupDate(day.dateString);
                            if (calendarType === 'return') setReturnDate(day.dateString);
                            setCalendarType(null);
                        }}
                        markedDates={{
                            [pickupDate]: { selected: true, selectedColor: '#004270' },
                            [returnDate]: { selected: true, selectedColor: '#E9B40A' },
                        }}
                    />
                )}

                {showTimePicker && (
                    <DateTimePicker
                        value={new Date()}
                        mode="time"
                        is24Hour={true}
                        display={Platform.OS === 'android' ? 'default' : 'spinner'}
                        onChange={handleTimeChange}
                    />
                )}

                <TouchableOpacity style={styles.reserveButton} onPress={handleReserve}>
                    <Text style={styles.reserveButtonText}>Reservar</Text>
                </TouchableOpacity>

                <Modal visible={mapModalVisible} animationType="slide">
                    <View style={styles.modalContainer}>
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: -3.99313, // Coordenadas de Loja
                                longitude: -79.20422,
                                latitudeDelta: 0.05,
                                longitudeDelta: 0.05,
                            }}
                            onPress={(event) => setSelectedLocation(event.nativeEvent.coordinate)}
                        >
                            {selectedLocation && (
                                <Marker coordinate={selectedLocation} title="Destino seleccionado" />
                            )}
                        </MapView>

                        <TouchableOpacity style={styles.closeButton} onPress={() => setMapModalVisible(false)}>
                            <Text style={styles.closeButtonText}>Seleccionar</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#FFF' },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#004270',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#F3F4F6',
        padding: 15,
        borderRadius: 20,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#D1D5DB',
    },
    text: {
        fontSize: 16,
        color: '#6c757d',
    },
    reserveButton: {
        backgroundColor: '#004270',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    reserveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
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
    cameraButtonContainer: {  // Estilos para el contenedor del botón
        alignItems: 'center', // Centrar horizontalmente
        marginBottom: 20,
    },
    inputWithButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        padding: 15,
        borderRadius: 20,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        position: 'relative',
    },
    inputField: { flex: 1, fontSize: 16, color: '#6c757d' },
    placeholderText: { position: 'absolute', left: 15, color: '#6c757d', fontSize: 16 },
    destinationButton: {
        padding: 10,
        backgroundColor: '#E9B40A',
        borderRadius: 15,
        marginLeft: 10,
    },
    modalContainer: { flex: 1 },
    map: { flex: 1 },
    closeButton: { backgroundColor: '#004270', padding: 15, alignItems: 'center', },
    closeButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
