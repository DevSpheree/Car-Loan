# Vista de desarrollo

## ¿Qué es CI/CD?

En este proyecto se ha decidido usar CI/CD, que significa *Integración Continua y Entrega/Despliegue Continuo* y es un conjunto de prácticas que automatizan las etapas de desarrollo, prueba y despliegue del software. Su objetivo principal es mejorar la velocidad, calidad y confiabilidad de las entregas de software, por lo que será vital en el desarrollo del proyecto.

- *Integración Continua (CI)*: 
  - Es el proceso de integrar regularmente el código de diferentes desarrolladores en un repositorio compartido.
  - Incluye la ejecución automática de pruebas para identificar errores rápidamente.
  - *Esto permitirá que el proyecto se desenvuelva con mayor agilidad.*

- *Entrega Continua (CD - Continuous Delivery)*:
  - Extiende la CI al automatizar la preparación de entregas del software en cualquier momento.
  - Garantiza que el código esté siempre en un estado listo para producción.
  - Requiere pruebas adicionales y validaciones antes del despliegue.
  - *Permite al proyecto estar siempre en condiciones para poder visualizarlo*

- *Despliegue Continuo (CD - Continuous Deployment)*:
  - Va un paso más allá y automatiza también el proceso de despliegue en producción.
  - Cada cambio que pasa las pruebas se despliega automáticamente.
  - *Automatización completa del proyecto.*

El enfoque CI/CD fomenta ciclos de desarrollo cortos, iterativos y más seguros.

---

## ¿Qué es DevOps?

*DevOps* es una cultura, metodología y conjunto de prácticas que busca integrar los equipos de desarrollo (Development) y operaciones (Operations) para mejorar la colaboración, automatización y entrega continua de software. DevOps no es solo una herramienta, sino una filosofía que combina personas, procesos y tecnologías.

Se ha decidido usar DevOps para este proyecto porque presenta algunos beneficios importantes.

- *Beneficios de DevOps*:
  - Ciclos de entrega más rápidos.
  - Mayor estabilidad y calidad del software.
  - Mejor alineación entre objetivos técnicos y empresariales.

