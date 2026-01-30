**Daily Sprint 5 – Gestión de Usuarios**
**Día 1 – Inicialización y estructura**

Se creó la estructura de carpetas y archivos para usuarios:

controllers/users.controller.js

routes/users.routes.js

views/users/

data/users.json

Se configuró EJS como motor de plantillas y se prepararon vistas básicas de registro y login.

Se instalaron y configuraron express-session y cookie-parser para manejo de sesiones y cookies.

**Día 2 – Registro de usuarios**

Se implementó el formulario de registro con los campos mínimos requeridos.

Se añadió la encriptación de contraseñas con bcryptjs.

Se guardaron los usuarios en JSON (users.json).

Se corrigieron errores de req.body y lectura/escritura del archivo JSON.

**Día 3 – Login**

Se creó el formulario de login.

Se validó que el email y contraseña coincidan con los datos del JSON.

Se almacenó la información del usuario en la sesión.

Se configuró la redirección al perfil en caso de login exitoso.

Se probó el manejo de errores con mensajes de credenciales incorrectas.

**Día 4 – “Recordarme” y middlewares**

Se implementó el checkbox “Recordarme” para guardar cookies del usuario.

Se desarrolló el middleware cookieAuthMiddleware para iniciar sesión automáticamente si la cookie existe y es válida.

Se diferenciaron rutas:

Huéspedes: no logueados → redirigen al perfil si intentan acceder al login o registro.

Usuarios: logueados → redirigen al login si intentan acceder a rutas restringidas.

**Día 5 – Perfil y Logout**

Se implementó la vista perfil de usuario que muestra los datos de la sesión.

Se implementó correctamente el logout, destruyendo la sesión y eliminando cookies si existían.

Se actualizó el header para mostrar el logout solo si hay un usuario logueado.

**Conclusión**

Todas las funcionalidades del Sprint 5 fueron implementadas correctamente: registro, login, logout, perfiles, rutas protegidas y cookies.

Se aprendió la importancia de los middlewares, sesiones y cookies para el manejo seguro de usuarios.

El sprint sienta una base sólida para futuros sprints con autenticación avanzada y perfiles editables.