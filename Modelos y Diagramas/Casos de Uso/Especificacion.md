| **Nombre**           | Registro                                         |
|-----------------------|-------------------------------------------------|
| **Actores**          | - Administrador<br>- UTPL (fuente de datos)      |
| **Flujo normal**     | 1. El administrador busca a los docentes o administrativos en UTPL.<br>2. UTPL devuelve la información de los usuarios buscados al administrador.<br>3. El administrador registra un nuevo vehículo en UTPL. |
| **Flujo alternativo**| 1a. Si el administrador no encuentra coincidencias en las búsquedas, UTPL muestra un mensaje de "no se encontraron resultados" al administrador.<br>2a. Si el administrador ingresa información incorrecta o incompleta para el registro de vehículos, UTPL muestra un mensaje de error y solicita correcciones al administrador. |
                                              

| **Nombre**           | Préstamo                                         |
|-----------------------|-------------------------------------------------|
| **Actores**          | - Cliente<br>- Administrador<br>- UTPL (fuente de datos) |
| **Flujo normal**     | 1. El cliente ingresa una solicitud de préstamo de vehículo al administrador.<br>2. El administrador aprueba la solicitud ingresada en UTPL.<br>3. UTPL notifica el estado de solicitud al cliente. |
| **Flujo alternativo**| 1a. Si el cliente cancela la solicitud ingresada, UTPL notifica el estado de la solicitud al administrador.<br>2a. Si el administrador rechaza la solicitud enviada por el cliente, UTPL notifica el estado de la solicitud al cliente. |


| **Nombre**           | Monitoreo                                        |
|-----------------------|-------------------------------------------------|
| **Actores**          | - Administrador<br>- Telemetría-Vehículo (fuente de datos) |
| **Flujo normal**     | 1. El administrador monitorea los vehículos de UTPL.<br>2. UTPL muestra la ruta y ubicación del vehículo. |
| **Flujo alternativo**| 2a. Si la telemetría no está disponible, UTPL muestra un mensaje de error al administrador. |


| **Nombre**           | Devolución                                       |
|-----------------------|-------------------------------------------------|
| **Actores**          | - Guardia<br>- Administrador                     |
| **Flujo normal**     | 1. El guardia ingresa imágenes del vehículo, hace el checklist del vehículo y notifica al administrador.<br>2. El administrador acepta la devolución de la solicitud y actualiza los datos del vehículo en UTPL.<br>3. UTPL muestra los datos actualizados al administrador.<br>4. El administrador genera un informe de solicitud y revisa el historial de solicitudes. |
| **Flujo alternativo**| 1a. Si se detecta algún daño o anomalía en el vehículo durante la validación, el guardia solicita una revisión adicional al administrador.<br>2a. Si la información ingresada para actualizar los datos del vehículo es inconsistente, UTPL solicita una verificación al administrador. |

