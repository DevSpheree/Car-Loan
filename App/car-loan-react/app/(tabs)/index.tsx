import React from 'react'
import * as yup from 'yup'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

type LoginFormType = {
  email: string
  password: string
}

const loginSchema = yup.object({
  email: yup.string().required('El email es requerido').email('Ingrese un email válido'),
  password: yup
    .string()
    .required('La contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
    ),
})

const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = (data: LoginFormType) => {
    console.log('Form data:', data)
  }

  return (
    <View style={styles.container}>
      {/* Encabezado con imagen y texto */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Bienvenido a</Text>
        <Image
          source={require('@/assets/images/checklist1.png')}
          style={styles.logo1}
          resizeMode="contain"
        />
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Contenido de inicio de sesión con React Hook Form */}
      <View style={styles.formContainer}>
        <Controller
          control={control}
          rules={{
            required: 'El email es requerido',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email inválido',
            },
          }}
          name="email"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
            </>
          )}
        />

        <Controller
          control={control}
          rules={{
            required: 'La contraseña es requerida',
            minLength: {
              value: 6,
              message: 'La contraseña debe tener al menos 6 caracteres',
            },
          }}
          name="password"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                onChangeText={onChange}
                value={value}
                secureTextEntry
              />
              {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
            </>
          )}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

// Add this to your existing styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    backgroundColor: '#004270',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: 10,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  welcomeText: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '400',
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
    alignItems: 'center',
    marginTop: 30,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004270',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row', // Orientación horizontal
    justifyContent: 'flex-end',
    width: '100%',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#E9B40A',
  },
  forgotPassword: {
    color: '#034872',
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#004270',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
})

export default LoginScreen
