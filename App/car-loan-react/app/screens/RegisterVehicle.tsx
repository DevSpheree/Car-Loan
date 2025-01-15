import React from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Esquema de validación con Yup
const registerVehicleSchema = yup.object({
    modelo: yup.string().required("El modelo es requerido"),
    marca: yup.string().required("La marca es requerida"),
    anio: yup
        .number()
        .typeError("El año debe ser un número")
        .required("El año es requerido")
        .min(1900, "El año debe ser mayor a 1900")
        .max(new Date().getFullYear(), `El año no puede ser mayor al ${new Date().getFullYear()}`),
    color: yup.string().required("El color es requerido"),
    kilometrosPorGalon: yup
        .number()
        .typeError("Debe ser un número")
        .required("Los kilómetros por galón son requeridos"),
    kilometrajeActual: yup
        .number()
        .typeError("Debe ser un número")
        .required("El kilometraje actual es requerido"),
    tipoCombustible: yup.string().required("El tipo de combustible es requerido"),
    capacidadCombustible: yup
        .number()
        .typeError("Debe ser un número")
        .required("La capacidad del combustible es requerida"),
    pesoVehiculo: yup
        .number()
        .typeError("Debe ser un número")
        .required("El peso del vehículo es requerido"),
});

export default function RegisterVehicle() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            modelo: "",
            marca: "",
            anio: "",
            color: "",
            kilometrosPorGalon: "",
            kilometrajeActual: "",
            tipoCombustible: "",
            capacidadCombustible: "",
            pesoVehiculo: "",
        },
        resolver: yupResolver(registerVehicleSchema),
    });

    const onSubmit = async (data) => {
        try {
            const response = await fetch("https://car-loan-go-703279496082.us-east1.run.app/vehicles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: data.modelo,
                    brand: data.marca,
                    year: data.anio,
                    color: data.color,
                    km_gallon: data.kilometrosPorGalon,
                    km_actual: data.kilometrajeActual,
                    fuel_type: data.tipoCombustible,
                    fuel_capacity: data.capacidadCombustible,
                    weight: data.pesoVehiculo,
                    type: "light"
                }),
            });

            if (response.ok) {
                const responseData = await response.json();
                Alert.alert("Éxito", "Vehículo registrado correctamente");
                console.log("Respuesta de la API:", responseData);
            } else {
                const errorData = await response.json();
                Alert.alert("Error", errorData.message || "Ocurrió un error al registrar el vehículo");
                console.error("Error de la API:", errorData);
            }
        } catch (error) {
            Alert.alert("Error", "No se pudo conectar con el servidor");
            console.error("Error:", error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                {/* Modelo */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Modelo *</Text>
                    <Controller
                        control={control}
                        name="modelo"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                value={value}
                                onChangeText={onChange}
                                placeholder="Ingrese el modelo"
                            />
                        )}
                    />
                    {errors.modelo && <Text style={styles.errorText}>{errors.modelo.message}</Text>}
                </View>

                {/* Marca */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Marca *</Text>
                    <Controller
                        control={control}
                        name="marca"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                value={value}
                                onChangeText={onChange}
                                placeholder="Ingrese la marca"
                            />
                        )}
                    />
                    {errors.marca && <Text style={styles.errorText}>{errors.marca.message}</Text>}
                </View>

                {/* Año */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Año *</Text>
                    <Controller
                        control={control}
                        name="anio"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                value={value}
                                onChangeText={onChange}
                                placeholder="Ingrese el año"
                                keyboardType="numeric"
                            />
                        )}
                    />
                    {errors.anio && <Text style={styles.errorText}>{errors.anio.message}</Text>}
                </View>

                {/* Color */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Color *</Text>
                    <Controller
                        control={control}
                        name="color"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                value={value}
                                onChangeText={onChange}
                                placeholder="Ingrese el color"
                            />
                        )}
                    />
                    {errors.color && <Text style={styles.errorText}>{errors.color.message}</Text>}
                </View>

                {/* Kilómetros por galón */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Kilómetros por galón *</Text>
                    <Controller
                        control={control}
                        name="kilometrosPorGalon"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                value={value}
                                onChangeText={onChange}
                                placeholder="Ingrese los kilómetros por galón"
                                keyboardType="numeric"
                            />
                        )}
                    />
                    {errors.kilometrosPorGalon && (
                        <Text style={styles.errorText}>{errors.kilometrosPorGalon.message}</Text>
                    )}
                </View>

                {/* Kilometraje Actual */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Kilometraje Actual *</Text>
                    <Controller
                        control={control}
                        name="kilometrajeActual"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                value={value}
                                onChangeText={onChange}
                                placeholder="Ingrese el kilometraje actual"
                                keyboardType="numeric"
                            />
                        )}
                    />
                    {errors.kilometrajeActual && (
                        <Text style={styles.errorText}>{errors.kilometrajeActual.message}</Text>
                    )}
                </View>

                {/* Tipo de Combustible */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Tipo de Combustible *</Text>
                    <Controller
                        control={control}
                        name="tipoCombustible"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                value={value}
                                onChangeText={onChange}
                                placeholder="Ingrese el tipo de combustible"
                            />
                        )}
                    />
                    {errors.tipoCombustible && (
                        <Text style={styles.errorText}>{errors.tipoCombustible.message}</Text>
                    )}
                </View>

                {/* Capacidad del Combustible */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Capacidad del Combustible *</Text>
                    <Controller
                        control={control}
                        name="capacidadCombustible"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                value={value}
                                onChangeText={onChange}
                                placeholder="Ingrese la capacidad del combustible"
                                keyboardType="numeric"
                            />
                        )}
                    />
                    {errors.capacidadCombustible && (
                        <Text style={styles.errorText}>{errors.capacidadCombustible.message}</Text>
                    )}
                </View>

                {/* Peso del Vehículo */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Peso del Vehículo *</Text>
                    <Controller
                        control={control}
                        name="pesoVehiculo"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                value={value}
                                onChangeText={onChange}
                                placeholder="Ingrese el peso del vehículo"
                                keyboardType="numeric"
                            />
                        )}
                    />
                    {errors.pesoVehiculo && (
                        <Text style={styles.errorText}>{errors.pesoVehiculo.message}</Text>
                    )}
                </View>

                {/* Imagen del Vehículo */}
                <View style={styles.imageUpload}>
                    <Image
                        source={require("../../assets/images/placeholder.png")} // Cambia a tu icono de imagen
                        style={styles.image}
                    />
                </View>

                {/* Botón Aceptar */}
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.submitButtonText}>Aceptar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        padding: 20,
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        color: "#004270",
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#CDCDCD",
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: "#004270",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
    },
    submitButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    errorText: {
        color: "red",
        fontSize: 12,
        marginTop: 5,
    },
    imageUpload: {
        alignItems: "center",
        justifyContent: "center",
        height: 120,
        width: 150,
        borderWidth: 1,
        borderColor: "#CDCDCD",
        backgroundColor: "#A6B2C1",
        borderRadius: 8,
        marginBottom: 20,
        alignSelf: "center",
    },
    image: {
        width: 60,
        height: 60,
    },
});
