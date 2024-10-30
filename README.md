# Car-Loan
## Descripción del reto

La administración de los vehículos de la universidad requiere un control riguroso para asegurar su disponibilidad y buen uso. Un sistema de gestión de préstamos nativo nube permitirá organizar y monitorear las solicitudes y devoluciones de vehículos, asegurando una utilización eficiente y responsable de estos recursos. La nube proporcionará una plataforma centralizada y segura para el manejo de datos.

## ¿Qué es la gestión de préstamos de vehiculos?

Es el proceso por el cual la UTPL podrá gestionar y organizar los vehículos que provea para la renta. Este sistema permitirá el registro tanto de vehículos como usuarios, La creación de solicitudes de préstamo por parte del cliente, el monitoreo de los vehículos activos, la devolución del vehículo para culminar una renta, facilitar la inspección de los vehículos devueltos.

## Problema

Actualmente, la gestión de los vehículos se lleva a cabo de forma manual, lo que genera demoras, posibles errores humanos y falta de visibilidad en tiempo real del estado de los préstamos. Queremos reducir estos inconvenientes, brindando una solución digital que automatice las tareas y ofrezca mayor control y acceso inmediato a la información

## Nuestra solución
Desarrollar un sistema en la nube que permita gestionar los prestamos de vehículos de la universidad que permitan una administración optima y eficiente, garantizando el uso adecuado de los recursos vehiculares.

## Objetivo de la Aplicacion

Gestionar de forma eficiente los préstamos y devoluciones de vehículos. Nos permitirá registrar de manera clara quién tiene cada vehículo, cuándo debe devolverlo, y garantizar que todo el proceso esté bien documentado y controlado desde cualquier dispositivo con acceso a internet.

## ¿Qué Buscamos?

Ofrecer una experiencia más ágil tanto para los usuarios que prestan los vehículos como para el equipo encargado de gestionarlos

## Descripción de la Aplicación
La aplicación estará alojada en la nube, específicamente utilizando los servicios de Google Cloud, lo que garantiza que será accesible desde cualquier dispositivo conectado a internet. Esta accesibilidad es clave para que tanto el personal administrativo como los usuarios puedan acceder en cualquier momento y lugar. Además, integraremos Firebase para manejar la autenticación de usuarios, la base de datos en tiempo real y otras funcionalidades como notificaciones push, lo que permitirá una experiencia de usuario fluida y eficiente, aprovechando la infraestructura segura y escalable de Google

## Características del Sistema
- Registro de Usuarios
- Catálogo de Vehículos
- Solicitud de Préstamos
- Sistema de Aprobación
- Seguimiento de Solicitudes
- Historial de Préstamos
- Sistema de Devolución

## Mapa de Capacidades

Agregar la descripción correspondiente de cada capacidad

- Registro: Se podrá registrar vehículos bajo dos categorías (Livianos o Pesados), Se podrá registrar usuarios bajo dos categorías (Docente o Administrativo).
- Préstamo: Un usuario crea una solicitud al especificar el vehículo, el lugar de destino y el tiempo de duración del préstamo. Luego un usuario administrativo puede aceptar or rechazar dicha solicitud y el cliente será notificado sobre el estado de su solicitud. Si el cliente lo desea, este podrá cancelar su solicitud.
- Monitoreo: El usuario administrativo podrá visualizar la ubicación actual de un vehículo que forme parte de una préstamo activa y la ruta original que fue especificada en la solicitud del préstamo.
- Devolución: El usuario administrativo deberá tomar fotos del vehículo devuelto y posteriormente realizara el checklist para asegurar el estado actual del vehículo. Luego actualiza los datos relacionados al kilometraje y la gasolina del vehículo. Por úlitmo, genera un informe sobre el uso del vehículo y los costos generados por parte del cliente durante el préstamo.

## CAMBIOS PENDIENTES:
- En el mapa dentro devoluciones cambiar el tercer nivel a actualizar kilometraje y actualizar gasolina

![MapaCapacidades](https://github.com/DevSpheree/Car-Loan/blob/7d194e0a815889e6f17f1a9c886c76b2214a5120/Mapa%20de%20Capacidades.png)





