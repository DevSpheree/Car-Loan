import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
} from "react-native";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        // Aquí puedes manejar la lógica de autenticación
        console.log("Email:", email, "Password:", password);
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

                {/* Input de correo */}
                <TextInput
                    style={styles.input}
                    placeholder="Correo Institucional"
                    placeholderTextColor="#000"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                {/* Input de contraseña */}
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor="#000"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <View style={styles.inputContainer}>
                    {/* Botón para recuperar contraseña */}
                    <TouchableOpacity>
                        <Text style={styles.forgotPassword}>Recupera tu contraseña</Text>
                    </TouchableOpacity>
                </View>



                {/* Botón de inicio de sesión */}
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
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
        flexDirection: "row", // Orientación horizontal
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
