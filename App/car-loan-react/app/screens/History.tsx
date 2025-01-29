import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Ionicons} from "@expo/vector-icons";

const History = () => {
    const [history, setHistory] = useState([]);
    const [approvedCount, setApprovedCount] = useState(0); // Para las estadísticas
    const [searchQuery, setSearchQuery] = useState(''); // Para el buscador
    const [filteredData, setFilteredData] = useState([]); // Datos filtrados según el buscador

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const userId = await AsyncStorage.getItem('uid'); // Reemplazar dinámicamente según sea necesario
                const response = await fetch(`https://car-loan-go-703279496082.us-east1.run.app/applications?user_id=${userId}`);
                const data = await response.json();
                if (data.success) {
                    const completedHistory = data.data.filter(
                        (item) => item.status === 'APROBADA' && item.return_status === 'FINALIZADA'
                    );
                    const approvedRequests = data.data.filter((item) => item.status === 'APROBADA').length;

                    setHistory(completedHistory);
                    setApprovedCount(approvedRequests);
                    setFilteredData(completedHistory); // Inicializar datos filtrados
                }
            } catch (error) {
                console.error('Error fetching history:', error);
            }
        };

        fetchHistory();
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = history.filter(
            (item) =>
                item.vehicle_name.toLowerCase().includes(query.toLowerCase()) ||
                item.destination.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.title}>{item.vehicle_name}</Text>
            <Text style={styles.content}>Destino: {item.destination}</Text>
            <Text style={styles.content}>Estado: {item.status}</Text>
            <Text style={styles.content}>Fecha de Retorno: {new Date(item.return_date).toLocaleString()}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Estadísticas */}
            <View style={styles.statisticsContainer}>
                <View style={styles.iconContainer}>
                    <Ionicons name="car-outline" size={30} color="#004270" />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.statisticsText}>Vehículos Prestados</Text>
                    <Text style={styles.statisticsCount}>{approvedCount}</Text> {/* Wrapped in <Text> */}
                </View>
            </View>

            {/* Buscador */}
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar por vehículo o destino..."
                value={searchQuery}
                onChangeText={handleSearch}
            />

            {/* Lista de historial */}
            <FlatList
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 15, backgroundColor: '#FFF' },
    statisticsContainer: {
        flexDirection: 'row', // Alinea el icono y el texto horizontalmente
        alignItems: 'center', // Centra verticalmente el icono y el texto
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        elevation:3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    iconContainer: {
        width: 50, // Ancho fijo para el círculo
        height: 50, // Alto fijo para el círculo
        borderRadius: 25, // La mitad del ancho/alto para hacerlo círculo
        backgroundColor: '#FFF8DC', // Color de fondo del círculo (un tono beige claro)
        justifyContent: 'center', // Centra el icono horizontalmente
        alignItems: 'center', // Centra el icono verticalmente
        marginRight: 10, // Espacio entre el círculo y el texto
    },
    textContainer:{
        flexDirection: 'column',
    },
    statisticsText: {
        color: '#004270',
        fontSize: 16,
        fontWeight: 'bold',
    },
    statisticsCount:{
        color:'#004270',
        fontSize:20,
        fontWeight:'bold'
    },
    searchInput: {
        marginBottom: 15,
        padding: 10,
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 8,
        backgroundColor: '#F9F9F9',
    },
    card: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 12,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginLeft: 5,
        width:'98%'
    },
    title: { fontSize: 16, fontWeight: 'bold', color: '#004270' },
    content: { marginTop: 5 },
});

export default History;
