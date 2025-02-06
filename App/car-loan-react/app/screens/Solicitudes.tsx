import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Alert,
    TextInput,
    Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Ionicons} from "@expo/vector-icons";
import DropDownPicker from 'react-native-dropdown-picker';


const API_URL = 'https://car-loan-go-703279496082.us-east1.run.app/applications';
const VEHICLES_API = 'https://car-loan-go-703279496082.us-east1.run.app/vehicles';


export default function Requests({ navigation }) {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const userId = await AsyncStorage.getItem('uid');
            if (!userId) {
                Alert.alert('Error', 'No se pudo obtener el usuario. Intenta reiniciar la aplicación.');
                return;
            }

            const response = await fetch(`${API_URL}?user_id=${userId}`);
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }

            const result = await response.json();
            if (result.success && Array.isArray(result.data)) {
                // Ordenar: primero las pendientes, luego el resto
                const sortedRequests = result.data.sort((a, b) => {
                    if (a.status === 'PENDIENTE' && b.status !== 'PENDIENTE') return -1;
                    if (a.status !== 'PENDIENTE' && b.status === 'PENDIENTE') return 1;
                    return 0;
                });

                setRequests(sortedRequests);
            } else {
                setRequests([]);
                console.warn('No hay solicitudes disponibles para este usuario.');
            }
        } catch (error) {
            console.error('Error al obtener las solicitudes:', error);
            Alert.alert('Error', 'No se pudieron cargar las solicitudes.');
        } finally {
            setLoading(false);
        }
    };


    const handleStatusPress = (request) => {
        if (request.status === 'PENDIENTE') {
            navigation.navigate('RequestDetails', {
                request,
                onUpdate: fetchRequests,
            });
        } else {
            Alert.alert(
                'Acción no permitida',
                'Solo puedes cancelar solicitudes pendientes.'
            );
        }
    };


    const renderRequest = ({ item }) => (
        <View style={styles.requestCard}>
            <Text style={styles.vehicleName}>{item.vehicle_name}</Text>
            <Text style={styles.requestDetails}>Destino: {item.destination}</Text>
            <Text style={styles.requestDetails}>Destino: {item.client.email}</Text>
            <Text style={styles.requestDetails}>Fecha de retiro: {new Date(item.date).toLocaleString()}</Text>
            <Text style={styles.requestDetails}>Fecha de retorno: {new Date(item.return_date).toLocaleString()}</Text>
            <TouchableOpacity
                style={[
                    styles.statusButton,
                    item.status === 'PENDIENTE' && styles.pending,
                    item.status === 'APROBADA' && styles.accepted,
                    item.status === 'RECHAZADA' && styles.rejected,
                    item.status === 'CANCELADA' && styles.rejected,
                ]}
                onPress={() => handleStatusPress(item)}
            >
                <Text style={styles.statusText}>{item.status}</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
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
    const { request, onUpdate } = route.params;
    const [role, setRole] = useState('');
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [openDropdown, setOpenDropdown] = useState(false);


    useEffect(() => {
        (async () => {
            const storedRole = await AsyncStorage.getItem('role');
            setRole(storedRole || '');
        })();
        fetchVehicles();
    }, []);

    const handleCancel = () => {
        navigation.navigate('RejectReason', {
            request,
            onUpdate,
            isCancel: true,
        });
    };

    const handleReject = () => {
        navigation.navigate('RejectReason', {
            request,
            onUpdate,
            isCancel: false,
        });
    };

    const handleBack = async () => {
        try {
            const userId = await AsyncStorage.getItem('uid');
            if (!userId) {
                Alert.alert('Error', 'No se pudo obtener el usuario.');
                return;
            }

            const params = new URLSearchParams({
                application_id: request.id,
                user_id: userId,
            });

            const body = { status: 'APROBADA' };

            const response = await fetch(`${API_URL}/status?${params.toString()}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const result = await response.json();
            if (result.success) {
                Alert.alert('Éxito', 'La solicitud ha sido aprobada.');
                onUpdate();  // Recargar la lista de solicitudes
                navigation.navigate('Solicitudes'); // Volver a la lista
            } else {
                Alert.alert('Error', `No se pudo aprobar la solicitud: ${result.message || 'Error desconocido'}`);
            }
        } catch (error) {
            console.error('Error al aprobar la solicitud:', error);
            Alert.alert('Error', 'No se pudo aprobar la solicitud.');
        }
    };

    // Obtener lista de vehículos
    const fetchVehicles = async () => {
        try {
            const response = await fetch(VEHICLES_API);
            const result = await response.json();
            if (result.success) {
                const formattedVehicles = result.data.map(vehicle => ({
                    label: `${vehicle.brand} ${vehicle.brand_year}`,
                    value: vehicle.id
                }));
                setVehicles(formattedVehicles);
            } else {
                Alert.alert('Error', 'No se pudieron cargar los vehículos.');
            }
        } catch (error) {
            console.error('Error al obtener vehículos:', error);
            Alert.alert('Error', 'No se pudieron obtener los vehículos.');
        }
    };

    // Asignar un nuevo vehículo a la solicitud
    const assignVehicle = async () => {
        if (!selectedVehicle) {
            Alert.alert('Error', 'Selecciona un vehículo antes de asignarlo.');
            return;
        }

        try {
            const userId = await AsyncStorage.getItem('uid');
            if (!userId) {
                Alert.alert('Error', 'No se pudo obtener el usuario.');
                return;
            }

            const response = await fetch(`${API_URL}/${request.id}?user_id=${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ vehicle_id: selectedVehicle, status:"APROBADA" })
            });

            const result = await response.json();
            if (result.success) {
                Alert.alert('Éxito', 'Vehículo asignado correctamente.');
                onUpdate();
                navigation.goBack();
            } else {
                Alert.alert('Error', `No se pudo asignar el vehículo: ${result.message || 'Error desconocido'}`);
            }
        } catch (error) {
            console.error('Error al asignar vehículo:', error);
            Alert.alert('Error', 'No se pudo asignar el vehículo.');
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.cameraButtonContainer}>
                <TouchableOpacity style={styles.cameraButton}>
                    <Ionicons name="receipt-outline" size={70} color="#004270" />
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>Detalles de la Solicitud</Text>
            <Text style={styles.requestDetails}>Vehículo: {request.vehicle_name}</Text>
            <Text style={styles.requestDetails}>Destino: {request.destination}</Text>
            <Text style={styles.requestDetails}>Fecha de retiro: {new Date(request.date).toLocaleString()}</Text>
            <Text style={styles.requestDetails}>Fecha de retorno: {new Date(request.return_date).toLocaleString()}</Text>
            <Text style={styles.requestDetails}>Correo: {request.client.email}</Text>
            <Text style={styles.requestDetails}>Motivo: {request.reason}</Text>

            <View style={styles.buttonContainer}>
                {role === 'ADMIN' ? (
                    <>
                        <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
                            <Text style={styles.buttonText}>Rechazar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.confirmButton} onPress={handleBack}>
                            <Text style={styles.buttonText}>Confirmar</Text>
                        </TouchableOpacity>
                    </>


                ) : (
                    <>
                        <TouchableOpacity style={styles.rejectButton} onPress={handleCancel}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.confirmButton} onPress={handleBack}>
                            <Text style={styles.buttonText}>Volver</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
            {/* Dropdown y botón de asignación (solo para ADMIN) */}
            {role === 'ADMIN' && (
                <View style={styles.assignContainer}>
                    <DropDownPicker
                        open={openDropdown}
                        value={selectedVehicle}
                        items={vehicles}
                        setOpen={setOpenDropdown}
                        setValue={setSelectedVehicle}
                        setItems={setVehicles}
                        placeholder="Selecciona un vehículo"
                        style={styles.dropdown}
                    />
                    <TouchableOpacity style={styles.assignButton} onPress={assignVehicle}>
                        <Text style={styles.buttonText}>Asignar Vehículo</Text>
                    </TouchableOpacity>
                </View>
            )}

        </View>
    );
}

