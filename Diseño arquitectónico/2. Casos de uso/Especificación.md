# Diagrama de casos de uso 

## ¿Qué es un diagrama de casos de uso?

Un diagrama de casos de uso es una representación gráfica empleada en el modelado de sistemas para describir las interacciones entre los actores (usuarios, sistemas externos u otros componentes) y las funcionalidades principales que ofrece un sistema. Este tipo de diagrama, basado en el estándar UML (Lenguaje Unificado de Modelado), se utiliza para documentar *qué hace el sistema* desde la perspectiva de los usuarios, sin entrar en detalles sobre *cómo se implementa*.

---

## ¿Para qué sirve un Diagrama de Casos de Uso?

El diagrama de casos de uso es una herramienta clave para el desarrollo y documentación de sistemas, ya que permite:

1. *Especificar requisitos funcionales*: Identificar y detallar las funcionalidades principales que debe cumplir el sistema.
2. *Facilitar la comunicación*: Servir como un medio común entre los interesados, desarrolladores y analistas para garantizar la comprensión de los requisitos.
3. *Definir el alcance del sistema*: Determinar los límites del sistema, especificando qué incluye y qué excluye.
4. *Identificar actores clave*: Describir quiénes interactuarán con el sistema, ya sean usuarios humanos o sistemas externos.
5. *Priorizar funcionalidades*: Ayudar a evaluar y clasificar las funcionalidades en función de su importancia o impacto para los usuarios.

---

## Estructura de un Diagrama de Casos de Uso

La estructura de un diagrama de casos de uso incluye los siguientes componentes principales:

1. *Actores*:
   - Representan las entidades externas que interactúan con el sistema.
   - Pueden ser personas, organizaciones o sistemas.
   - Se representan gráficamente como una figura humana o una etiqueta que los identifica.
   - Ejemplo: Usuario, Administrador, Sistema Externo.

2. *Casos de Uso*:
   - Representan las funcionalidades o servicios específicos que el sistema proporciona a los actores.
   - Se representan como óvalos con un nombre que describe la acción.
   - Ejemplo: Registrar Usuario, Generar Informe, Procesar Pago.

3. *Relaciones*:
   - *Asociación*: Representa la interacción entre un actor y un caso de uso (línea sólida).
   - *Inclusión* (<<include>>): Indica que un caso de uso incluye la funcionalidad de otro, generalmente para evitar redundancia.
   - *Extensión* (<<extend>>): Señala un caso de uso opcional que extiende la funcionalidad de otro principal, dependiendo de ciertas condiciones.
   - *Generalización*: Define relaciones de herencia entre actores o entre casos de uso.

4. *Sistema*:
   - Representa los límites del sistema modelado.
   - Se ilustra como un rectángulo que contiene los casos de uso.
  
## Casos de Uso


## Registro
![CURegistro](https://github.com/user-attachments/assets/5171118c-9a78-4fb3-8050-1538574617c1)



| **Nombre**           | Registro                                         |
|-----------------------|-------------------------------------------------|
| **Actores**          | - Administrador<br>- UTPL (fuente de datos)      |
| **Flujo normal**     | 1. El administrador busca a los docentes o administrativos en UTPL.<br>2. UTPL devuelve la información de los usuarios buscados al administrador.<br>3. El administrador registra un nuevo vehículo en UTPL. |
| **Flujo alternativo**| 1a. Si el administrador no encuentra coincidencias en las búsquedas, UTPL muestra un mensaje de "no se encontraron resultados" al administrador.<br>2a. Si el administrador ingresa información incorrecta o incompleta para el registro de vehículos, UTPL muestra un mensaje de error y solicita correcciones al administrador. |

## Prestamos
![Prestamo corregido](https://github.com/user-attachments/assets/1930e108-07f2-4127-ad0c-c96f1ee01883)


| **Nombre**           | Préstamo                                         |
|-----------------------|-------------------------------------------------|
| **Actores**          | - Cliente<br>- Administrador<br>- UTPL (fuente de datos) |
| **Flujo normal**     | 1. El cliente ingresa una solicitud de préstamo de vehículo al administrador.<br>2. El administrador aprueba la solicitud ingresada en UTPL.<br>3. UTPL notifica el estado de solicitud al cliente. |
| **Flujo alternativo**| 1a. Si el cliente cancela la solicitud ingresada, UTPL notifica el estado de la solicitud al administrador.<br>2a. Si el administrador rechaza la solicitud enviada por el cliente, UTPL notifica el estado de la solicitud al cliente. |

## Monitoreo
![CUMonitoreo](https://github.com/user-attachments/assets/ef0ad0e3-3a56-4260-b2b1-4dbb7d300451)


| **Nombre**           | Monitoreo                                        |
|-----------------------|-------------------------------------------------|
| **Actores**          | - Administrador<br>- Telemetría-Vehículo (fuente de datos) |
| **Flujo normal**     | 1. El administrador monitorea los vehículos de UTPL.<br>2. Telemetría-Vehículo muestra la ruta y ubicación del vehículo. |
| **Flujo alternativo**| 2a. Si la telemetría no está disponible, se muestra un mensaje de error al administrador. |

## Devolucion
![CUDevolucion](https://github.com/user-attachments/assets/32902576-9a12-4bde-9d5e-cbb79bb076db)


| **Nombre**           | Devolución                                       |
|-----------------------|-------------------------------------------------|
| **Actores**          | - Guardia<br>- Administrador                     |
| **Flujo normal**     | 1. El guardia ingresa imágenes del vehículo, hace el checklist del vehículo y notifica al administrador.<br>2. El administrador acepta la devolución de la solicitud y actualiza los datos del vehículo en UTPL.<br>3. UTPL muestra los datos actualizados al administrador.<br>4. El administrador genera un informe de solicitud y revisa el historial de solicitudes. |
| **Flujo alternativo**| 1a. Si se detecta algún daño o anomalía en el vehículo durante la validación, el guardia solicita una revisión adicional al administrador.<br>2a. Si la información ingresada para actualizar los datos del vehículo es inconsistente, UTPL solicita una verificación al administrador. |
