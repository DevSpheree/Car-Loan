| **Nombre**           | Registro                                         |
|-----------------------|-------------------------------------------------|
| **Autor**            | DevSphere                                        |
| **Fecha**            | 25-10-2024                                      |
| **Descripción**      | Permite al administrador registrar nuevos vehículos en el sistema, además de buscar docentes, personal administrativo y vehículos (livianos o pesados) en la base de datos de la UTPL. |
| **Actores**          | - Administrador<br>- UTPL (fuente de datos)      |
| **Precondiciones**   | El administrador debe estar autenticado en el sistema. |
| **Flujo normal**     | 1. El administrador busca a los docentes o administrativos en UTPL.<br>2. UTPL devuelve la información de los usuarios buscados al administrador.<br>3. El administrador registra un nuevo vehículo en UTPL. |
| **Flujo alternativo**| 1a. Si el administrador no encuentra coincidencias en las búsquedas, UTPL muestra un mensaje de "no se encontraron resultados" al administrador.<br>2a. Si el administrador ingresa información incorrecta o incompleta para el registro de vehículos, UTPL muestra un mensaje de error y solicita correcciones al administrador. |
| **Postcondiciones**  | N/A                                             |