export function RejectReason({ route, navigation }) {
    const { request, onUpdate, isCancel } = route.params;
    const [reason, setReason] = useState('');

    const handleSubmit = async () => {
        if (!reason.trim()) {
            Alert.alert('Error', 'Por favor ingresa un motivo.');
            return;
        }

        try {
            const userId = await AsyncStorage.getItem('uid'); // Obtén el ID del usuario logueado
            if (!userId) {
                Alert.alert('Error', 'No se pudo obtener el usuario. Intenta reiniciar la aplicación.');
                return;
            }

            // Construcción de la URL del endpoint
            const params = new URLSearchParams({
                application_id: request.id,
                user_id: userId,
            });

            const body = isCancel
                ? { status: 'CANCELADA', cancel_reason: reason }
                : { status: 'RECHAZADA', rejection_reason: reason };

            // Realizar la solicitud PATCH
            const response = await fetch(`${API_URL}/status?${params.toString()}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }

            const result = await response.json();
            if (result.success) {
                Alert.alert('Éxito', `La solicitud ha sido ${isCancel ? 'cancelada' : 'rechazada'}.`);
                onUpdate(); // Actualiza la lista de solicitudes
                navigation.navigate('Solicitudes'); // Redirige a la pantalla de solicitudes
            } else {
                Alert.alert(
                    'Error',
                    `No se pudo ${isCancel ? 'cancelar' : 'rechazar'} la solicitud: ${result.message || 'Error desconocido'}`,
                );
            }
        } catch (error) {
            console.error(`Error al ${isCancel ? 'cancelar' : 'rechazar'} la solicitud:`, error);
            Alert.alert(
                'Error',
                `No se pudo ${isCancel ? 'cancelar' : 'rechazar'} la solicitud. Verifica la conexión o los datos enviados.`,
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.cameraButtonContainer}>
                <TouchableOpacity style={styles.cameraButton}>
                    <Ionicons name="receipt-outline" size={70} color="#004270" />
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>{isCancel ? 'Motivo de cancelación' : 'Motivo de rechazo'}</Text>

            <TextInput
                style={styles.input}
                placeholder={isCancel ? 'Ingresa el motivo de cancelación' : 'Ingresa el motivo de rechazo'}
                value={reason}
                onChangeText={setReason}
            />
            <TouchableOpacity style={styles.notificarButton} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Notificar</Text>
            </TouchableOpacity>
        </View>
    );
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFF', // Fondo claro y limpio

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#004270', // Texto oscuro para buena legibilidad
        textAlign: 'center'
    },
    requestCard: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 12,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Sombra para un efecto de tarjeta flotante
        width:'98%',
    },
    vehicleName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#004270' // Texto principal oscuro
    },
    requestDetails: {
        fontSize: 14,
        marginTop: 10,
        color: '#4B5563' // Texto secundario con tono gris suave
    },
    statusButton: {
        marginTop: 15,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    pending: {
        backgroundColor: '#FEBE10' // Amarillo para estado pendiente
    },
    accepted: {
        backgroundColor: '#004270' // Verde para aceptado
    },
    rejected: {
        backgroundColor: '#ACACAC' // Rojo para rechazado
    },
    statusText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 14
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30
    },
    confirmButton: {
        backgroundColor: '#004270', // Azul brillante para confirmar
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 20,
        flex: 1,
        marginRight: 10,
        alignItems: 'center'
    },
    rejectButton: {
        backgroundColor: '#FEBE10', // Rojo brillante para rechazar
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 20,
        flex: 1,
        alignItems: 'center',
        marginRight: 15
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16
    },
    input: {
        backgroundColor: '#F3F4F6',
        padding: 15,
        borderRadius: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#D1D5DB', // Borde gris claro para inputs
        height: 100
    },
    vehicleImage: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        marginBottom: 20,
        resizeMode: 'cover' // Imagen ajustada al contenedor
    },
    notificarButton: {
        backgroundColor: '#004270', // Azul para botón principal
        padding: 15,
        borderRadius: 20,
        marginTop: 10,
        alignItems: 'center'
    },
    iconContainer: {
        width: 110, // Ancho fijo para el círculo
        height: 110, // Alto fijo para el círculo
        borderRadius: 55, // La mitad del ancho/alto para hacerlo círculo
        backgroundColor: '#FFF8DC', // Color de fondo del círculo (un tono beige claro)
        justifyContent: 'center', // Centra el icono horizontalmente
        alignItems: 'center', // Centra el icono verticalmente
        marginRight: 10, // Espacio entre el círculo y el texto
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
    assignButton: {
        backgroundColor: '#004270',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 20
    },
    dropdown: {
        marginTop: 20,
        backgroundColor: '#F3F4F6',
        borderColor: '#D1D5DB'
    },
    assignContainer: {
        marginTop: 20
    },
});
