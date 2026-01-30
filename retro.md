**Retrospectiva Sprint 5 – Gestión de Usuarios**
**Qué salió bien** 

Se implementó el registro de usuarios con todos los campos necesarios.

Se encriptaron las contraseñas usando bcrypt.js.

El login funciona correctamente, incluyendo validación de email y contraseña.

Se implementó la funcionalidad de “Recordarme” con cookies.

Las rutas protegidas y de huéspedes funcionan como corresponde.

Se implementó correctamente el logout y se gestiona la sesión del usuario.

Integración del motor de plantillas EJS para renderizar vistas dinámicas.

**Qué salió mal / desafíos**

Hubo errores iniciales con req.body y manejo de archivos JSON.

Se presentaron problemas con la visibilidad del logout hasta ajustar los middlewares y res.locals.user.

Algunas rutas y middlewares requerían ajustes para redirecciones correctas.

Gestión de cookies y sesión generó errores hasta organizar correctamente cookie-parser y express-session.

**Aprendizajes**

La importancia de inicializar correctamente la sesión y cookies antes de las rutas.

Cómo manejar middlewares para proteger rutas según el tipo de usuario.

Buenas prácticas en la gestión de datos sensibles (como contraseñas).

La importancia de estructurar controladores, rutas y vistas de manera consistente.

**Próximos pasos / mejoras**

Mejorar la validación de formularios (por ejemplo, mostrar errores al usuario).

Implementar perfil editable y subida de avatar si se desea.

Optimizar la gestión de cookies para seguridad y expiración.

Automatizar tests de rutas y sesiones para asegurar el correcto funcionamiento.