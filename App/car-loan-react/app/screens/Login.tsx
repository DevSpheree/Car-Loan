import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Esquema de validación con Yup
const loginSchema = yup.object({
    email: yup.string().required("El email es requerido").email("Ingrese un email válido"),
    password: yup
        .string()
        .required("La contraseña es requerida")
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "La contraseña debe contener al menos una mayúscula, una minúscula y un número"
        ),
});

const LoginScreen = () => {
    // Configuración de React Hook Form
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: yupResolver(loginSchema), // Resolver para validación con Yup
    });

    const handleLogin = (data) => {
        // Manejar el inicio de sesión
        console.log("Datos del formulario:", data);
    };

    return (
        <View style={styles.container}>
            {/* Encabezado con imagen y texto */}
            <View style={styles.header}>
                <Text style={styles.welcomeText}>Bienvenido a</Text>
                <Image
                    source={require("../../assets/images/checklist1.png")} // Cambia por la ruta de tu logo
                    style={styles.logo1}
                    resizeMode="contain"
                />
                <Image
                    source={require("../../assets/images/logo.png")} // Cambia por la ruta de tu logo
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            {/* Contenido de inicio de sesión */}
            <View style={styles.loginContainer}>
                <Text style={styles.loginTitle}>Inicio de sesión</Text>

                {/* Campo de correo */}
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                        <>
                            <TextInput
                                style={styles.input}
                                placeholder="Correo Institucional"
                                placeholderTextColor="#000"
                                value={value}
                                onChangeText={onChange}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
                        </>
                    )}
                />

                {/* Campo de contraseña */}
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value } }) => (
                        <>
                            <TextInput
                                style={styles.input}
                                placeholder="Contraseña"
                                placeholderTextColor="#000"
                                value={value}
                                onChangeText={onChange}
                                secureTextEntry
                            />
                            {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
                        </>
                    )}
                />

                <View style={styles.inputContainer}>
                    {/* Botón para recuperar contraseña */}
                    <TouchableOpacity>
                        <Text style={styles.forgotPassword}>Recupera tu contraseña</Text>
                    </TouchableOpacity>
                </View>

                {/* Botón de inicio de sesión */}
                <TouchableOpacity style={styles.loginButton} onPress={handleSubmit(handleLogin)}>
                    <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    header: {
        backgroundColor: "#004270",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 80,
        paddingHorizontal: 10,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    },
    welcomeText: {
        color: "#FFF",
        fontSize: 16,
        marginBottom: 10,
        fontWeight: "400",
    },
    logo1: {
        width: 156,
        height: 104,
    },
    logo: {
        width: 180,
        height: 120,
    },
    loginContainer: {
        flex: 1,
        padding: 20,
        alignItems: "center",
        marginTop: 30,
    },
    loginTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#004270",
        marginBottom: 30,
    },
    inputContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        width: "100%",
        marginBottom: 15,
    },
    input: {
        width: "100%",
        height: 50,
        backgroundColor: "transparent",
        paddingHorizontal: 15,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderColor: "#E9B40A",
    },
    errorText: {
        color: "red",
        fontSize: 12,
        alignSelf: "flex-start",
    },
    forgotPassword: {
        color: "#034872",
        textDecorationLine: "underline",
        marginBottom: 20,
    },
    loginButton: {
        backgroundColor: "#004270",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 8,
        width: "100%",
        alignItems: "center",
    },
    loginButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default LoginScreen;
