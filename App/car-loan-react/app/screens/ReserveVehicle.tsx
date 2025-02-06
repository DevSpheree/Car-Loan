import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    TextInput,
    Platform, ScrollView, Modal, ActivityIndicator,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Ionicons} from "@expo/vector-icons";
import MapView, {Marker} from "react-native-maps";
import * as DocumentPicker from 'expo-document-picker';
import { DocumentPickerAsset } from 'expo-document-picker';
import DropDownPicker from 'react-native-dropdown-picker';


const [permissionFile, setPermissionFile] = useState<DocumentPickerAsset | null>(null);



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

    // Estado para almacenar el archivo seleccionado
    const [permissionFile, setPermissionFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);

    // Estados para el Dropdown Picker
    const [drivers, setDrivers] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [open, setOpen] = useState(false);
    const [loadingDrivers, setLoadingDrivers] = useState(true);

    // Cargar conductores desde la API
    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await fetch("https://car-loan-go-703279496082.us-east1.run.app/drivers");
                const data = await response.json();

                if (data.success && Array.isArray(data.data)) {
                    // Mapear los conductores para usarlos en el dropdown
                    const formattedDrivers = data.data.map(driver => ({
                        label: `${driver.name} ${driver.last_name}`,
                        value: driver.id
                    }));
                    setDrivers(formattedDrivers);
                } else {
                    Alert.alert("Error", "No se pudieron cargar los conductores.");
                }
            } catch (error) {
                console.error("Error al obtener conductores:", error);
                Alert.alert("Error", "No se pudieron cargar los conductores.");
            } finally {
                setLoadingDrivers(false);
            }
        };

        fetchDrivers();
    }, []);

    const handleTimeChange = (event, selectedTime) => {
        setShowTimePicker(false);
        if (!selectedTime) return;

        const hours = selectedTime.getHours().toString().padStart(2, '0');
        const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;

        if (timePickerType === 'pickup') setPickupTime(formattedTime);
        if (timePickerType === 'return') setReturnTime(formattedTime);
    };

    // Función para seleccionar un archivo
    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*',
                copyToCacheDirectory: true,
            });

            if (result.canceled || !result.assets || result.assets.length === 0) {
                Alert.alert("Error", "No seleccionaste ningún archivo.");
                return;
            }

            const file = result.assets[0]; // Obtener el archivo seleccionado
            console.log("📂 Archivo seleccionado:", file); // 👈 Agrega este log
            setPermissionFile(file);
        } catch (error) {
            console.error("Error al seleccionar documento:", error);
            Alert.alert("Error", "No se pudo seleccionar el archivo.");
        }
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
            permissionFile,
            driverId: selectedDriver, // Pasar el ID del conductor seleccionado

        });
        console.log("Archivo seleccionado:", permissionFile);

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

                {/* Dropdown Picker para seleccionar conductor */}
                <Text style={styles.label}>Conductor (Opcional)</Text>
                {loadingDrivers ? (
                    <ActivityIndicator size="small" color="#004270" />
                ) : (
                    <DropDownPicker
                        open={open}
                        value={selectedDriver}
                        items={drivers}
                        setOpen={setOpen}
                        setValue={setSelectedDriver}
                        setItems={setDrivers}
                        placeholder="Selecciona un conductor"
                        style={styles.dropdown}
                        dropDownContainerStyle={styles.dropdownContainer}
                    />
                )}

                <View style={styles.inputWithButton}>

                    <Text style={styles.text}>
                        {permissionFile ? permissionFile.name : 'Seleccionar archivo'}
                    </Text>
                    <TouchableOpacity style={styles.destinationButton1} onPress={pickDocument}>
                        <Ionicons name="document-outline" size={20} color="#004270" />
                    </TouchableOpacity>
                </View>


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
    destinationButton1: {
        padding: 10,
        backgroundColor: '#E9B40A',
        borderRadius: 15,
        marginLeft: 100,
    },
    modalContainer: { flex: 1 },
    map: { flex: 1 },
    closeButton: { backgroundColor: '#004270', padding: 15, alignItems: 'center', },
    closeButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    label: { fontSize: 16, color: '#004270', marginBottom: 5 },
    dropdown: {
        backgroundColor: "#F3F4F6",
        borderColor: "#D1D5DB",
        marginBottom: 10,
    },
    dropdownContainer: {
        backgroundColor: "#FFF",
        borderColor: "#D1D5DB",
    },
});
