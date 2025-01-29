import React, { useState } from "react";
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
import * as ImagePicker from "expo-image-picker";

// Esquema de validación con Yup
const registerVehicleSchema = yup.object({
    vehicle_plate: yup.string().required("La placa del vehículo es requerida"),
    brand: yup.string().required("La marca es requerida"),
    brand_year: yup.string().required("El modelo/año es requerido"),
    chasis: yup.string().required("El chasis es requerido"),
    engine: yup.string().required("El motor es requerido"),
    fuel: yup.string().required("El combustible es requerido"),
    color: yup.string().required("El color es requerido"),
    year: yup
        .number()
        .typeError("Debe ser un número")
        .required("El año es requerido")
        .min(1900, "El año debe ser mayor a 1900")
        .max(new Date().getFullYear(), `El año no puede ser mayor al ${new Date().getFullYear()}`),
});

export default function RegisterVehicle() {
    const [image, setImage] = React.useState<string | null>(null);


    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            vehicle_plate: "",
            brand: "",
            brand_year: "",
            chasis: "",
            engine: "",
            fuel: "",
            color: "",
            year: "",
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
                    ...data,
                    type: "light", // Si es requerido
                }),
            });

            if (response.ok) {
                Alert.alert("Éxito", "Vehículo registrado correctamente");
            } else {
                const errorData = await response.json();
                Alert.alert("Error", errorData.message || "Ocurrió un error al registrar el vehículo");
            }
        } catch (error) {
            Alert.alert("Error", "No se pudo conectar con el servidor");
        }
    };

    const handleImagePicker = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert("Permiso denegado", "Es necesario el permiso para acceder a la galería.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setImage(result.assets[0].uri); // El tipo ahora será un string válido
        }

    };

    const handleCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert("Permiso denegado", "Es necesario el permiso para usar la cámara.");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setImage(result.assets[0].uri); // El tipo ahora será un string válido
        }

    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>


                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Marca *</Text>
                    <Controller
                        control={control}
                        name="brand"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                value={value}
                                onChangeText={onChange}
                                placeholder="Ingrese la marca"
                            />
                        )}
                    />
                    {errors.brand && <Text style={styles.errorText}>{errors.brand.message}</Text>}
                </View>

                {/* Ubicación de la actividad */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Ubicación de Actividad *</Text>
                    <Controller
                        control={control}
                        name="activity_location"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                value={value}
                                onChangeText={onChange}
                                placeholder="Ingrese la ubicación de actividad"
                            />
                        )}
                    />
                    {errors.activity_location && (
                        <Text style={styles.errorText}>{errors.activity_location.message}</Text>
                    )}
                </View>

                {/* Marca y Modelo */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Modelo *</Text>
                    <Controller
                        control={control}
                        name="brand_year"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                value={value}
                                onChangeText={onChange}
                                placeholder="Ingrese el modelo"
                            />
                        )}
                    />
                    {errors.brand_year && (
                        <Text style={styles.errorText}>{errors.brand_year.message}</Text>
                    )}
                </View>

                {/* Chasis */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Chasis *</Text>
                    <Controller
                        control={control}
                        name="chasis"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                value={value}
                                onChangeText={onChange}
                                placeholder="Ingrese el número de chasis"
                            />
                        )}
                    />
                    {errors.chasis && <Text style={styles.errorText}>{errors.chasis.message}</Text>}
                </View>

                {/* Motor */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Motor *</Text>
                    <Controller
                        control={control}
                        name="engine"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                value={value}
                                onChangeText={onChange}
                                placeholder="Ingrese el número de motor"
                            />
                        )}
                    />
                    {errors.engine && <Text style={styles.errorText}>{errors.engine.message}</Text>}
                </View>

                {/* Combustible */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Tipo de Combustible *</Text>
                    <Controller
                        control={control}
                        name="fuel"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                value={value}
                                onChangeText={onChange}
                                placeholder="Ingrese el tipo de combustible"
                            />
                        )}
                    />
                    {errors.fuel && <Text style={styles.errorText}>{errors.fuel.message}</Text>}
                </View>

                {/* Número */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Número *</Text>
                    <Controller
                        control={control}
                        name="num"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                value={value}
                                onChangeText={onChange}
                                placeholder="Ingrese el número"
                                keyboardType="numeric"
                            />
                        )}
                    />
                    {errors.num && <Text style={styles.errorText}>{errors.num.message}</Text>}
                </View>

                {/* Propiedad */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Propiedad *</Text>
                    <Controller
                        control={control}
                        name="property"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                value={value}
                                onChangeText={onChange}
                                placeholder="Ingrese la propiedad"
                            />
                        )}
                    />
                    {errors.property && <Text style={styles.errorText}>{errors.property.message}</Text>}
                </View>

                {/* Responsable */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Responsable *</Text>
                    <Controller
                        control={control}
                        name="responsible"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                value={value}
                                onChangeText={onChange}
                                placeholder="Ingrese el responsable"
                            />
                        )}
                    />
                    {errors.responsible && <Text style={styles.errorText}>{errors.responsible.message}</Text>}
                </View>

                {/* Tipo de Vehículo */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Tipo de Vehículo *</Text>
                    <Controller
                        control={control}
                        name="type"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                value={value}
                                onChangeText={onChange}
                                placeholder="Ingrese el tipo de vehículo (ej. JEEP)"
                            />
                        )}
                    />
                    {errors.type && <Text style={styles.errorText}>{errors.type.message}</Text>}
                </View>

                {/* Placa */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Placa *</Text>
                    <Controller
                        control={control}
                        name="vehicle_plate"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                value={value}
                                onChangeText={onChange}
                                placeholder="Ingrese la placa del vehículo"
                            />
                        )}
                    />
                    {errors.vehicle_plate && (
                        <Text style={styles.errorText}>{errors.vehicle_plate.message}</Text>
                    )}
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
                                placeholder="Ingrese el color del vehículo"
                            />
                        )}
                    />
                    {errors.color && <Text style={styles.errorText}>{errors.color.message}</Text>}
                </View>

                {/* Año */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Año *</Text>
                    <Controller
                        control={control}
                        name="year"
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
                    {errors.year && <Text style={styles.errorText}>{errors.year.message}</Text>}
                </View>

                {/* Capacidad de Combustible */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Capacidad de Combustible *</Text>
                    <Controller
                        control={control}
                        name="fuel_capacity"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                value={value}
                                onChangeText={onChange}
                                placeholder="Ingrese la capacidad de combustible"
                                keyboardType="numeric"
                            />
                        )}
                    />
                    {errors.fuel_capacity && (
                        <Text style={styles.errorText}>{errors.fuel_capacity.message}</Text>
                    )}
                </View>

                {/* Kilometraje Actual */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Kilometraje Actual *</Text>
                    <Controller
                        control={control}
                        name="km_actual"
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
                    {errors.km_actual && (
                        <Text style={styles.errorText}>{errors.km_actual.message}</Text>
                    )}
                </View>

                {/* Kilómetros por Galón */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Kilómetros por Galón *</Text>
                    <Controller
                        control={control}
                        name="km_gallon"
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
                    {errors.km_gallon && (
                        <Text style={styles.errorText}>{errors.km_gallon.message}</Text>
                    )}
                </View>
                {/* Ejemplo de imagen */}
                <TouchableOpacity
                    style={styles.imageUpload}
                    onPress={() => {
                        Alert.alert("Seleccionar imagen", "Elige una opción", [
                            { text: "Galería", onPress: handleImagePicker },
                            { text: "Cámara", onPress: handleCamera },
                            { text: "Cancelar", style: "cancel" },
                        ]);
                    }}
                >
                    <Image
                        source={require("../../assets/images/placeholder.png")} // Cambia a tu icono de imagen
                        style={styles.image}
                    />
                </TouchableOpacity>

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
        backgroundColor:"#FFF",
    },
    container: {
        flex: 1,
        padding: 20,
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        color: "#004270",
        marginTop: 5
    },
    input: {
        backgroundColor: '#F3F4F6',
        padding: 15,
        borderRadius: 20,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#D1D5DB',

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
    uploadText: {
        color: "#888",
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: "#004270",
        padding: 15,
        borderRadius: 15,
        alignItems: "center",
        marginBottom: 25
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
});
