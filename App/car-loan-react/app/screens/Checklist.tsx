import React, { useState } from 'react';
import {View, Text, StyleSheet, Button, ScrollView, TouchableOpacity} from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {Ionicons} from "@expo/vector-icons";

export default function Checklist({ route, navigation }) {
    const { requestData } = route.params;
    const [checklist, setChecklist] = useState({});

    const handleFinish = () => {
        navigation.navigate('Generar Informe', { requestData: { ...requestData, checklist } }); // Correct way to pass data
    };

    const handleCheck = (section, item) => (isChecked) => {
        setChecklist({
            ...checklist,
            [section]: {
                ...checklist[section],
                [item]: isChecked,
            },
        });
    };

    const renderSection = (section, items) => (
        <View key={section} style={styles.sectionContainer}> {/* Contenedor para cada sección */}
            <Text style={styles.sectionTitle}>{section}</Text>
            {items.map((item) => (
                <View key={item} style={styles.itemContainer}> {/* Contenedor para cada ítem */}
                    <BouncyCheckbox
                        size={25}
                        fillColor="#febe10"
                        unfillColor="#e2e2e3"
                        text={item}
                        iconStyle={{ borderColor: "#004270", borderRadius: 4 }} // Bordes redondeados para el checkbox
                        textStyle={{ fontFamily: "JosefinSans-Regular", color: '#333' }} // Color de texto más oscuro
                        onPress={handleCheck(section, item)}
                    />
                    {/* Subitems (si existen) */}
                    {item === 'Luces' && renderSubItems(['Delantera Izquierda', 'Delantera Derecha', 'Trasera Izquierda', 'Trasera Derecha'])}
                    {item === 'Llantas' && renderSubItems(['Delantera Izquierda', 'Delantera Derecha', 'Trasera Izquierda', 'Trasera Derecha'])}
                    {item === 'Espejos' && renderSubItems(['Lateral Derecho', 'Lateral Izquierdo'])}
                    {item === 'Asientos' && renderSubItems(['Conductor', 'Copiloto', 'Traseros'])}
                </View>
            ))}
        </View>
    );

    const renderSubItems = (subItems) => (
        subItems.map(subItem => (
            <View key={subItem} style={styles.subItemContainer}> {/* Estilo para subitems */}
                <BouncyCheckbox
                    size={20} // Tamaño más pequeño para subitems
                    fillColor="#febe10"
                    unfillColor="#FFFFFF"
                    text={subItem}
                    iconStyle={{ borderColor: "#555", borderRadius: 4 }}
                    textStyle={{ fontFamily: "JosefinSans-Regular", color: '#555', fontSize: 14 }} // Texto más pequeño y claro
                    onPress={handleCheck('Exterior del vehículo', subItem)} // Asumiendo que son parte del exterior
                />
            </View>
        ))
    );


    return (
        <ScrollView style={styles.container}>
            <View style={styles.cameraButtonContainer}>
                <TouchableOpacity style={styles.cameraButton}>
                    <Ionicons
                        name="checkbox-outline"
                        size={50}
                        color="#004270"
                    />
                </TouchableOpacity>
            </View>

            <Text style={styles.content}>Vehículo: {requestData.vehicle_name}</Text>

            {renderSection('Exterior del vehículo', [
                'Carrocería',
                'Parabrisas y Ventanas',
                'Luces',
                'Llantas',
                'Espejos',
            ])}

            {renderSection('Interior del vehículo', [
                'Asientos',
                'Tapicería y alfombras',
                'Tablero',
                'Cajuela',
                'Limpieza general interna',
            ])}

            {renderSection('Mecánica del vehículo', [
                'Frenos',
                'Batería',
                'Pastillas',
                'Sistema eléctrico',
                'Aceite',
                'Suspensión',
            ])}

            <TouchableOpacity style={styles.validateButton} onPress={handleFinish}>
                <Text style={styles.buttonText}>Generar Reporte</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' }, // Fondo gris claro
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#004270', textAlign: 'center' },
    content: { fontSize: 16, color: '#4B5563', marginBottom: 20, textAlign: 'center' }, // Centrado
    sectionContainer: { marginBottom: 20, }, // Espacio entre secciones
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 10, marginBottom: 10, color: '#004270',  },
    itemContainer: { marginBottom: 20,  backgroundColor:'#f5f5f5', borderRadius: 8, padding: 10}, // Espacio entre items
    subItemContainer: { marginLeft: 30, marginBottom: 10,  borderRadius: 8, padding: 10 }, // Margen para subitems
    finishButton: { marginTop: 20, backgroundColor: '#004270', borderRadius: 8 }, // Estilo para el botón
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
    validateButton: { marginTop: 10, backgroundColor: '#004270', padding: 10, borderRadius: 10, marginBottom: 40, width:'90%', marginLeft: 20 },
    buttonText: { color: '#fff', textAlign: 'center' },
});