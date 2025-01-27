import React, {useEffect, useState} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Login from './screens/Login';
import Dashboard from './screens/dashboard';
import RegisterVehicle from './screens/RegisterVehicle';
import MyVehicles from './screens/MyVehicles';
import VehicleDetails from "@/app/screens/VehicleDetails";
import Monitoring from "@/app/screens/Monitoring";
import MonitoringDetails from "@/app/screens/MonitoringDetails";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReserveVehicle from "@/app/screens/ReserveVehicle";
import SelectDestination from "@/app/screens/SelectDestination";
import ConfirmReservation from "@/app/screens/ConfirmReservation";
import Requests, {RejectReason, RequestDetails} from "@/app/screens/Solicitudes";
import {useNavigation} from "expo-router";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    const [isVehiclesExpanded, setVehiclesExpanded] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);
    let role;
    useEffect(() => {
        const fetchRole = async () => {
            try {
                 role = await AsyncStorage.getItem('role');
                setUserRole(role);
            } catch (error) {
                console.error('Error obteniendo el rol del usuario:', error);
                setUserRole(null);
            }
        };
        fetchRole();
    }, []);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('idToken');
            await AsyncStorage.removeItem('uid');
            await AsyncStorage.removeItem('role');
            Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente.');
            props.navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Error', 'No se pudo cerrar la sesión.');
        }
    };

    return (
        <DrawerContentScrollView {...props}>
            {userRole === 'ADMIN' ? (
                <>
                    <DrawerItem label="Inicio" onPress={() => props.navigation.navigate('Dashboard')} />
                    <DrawerItem label="Solicitudes" onPress={() => props.navigation.navigate('Solicitudes')} />
                    <TouchableOpacity
                        style={styles.categoryButton}
                        onPress={() => setVehiclesExpanded(!isVehiclesExpanded)}
                    >
                        <Text style={styles.categoryText}>Vehículos</Text>
                        <Text style={styles.arrow}>{isVehiclesExpanded ? '▲' : '▼'}</Text>
                    </TouchableOpacity>
                    {isVehiclesExpanded && (
                        <View style={styles.submenu}>
                            <DrawerItem label="Registrar Vehículo" onPress={() => props.navigation.navigate('Registrar Vehículo')} />
                            <DrawerItem label="Mis Vehiculos" onPress={() => props.navigation.navigate('Mis Vehículos')} />
                        </View>
                    )}
                    <DrawerItem label="Monitoreo" onPress={() => props.navigation.navigate('Monitoreo')} />

                </>

            ) : userRole === 'CLIENT' ? (
                <>
                    <DrawerItem label="Principal" onPress={() => props.navigation.navigate('Mis Vehículos')} />
                    <DrawerItem label="Mis Reservas" onPress={() => props.navigation.navigate('Solicitudes')} />
                </>
            ) : null}
            <View style={styles.logoutContainer}>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    );
}

