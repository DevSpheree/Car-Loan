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
|         -       | Go                         | Lenguaje de programación de Google para el desarrollo de una gran variedad de aplicaciones. Se escogió debido a que la creación de APIs es ágil.                     |
|       -         |  React Native               | Framework de código abierto para el desarrollo de aplicaciones para Android, iOS, macOS, Web, Windows, etc. Ha sido indicado como herramienta de uso obligatorio en cuanto al desarrollo frontend.      |
|       -         |  Github               | GitHub es una plataforma de desarrollo colaborativo para alojar proyectos utilizando el sistema de control de versiones Git.  Se escogió por su sencilla integración con herramientas como Trello o Discord.   |
| **Construcción**| Docker                     | Software de código abierto que permite crear, probar e implementar aplicaciones de forma rápida. Se escogió por su empaquetamiento de microservicios.                |
| **Pruebas**     | JUnit                      | Conjunto de bibliotecas utilizadas en programación para hacer pruebas unitarias de aplicaciones Java. Su completitud ha sido la principal razón para ser escogido como herramienta de pruebas.            |
| **Lanzamiento** | Jenkins                    | Servidor de automatización de código abierto escrito en Java. Compila y prueba proyectos de forma automática. Es una herramienta potente para el lanzamiento del proyecto.   |
| **Despliegue**  | Google Cloud Functions     | Servicio de computación serverless, ideal para funciones de uso único que se conectan hacia otros servicios. Será de gran utilidad en el proyecto para incorporar funciones al proyecto.    |
|          -       | Firebase                   | Plataforma de Google para el desarrollo de aplicaciones web y aplicaciones móviles. Su integración con otros servicios de Google es vital para el desarrollo del proyecto.                            |
| **Operación**   | Google Cloud Run           | Plataforma gestionada que permite ejecutar código directamente en la infraestructura escalable de Google. Herramienta para manejar la operación del proyecto de forma efectiva.        |
| **Monitoreo**   | Grafana                    | Software libre que permite la visualización y el formato de datos métricos.  Escogido por permitir un monitoreo a través de métricas fijas.                                    |
|            -     | Discord                    | Servicio de mensajería instantánea y chat de voz. Se ha integrado con el repositorio github para las notificaciones y monitoreo del proyecto.                                                               |
|          -       | Google Cloud Monitoring    | Servicio de Google que reduce la complejidad y ofrece soluciones para almacenamiento, estadísticas, macrodatos, aprendizaje automático y desarrollo de aplicaciones. Se escogió porque al ser de Google es de fácil integración con Firebase y Google Cloud Functions|


# Cronograma de actividades de desarrollo BackEnd y FrontEnd

| Fase | Tarea | Backend | Frontend | Fecha Inicio | Fecha Finalización |
|---|---|---|---|---|---|
| Diseño | Diseñar modelos de datos y endpoints | 27/11/2024 |  | 27/11/2024 | 04/12/2024 |
| Desarrollo | Implementar endpoint de autenticación | 11/12/2024 |  | 11/12/2024 | 18/12/2024 |
| Desarrollo | Crear lógica de negocio para flujos principales | 20/12/2024 |  | 20/12/2024 | 02/01/2025 |
| Desarrollo | Integrar servicios externos | 02/01/2025 |  | 02/01/2025 | 09/01/2025 |
| Pruebas | Probar y validar la seguridad | 09/01/2025 |  | 09/01/2025 | 16/01/2025 |
| Diseño | Crear componentes clave (formularios, dashboards) |  | 04/12/2024 | 04/12/2024 | 10/12/2024 |
| Desarrollo | Implementar autenticación y manejo de sesiones |  | 11/12/2024 | 11/12/2024 | 18/12/2024 |
| Desarrollo | Integrar APIs y validar datos del backend |  | 02/01/2025 | 02/01/2025 | 09/01/2025 |
| Desarrollo | Asegurar responsividad y accesibilidad |  | 16/01/2025 | 16/01/2025 | 20/01/2025 |
| Pruebas | Realizar pruebas funcionales y visuales |  | 20/01/2025 | 20/01/2025 | 23/01/2025 |

