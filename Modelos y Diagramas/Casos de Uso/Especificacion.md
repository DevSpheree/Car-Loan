| **Nombre**           | Registro                                         |
|-----------------------|-------------------------------------------------|
| **Autor**            | DevSphere                                        |
| **Fecha**            | 25-10-2024                                      |
| **Descripción**      | Permite al administrador registrar nuevos vehículos en el sistema, además de buscar docentes, personal administrativo y vehículos (livianos o pesados) en la base de datos de la UTPL. |
| **Actores**          | - Administrador<br>- UTPL (fuente de datos)      |
| **Precondiciones**   | El administrador debe estar autenticado en el sistema. |
| **Flujo normal**     | 1. El administrador busca a los docentes o administrativos en UTPL.<br>2. UTPL devuelve la información de los usuarios buscados al administrador.<br>3. El administrador registra un nuevo vehículo en UTPL. |
| **Flujo alternativo**| 1a. Si el administrador no encuentra coincidencias en las búsquedas, UTPL muestra un mensaje de "no se encontraron resultados" al administrador.<br>2a. Si el administrador ingresa información incorrecta o incompleta para el registro de vehículos, UTPL muestra un mensaje de error y solicita correcciones al administrador. |
| **Postcondiciones**  |                                              |

| **Nombre**           | Préstamo                                         |
|-----------------------|-------------------------------------------------|
| **Autor**            | DevSphere                                        |
| **Fecha**            | 25-10-2024                                      |
| **Descripción**      | Permite al cliente solicitar un préstamo de vehículo o cancelarlo una vez solicitado y al administrador gestionar las solicitudes, incluyendo la aprobación o rechazo de las mismas. |
| **Actores**          | - Cliente<br>- Administrador<br>- UTPL (fuente de datos) |
| **Precondiciones**   | El cliente debe estar autenticado en el sistema. |
| **Flujo normal**     | 1. El cliente ingresa una solicitud de préstamo de vehículo al administrador.<br>2. El administrador aprueba la solicitud ingresada en UTPL.<br>3. UTPL notifica el estado de solicitud al cliente. |
| **Flujo alternativo**| 1a. Si el cliente cancela la solicitud ingresada, UTPL notifica el estado de la solicitud al administrador.<br>2a. Si el administrador rechaza la solicitud enviada por el cliente, UTPL notifica el estado de la solicitud al cliente. |
| **Postcondiciones**  | UTPL actualiza el catálogo.                     |

| **Nombre**           | Monitoreo                                        |
|-----------------------|-------------------------------------------------|
| **Autor**            | DevSphere                                        |
| **Fecha**            | 25-10-2024                                      |
| **Descripción**      | Permite al administrador monitorear información en tiempo real de los vehículos, incluyendo la ruta original del préstamo y ubicación actual. |
| **Actores**          | - Administrador<br>- Telemetría-Vehículo (fuente de datos) |
| **Precondiciones**   | El vehículo debe estar registrado en el sistema y tener habilitada la telemetría. |
| **Flujo normal**     | 1. El administrador monitorea los vehículos de UTPL.<br>2. UTPL muestra la ruta y ubicación del vehículo. |
| **Flujo alternativo**| 2a. Si la telemetría no está disponible, UTPL muestra un mensaje de error al administrador. |
| **Postcondiciones**  | El administrador obtiene la información solicitada sobre los vehículos. |

| **Nombre**           | Devolución                                       |
|-----------------------|-------------------------------------------------|
| **Autor**            | DevSphere                                        |
| **Fecha**            | 25-10-2024                                      |
| **Descripción**      | Permite realizar el proceso de devolución de un vehículo, incluyendo la validación de su estado, la actualización de datos del vehículo, y la generación de un informe del uso realizado. |
| **Actores**          | - Guardia<br>- Administrador                     |
| **Precondiciones**   | El vehículo debe haber sido previamente prestado y estar listo para ser devuelto. |
| **Flujo normal**     | 1. El guardia ingresa imágenes del vehículo, hace el checklist del vehículo y notifica al administrador.<br>2. El administrador acepta la devolución de la solicitud y actualiza los datos del vehículo en UTPL.<br>3. UTPL muestra los datos actualizados al administrador.<br>4. El administrador genera un informe de solicitud y revisa el historial de solicitudes. |
| **Flujo alternativo**| 1a. Si se detecta algún daño o anomalía en el vehículo durante la validación, el guardia solicita una revisión adicional al administrador.<br>2a. Si la información ingresada para actualizar los datos del vehículo es inconsistente, UTPL solicita una verificación al administrador. |
| **Postcondiciones**  | UTPL actualiza el estado del vehículo, guarda un registro del uso y los costos asociados. |