export default function Layout() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerTitleAlign: 'center', // Título centrado
                headerStyle: {
                    backgroundColor: '#fff',
                    borderWidth: 0,
                },
                headerTitleStyle: {
                    color: '#004270',
                },
            }}
        >

            {/* Pantalla Login */}
            <Drawer.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false, // Ocultar el encabezado
                    swipeEnabled: false, // Deshabilitar el deslizamiento del drawer
                    drawerLockMode: 'locked-closed', // Bloquear el acceso al menú
                }}
            />

            {/* Pantalla Dashboard */}
            <Drawer.Screen
                name="Dashboard"
                component={Dashboard}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 10 }}
                            onPress={() => navigation.toggleDrawer()} // Botón de menú desplegable
                        >
                            <Text style={{ fontSize: 24, color: '#004270' }}>☰</Text>
                        </TouchableOpacity>
                    ),
                })}
            />

            {/* Pantalla Dashboard */}
            <Drawer.Screen
                name="Solicitudes"
                component={Requests}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 10 }}
                            onPress={() => navigation.toggleDrawer()} // Botón de menú desplegable
                        >
                            <Text style={{ fontSize: 24, color: '#004270' }}>☰</Text>
                        </TouchableOpacity>
                    ),
                })}
            />


            <Drawer.Screen
                name="Monitoreo"
                component={Monitoring} // Pantalla de Monitoreo
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 10 }}
                            onPress={() => navigation.toggleDrawer()} // Botón de menú desplegable
                        >
                            <Text style={{ fontSize: 24, color: '#004270' }}>☰</Text>
                        </TouchableOpacity>
                    ),
                })}
            />
            {/* Pantalla Registrar Vehículo */}
            <Drawer.Screen
                name="Registrar Vehículo"
                component={RegisterVehicle}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 10 }}
                            onPress={() => navigation.navigate('Dashboard')} // Botón de regreso al Dashboard
                        >
                            <Text style={{ fontSize: 24, color: '#004270' }}>{"<"}</Text>
                        </TouchableOpacity>
                    ),
                    drawerItemStyle: { display: 'none' }, // Ocultar del menú principal
                })}
            />

            {/* Pantalla Mis Vehículos */}
            <Drawer.Screen
                name="Mis Vehículos"
                component={MyVehicles} // Aquí usamos la pantalla completa "Mis Vehículos"
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 10 }}
                            onPress={() => navigation.toggleDrawer()} // Botón de menú desplegable
                        >
                            <Text style={{ fontSize: 24, color: '#004270' }}>☰</Text>
                        </TouchableOpacity>
                    ),
                })}
            />

            {/* Pantalla Detalles Vehículo */}
            <Drawer.Screen
                name="Detalles Vehículo"
                component={VehicleDetails}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 10 }}
                            onPress={() => navigation.navigate('Dashboard')} // Botón de regreso al Dashboard
                        >
                            <Text style={{ fontSize: 24, color: '#004270' }}>{"<"}</Text>
                        </TouchableOpacity>
                    ),
                })}
            />


            <Drawer.Screen
                name="Detalles Monitoreo"
                component={MonitoringDetails}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 10 }}
                            onPress={() => navigation.navigate('Dashboard')} // Botón de regreso al Dashboard
                        >
                            <Text style={{ fontSize: 24, color: '#004270' }}>{"<"}</Text>
                        </TouchableOpacity>
                    ),
                })}
            />

            <Drawer.Screen
                name="Reservar Vehiculo"
                component={ReserveVehicle}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 10 }}
                            onPress={() => navigation.navigate('Dashboard')} // Botón de regreso al Dashboard
                        >
                            <Text style={{ fontSize: 24, color: '#004270' }}>{"<"}</Text>
                        </TouchableOpacity>
                    ),
                })}
            />

            <Drawer.Screen
                name="Seleccionar Destino"
                component={SelectDestination}
                options={{
                    headerShown: false,
                    drawerItemStyle: { display: 'none' }, // Ocultar del menú principal
                }}
            />

            <Drawer.Screen
                name="ConfirmReservation"
                component={ConfirmReservation}
                options={{
                    headerShown: false,
                    drawerItemStyle: { display: 'none' }, // Ocultar del menú principal
                }}
            />

            <Drawer.Screen
                name="RequestDetails"
                component={RequestDetails}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 10 }}
                            onPress={() => navigation.navigate('Mis Vehículos')} // Botón de regreso al Dashboard
                        >
                            <Text style={{ fontSize: 24, color: '#004270' }}>{"<"}</Text>
                        </TouchableOpacity>
                    ),
                })}
            />

            <Drawer.Screen
                name="RejectReason"
                component={RejectReason}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 10 }}
                            onPress={() => navigation.navigate('Solicitudes')} // Botón de regreso al Dashboard
                        >
                            <Text style={{ fontSize: 24, color: '#004270' }}>{"<"}</Text>
                        </TouchableOpacity>
                    ),
                })}
            />


        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    categoryButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    categoryText: {

    },
    arrow: {
        fontSize: 12,
        color: '#004270',
    },
    submenu: {
        marginLeft: 30,
        marginTop: 5,
    },
    logoutContainer: {
        marginTop: 20,
        paddingHorizontal: 10,
    },
    logoutButton: {
        backgroundColor: '#FF9688',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 400,
    },
    logoutText: {
        color: '#A52019',
        fontSize: 16,
        fontWeight: 'medium',
    },
});