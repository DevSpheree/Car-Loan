import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    TextInput,
    Platform, ScrollView,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';

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
                <Text style={styles.title}>
                    Reservar {vehicle.brand} {vehicle.brand_year}
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Alias para el destino"
                    value={destinationAlias}
                    onChangeText={setDestinationAlias}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Razón para la reserva"
                    value={reason}
                    onChangeText={setReason}
                />

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
                            [returnDate]: { selected: true, selectedColor: '#A52019' },
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
            </View>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#004270',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#d9d9d9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
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
});