## Pipeline
![pipelineFinalpng](https://github.com/user-attachments/assets/609e0c67-0661-41c8-a48e-462f5c92682c)



## Tabla de descripción

| **Fase**        | **Herramienta**            | **Descripción**                                                                                                   |
|------------------|----------------------------|-------------------------------------------------------------------------------------------------------------------|
| **Plan**        | Trello                     | Se ha usado Trello para planificar, desarrollando las historias de usuario con sus tareas, las cuales se asignan a los integrantes del equipo según su función, para esto se ha usado el apartado de *Power-ups* de Trello que nos otorga integración directa con ramas de un repositorio de github.       |
| **Código**      | Expo                       | Se ha decidido usar esta plataforma de código abierto React Native para el desarrollo móvil multiplataforma, ya que se ha observado sencillez para el desarrollo.                              |
|                  | Go                         | Lenguaje de programación de Google para el desarrollo de una gran variedad de aplicaciones. Se escogió debido a que la creación de APIs es ágil.                     |
|                  | React Native               | Framework de código abierto para el desarrollo de aplicaciones para Android, iOS, macOS, Web, Windows, etc.      |
| **Construcción**| NPM                        | Sistema de gestión de paquetes por defecto para Node.js, un entorno de ejecución para JavaScript.                |
| **Pruebas**     | JUnit                      | Conjunto de bibliotecas utilizadas en programación para hacer pruebas unitarias de aplicaciones Java.            |
| **Lanzamiento** | Jenkins                    | Servidor de automatización de código abierto escrito en Java. Compila y prueba proyectos de forma automática.    |
| **Despliegue**  | Google Cloud Functions     | Servicio de computación serverless, ideal para funciones de uso único que se conectan hacia otros servicios.     |
|                  | Firebase                   | Plataforma de Google para el desarrollo de aplicaciones web y aplicaciones móviles.                              |
| **Operación**   | Google Cloud Run           | Plataforma gestionada que permite ejecutar código directamente en la infraestructura escalable de Google.        |
| **Monitoreo**   | Grafana                    | Software libre que permite la visualización y el formato de datos métricos.                                      |
|                  | Discord                    | Servicio de mensajería instantánea y chat de voz.                                                                |
|                  | Google Cloud Monitoring    | Servicio de Google que reduce la complejidad y ofrece soluciones para almacenamiento, estadísticas, macrodatos, aprendizaje automático y desarrollo de aplicaciones. |


# Cronograma de actividades de desarrollo BackEnd y FrontEnd

## Backend

### 1. Requerimientos y diseño
- **Análisis de requisitos:** Identificar las funcionalidades necesarias del sistema.
- **Diseño de la arquitectura:** Seleccionar la estructura del backend (microservicios, monolito).
- **Definición de modelos de datos:** Diseñar las bases de datos y las relaciones.
- **Definición de la API:** Crear un contrato API (endpoints, métodos, formatos).

### 2. Configuración inicial
- Configuración del entorno de desarrollo (IDE, dependencias, frameworks).
- Creación de repositorios (Git, CI/CD pipelines).
- Configuración del entorno de Cloud Functions.
- Configuración de la base de datos (Firebase).

### 3. Desarrollo
- Implementación de modelos y esquemas de base de datos.
- Desarrollo de endpoints:
  - Autenticación y autorización (registro, inicio de sesión).
  - Operaciones CRUD (Create, Read, Update, Delete).
  - Integraciones externas (APIs de terceros, servicios de pago).
- Implementación de lógica de negocio.
- Manejo de errores y validación de datos.

### 4. Pruebas y validación
- Creación de pruebas unitarias para servicios.
- Pruebas de integración con la base de datos.
- Pruebas de rendimiento y escalabilidad.
- Validación de seguridad.

### 5. Implementación y despliegue
- Preparación de la base de datos.
- Despliegue en producción.
- Configuración de monitoreo y logs.


## Frontend

### 1. Requerimientos y diseño
- **Análisis de requisitos:** Definir la experiencia del usuario (UX).
- **Wireframes y prototipos:** Crear bocetos visuales y prototipos interactivos.
- **Definición de arquitectura:** Estructura de componentes, rutas y estados.

### 2. Configuración inicial
- Configuración del entorno de desarrollo.
- Instalación de dependencias y configuración de herramientas.
- Configuración del diseño base.

### 3. Desarrollo
- Creación de componentes base.
- Implementación de rutas y navegación.
- Integración con APIs del backend.
- Desarrollo de lógica de estado.
- Estilizado y responsividad.

### 4. Pruebas y validación
- Pruebas unitarias de componentes.
- Pruebas funcionales y de interacción.
- Validación de diseño responsivo y accesibilidad.
- Pruebas de rendimiento en el navegador.

### 5. Implementación y despliegue
- Construcción del proyecto para producción.
- Despliegue en Google Play.
- Validación en entornos reales.
- Configuración de monitoreo.


# Actividades y entregables

## Backend
1. **Diseñar los modelos de datos y endpoints.**  
   - Fecha inicio: 27/11/2024  
   - Fecha finalización: 04/12/2024  

2. **Implementar el endpoint de autenticación.**  
   - Fecha inicio: 11/12/2024  
   - Fecha finalización: 18/12/2024  

3. **Crear lógica de negocio para los flujos principales.**  
   - Fecha inicio: 20/12/2024  
   - Fecha finalización: 02/01/2025  

4. **Integrar servicios externos.**  
   - Fecha inicio: 02/01/2025  
   - Fecha finalización: 09/01/2025  

5. **Probar y validar la seguridad.**  
   - Fecha inicio: 09/01/2025  
   - Fecha finalización: 16/01/2025  

## Frontend
1. **Crear componentes clave como formularios y dashboards.**  
   - Fecha inicio: 04/12/2024  
   - Fecha finalización: 10/12/2024  

2. **Implementar autenticación y manejo de sesiones.**  
   - Fecha inicio: 11/12/2024  
   - Fecha finalización: 18/12/2024  

3. **Integrar APIs y validar datos del backend.**  
   - Fecha inicio: 02/01/2025  
   - Fecha finalización: 09/01/2025  

4. **Asegurar la responsividad y accesibilidad.**  
   - Fecha inicio: 16/01/2025  
   - Fecha finalización: 20/01/2025  

5. **Realizar pruebas funcionales y visuales.**  
   - Fecha inicio: 20/01/2025  
   - Fecha finalización: 23/01/2025  


