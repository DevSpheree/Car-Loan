import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function Dashboard() {
    return (
        <ScrollView style={styles.container}>
            {/* Resumen */}
            <View style={styles.summaryContainer}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Vehículos Disponibles</Text>
                    <Text style={styles.cardValue}>32</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Vehículos Ocupados</Text>
                    <Text style={styles.cardValue}>5</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Solicitudes Receptadas</Text>
                    <Text style={styles.cardValue}>16</Text>
                </View>
            </View>

            {/* Gráfico de línea */}
            <Text style={styles.chartTitle}>Solicitudes Receptadas</Text>
            <LineChart
                data={{
                    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago"],
                    datasets: [
                        {
                            data: [5, 15, 10, 35, 20, 25, 15, 40],
                            color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`,
                        },
                    ],
                }}
                width={screenWidth - 32}
                height={220}
                chartConfig={{
                    backgroundColor: "#f5f5f5",
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#f5f5f5",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(0, 66, 112, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 66, 112, ${opacity})`,
                    style: {
                        borderRadius: 8,
                    },
                    propsForDots: {
                        r: "5",
                        strokeWidth: "2",
                        stroke: "#ffa500",
                    },
                }}
                style={styles.chart}
            />

            {/* Gráfico de anillo */}
            <Text style={styles.chartTitle}>Vehículos</Text>
            <PieChart
                data={[
                    {
                        name: "Livianos Disponibles",
                        population: 40,
                        color: "#003f73",
                        legendFontColor: "#7F7F7F",
                        legendFontSize: 12,
                    },
                    {
                        name: "Livianos Ocupados",
                        population: 20,
                        color: "#A6B2C1",
                        legendFontColor: "#7F7F7F",
                        legendFontSize: 12,
                    },
                    {
                        name: "Pesados Disponibles",
                        population: 30,
                        color: "#ffa500",
                        legendFontColor: "#7F7F7F",
                        legendFontSize: 12,
                    },
                    {
                        name: "Pesados Ocupados",
                        population: 10,
                        color: "#f0c040",
                        legendFontColor: "#7F7F7F",
                        legendFontSize: 12,
                    },
                ]}
                width={screenWidth - 32}
                height={220}
                chartConfig={{
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor={"population"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                style={styles.chart}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        padding: 16,
    },
    summaryContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 24,
    },
    card: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        borderRadius: 8,
        padding: 16,
        marginHorizontal: 4,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 14,
        color: "#004270",
        marginBottom: 8,
        textAlign: "center",
    },
    cardValue: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#ffa500",
    },
    chartTitle: {
        fontSize: 16,
        color: "#004270",
        fontWeight: "bold",
        marginBottom: 8,
    },
    chart: {
        marginVertical: 8,
        borderRadius: 8,
        alignSelf: "center",
    },
});
