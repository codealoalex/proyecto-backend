# BACKEND
Por el momento se desarrolló las APIs necesarias para hacer el login de un administrador y de un residente. 

## Variables de entorno
Crear un archivo .env para que no exista problemas, se describe en: .env-ejemplo

## Login
La estructura para que un administrador pueda loguearse es la siguiente: 
* Debe tener un campo con el nombre **usuario**, el cual es el id del usuario (residente o administrador).
* Debe tener un campo con el nombre **clave**, el cual es la contraseña del usuario.
* Campo del tipo de usuario, que puede ser administrador o residente (por el momento debe estar escrito en minusculas para no tener errores).
Ya sea para un residente o un administrador, se devolverán los siguientes datos en formato JSON:
* Mensaje de éxito
* Datos básicos del usuario como ser: id, nombre, paterno, materno y correo
* Token: El token es un jwt que devuelve la cabecera, el payload y la firma


## Registro
Un administrador no debería registrar nuevos residentes o nuevos administradores si no se encuentra logueado, asi que importante loguearse primero.
Ya habiendose logueado, debe añadir los siguientes campos para adicionar nuevos usuarios a la base de datos:
* id
* nombre
* paterno
* materno
* fecha (fecha de nacimiento AAAA-MM-DD)
* correo
* contacto
* clave
* tipo (el tipo de usuario que es)
* departamento (en caso de que el usuario sea residente y dicho departamento debe existir en la base de datos porque en todo caso habrá un error).


## Uso de APIs
**/api/user/login** es la api para que cualquier usuario pueda loguearse, ya sea residente o administrador
**api/user/registrar** es la api para que un administrador pueda registrar nuevos usuarios

## Recomendaciones
Debido a que se crearon cookies para una mejor "seguridad" al momento de la autenticacion, si se hacen las pruebas correspondientes
es recomendable eliminar las cookies en el apartado aplicación del navegador. O en otros casos, ir al archivo /loginController/login.controller.js y modificar el 
**maxAge** de dicha cookie para que su vida sea menor


