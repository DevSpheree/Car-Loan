# Diagrama de Despliegue

## ¿Qué es un diagrama de despliegue?

Un *diagrama de despliegue* ayuda a modelar el aspecto físico de un sistema de software orientado a objetos. Modela la configuración en tiempo de ejecución en una vista estática y visualiza la distribución de los componentes en una aplicación. En la mayoría de los casos, implica modelar las configuraciones de hardware junto con los componentes de software existentes

![despliegue drawio (4)](https://github.com/user-attachments/assets/15d0b70d-2caf-48f1-9201-fbd4e4685aae)

## 1. Teléfono Móvil

Función: 
Representa el dispositivo móvil utilizado por los usuarios finales (administradores o clientes).

Componentes:
UTPL - Car Loan: Es la interfaz móvil (aplicación) que permite a los usuarios interactuar con el sistema.
Mobile API Gateway Module: Módulo que gestiona las solicitudes REST API entre el cliente y el servidor de aplicación.

## 2. Servidor de Aplicación

Función: 
Alberga la lógica de negocio y conecta con las bases de datos.

Componentes:
Servicio de Autenticación y Búsqueda de Usuarios:
Gestiona la autenticación de usuarios y permite buscar información.
Conecta con la Base de Datos de Usuarios en Firebase.

Catálogo de Vehículo:
Administra el inventario de vehículos disponibles.
Conecta con la Base de Datos de Vehículos en Firebase.

Servicio de Préstamos:
Procesa las solicitudes y asignaciones de préstamos de vehículos.
Conecta con la Base de Datos de Préstamos en Firebase.

Servicio de Ruta de Préstamo:
Administra la ubicación y las rutas relacionadas con los vehículos prestados.

Servicio de Devoluciones:
Gestiona la información y el estado de la devolución de los vehículos.
Conecta con la Base de Datos de Devoluciones en Firebase.

## 3. Firebase (Firestore)

Función: 
Actúa como la infraestructura de base de datos en la nube, proporcionando almacenamiento para los datos críticos del sistema.

Bases de Datos:
Base de Datos de Usuarios: Información de autenticación y usuarios.
Base de Datos de Vehículos: Información sobre el catálogo de vehículos.
Base de Datos de Préstamos: Registros de préstamos realizados.
Base de Datos de Devoluciones: Datos sobre las devoluciones realizadas.

## 4. Telemetría

Función: 
Nodo independiente para la gestión de datos de ubicación en tiempo real de los vehículos.

Componente: Servicio de Ubicación del Vehículo.
Ofrece información de ubicación y telemetría de los vehículos a través de REST API.
Podría interactuar con otros servicios en el servidor de aplicación.

