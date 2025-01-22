import React from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const loginSchema = yup.object({
    email: yup.string().required("El email es requerido").email("Ingrese un email válido"),
    password: yup
        .string()
        .required("La contraseña es requerida")
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

const LoginScreen = ({ navigation }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: yupResolver(loginSchema),
    });

    const handleLogin = async (data) => {
        const { email, password } = data;
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const idToken = await userCredential.user.getIdToken();
            const uid = userCredential.user.uid;

            await AsyncStorage.setItem("idToken", idToken);
            await AsyncStorage.setItem("uid", uid);

            const userDocRef = doc(db, "users", uid); // Cambia "users" por el nombre de tu colección
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const role = userDoc.data()?.role; // Recupera el rol desde Firestore
                await AsyncStorage.setItem("role", role); // Guarda el rol en AsyncStorage

                if (role === "ADMIN") {
                    navigation.reset({ index: 0, routes: [{ name: "Dashboard" }] });
                } else if (role === "CLIENT") {
                    navigation.reset({ index: 0, routes: [{ name: "Mis Vehículos" }] });
                } else {
                    Alert.alert("Error", "Rol de usuario no reconocido.");
                }
            } else {
                Alert.alert("Error", "No se encontró información del usuario.");
            }
        } catch (error) {
            console.error("Login error:", error);
            Alert.alert("Error", "No se pudo iniciar sesión. Verifica tus credenciales.");
        }
    };


    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Text style={styles.welcomeText}>Bienvenido a</Text>
                            <Image source={require("../../assets/images/checklist1.png")} style={styles.logo1} resizeMode="contain" />
                            <Image source={require("../../assets/images/logo.png")} style={styles.logo} resizeMode="contain" />
                        </View>
                        <View style={styles.loginContainer}>
                            <Text style={styles.loginTitle}>Inicio de sesión</Text>
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
                            <TouchableOpacity style={styles.loginButton} onPress={handleSubmit(handleLogin)}>
                                <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FFF" },
    header: {
        backgroundColor: "#004270",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 80,
        paddingHorizontal: 10,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    },
    welcomeText: { color: "#FFF", fontSize: 16, marginBottom: 10, fontWeight: "400" },
    logo1: { width: 156, height: 104 },
    logo: { width: 180, height: 120 },
    loginContainer: { flex: 1, padding: 20, alignItems: "center", marginTop: 30 },
    loginTitle: { fontSize: 24, fontWeight: "bold", color: "#004270", marginBottom: 30 },
    input: { width: "100%", height: 50, paddingHorizontal: 15, marginBottom: 15, borderBottomWidth: 1, borderColor: "#E9B40A" },
    errorText: { color: "red", fontSize: 12, alignSelf: "flex-start" },
    loginButton: { backgroundColor: "#004270", paddingVertical: 15, paddingHorizontal: 20, borderRadius: 8, width: "100%", alignItems: "center", marginTop: 50 },
    loginButtonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
});

export default LoginScreen;
