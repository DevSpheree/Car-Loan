import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Login from './screens/Login';
import Dashboard from './screens/dashboard';
import RegisterVehicle from './screens/RegisterVehicle';
import MyVehicles from './screens/MyVehicles';
import VehicleDetails from "@/app/screens/VehicleDetails"; // Importamos la pantalla "Mis Vehículos"

const Drawer = createDrawerNavigator();

// Contenido personalizado para el Drawer
function CustomDrawerContent(props) {
  const [isVehiclesExpanded, setVehiclesExpanded] = useState(false);

  return (
      <DrawerContentScrollView {...props}>
        {/* Otras opciones del Drawer */}
        <DrawerItem
            label="Login"
            onPress={() => props.navigation.navigate('Login')}
        />
        <DrawerItem
            label="Dashboard"
            onPress={() => props.navigation.navigate('Dashboard')}
        />

        {/* Categoría Vehículos */}
        <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => setVehiclesExpanded(!isVehiclesExpanded)}
        >
          <Text style={styles.categoryText}>Vehículos</Text>
          <Text style={styles.arrow}>{isVehiclesExpanded ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {/* Submenú de Vehículos */}
        {isVehiclesExpanded && (
            <View style={styles.submenu}>
              <DrawerItem
                  label="Registrar Vehículo"
                  onPress={() => props.navigation.navigate('Registrar Vehículo')}
              />
              <DrawerItem
                  label="Mis Vehículos"
                  onPress={() => props.navigation.navigate('Mis Vehículos')}
              />
            </View>
        )}
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
              backgroundColor: '#f0f0f0',
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
            options={({ navigation }) => ({
              headerLeft: () => (
                  <TouchableOpacity
                      style={{ marginLeft: 10 }}
                      onPress={() => navigation.toggleDrawer()} // Botón de menú desplegable
                  >
                    <Text style={{ fontSize: 18, color: '#004270' }}>☰</Text>
                  </TouchableOpacity>
              ),
            })}
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
                    <Text style={{ fontSize: 18, color: '#004270' }}>☰</Text>
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
                    <Text style={{ fontSize: 18, color: '#004270' }}>{"<"}</Text>
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
                      onPress={() => navigation.navigate('Dashboard')} // Botón de regreso al Dashboard
                  >
                    <Text style={{ fontSize: 18, color: '#004270' }}>{"<"}</Text>
                  </TouchableOpacity>
              ),
            })}
        />

        {/* Pantalla Detalles Vehículo */}
        <Drawer.Screen
            name="Detalles Vehículo"
            component={VehicleDetails}
            options={{
              headerShown: false,
              drawerItemStyle: { display: 'none' }, // Ocultar del menú principal
            }}
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
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 10,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004270',
  },
  arrow: {
    fontSize: 16,
    color: '#004270',
  },
  submenu: {
    marginLeft: 30,
    marginTop: 5,
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
