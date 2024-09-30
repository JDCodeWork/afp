
# Aplicación de Finanzas Personales

AFP es un proyecto de software FullStack que me he propuesto para desarrollar y reafirmar mis conocimientos tanto en el desarrollo front-end como back-end

## Descripción 📖

`AFP` es una aplicación web que permite a los usuarios gestionar sus finanzas personales de manera intuitiva, esto mediante el uso de presupuestos, metas, gastos recurrentes y vista para las transacciones realizadas.

## Tecnologías Utilizadas 🛠️

Este proyecto está siendo desarrollado utilizando las siguientes tecnologías:

- **Back-End:** [NestJS](https://nestjs.com/) - Un framework de Node.js para construir aplicaciones escalables y mantenibles.
- **Front-End:** [React](https://reactjs.org/) - Una biblioteca de JavaScript para construir interfaces de usuario dinámicas.

Si decides replicar este proyecto, eres libre de usar las tecnologías que prefieras o te sientas más cómodo/a utilizando. Por ejemplo, podrías usar **Express** en lugar de NestJS o **Vue.js** en lugar de React. La estructura principal y los requerimientos seguirán siendo los mismos.

## Planificación del Proyecto 🗓️

Antes de sumergirme directamente en el código, iré compartiendo en el repositorio los pasos que estoy siguiendo para planificar correctamente el proyecto. Esto incluye, pero no se limita a:

- **Diagrama Entidad-Relación (ER):** Para visualizar y estructurar las relaciones entre las diferentes entidades (usuarios, transacciones, presupuestos, etc.).
- **Diseño de la UI:** Bocetos y prototipos de la interfaz de usuario para asegurarme de que la experiencia sea intuitiva y funcional.

Conforme vaya avanzando en estas etapas de planificación, estaré subiendo la documentación y los recursos para que otros puedan seguir el mismo enfoque o adaptarlo según sus necesidades.


## Requerimientos funcionales

Para el diseño de esta aplicación se han propuesto los siguientes requerimientos funcionales los cuales pueden proporcionar una idea de que es lo que la aplicación debe realizar

### Front-End

1. **Vista General:**
   - Los usuarios deben poder ver un resumen de todas sus finanzas personales en una página de vista general. Esta página mostrará información de transacciones, presupuestos, metas de ahorro y facturas recurrentes.

2. **Gestión de Transacciones:**
   - Los usuarios deben poder ver una lista de todas sus transacciones.
   - Implementar paginación para mostrar 10 transacciones por página.
   - Los usuarios deben poder buscar transacciones por palabra clave.
   - Los usuarios deben poder filtrar y ordenar transacciones por criterios específicos (fecha, monto, categoría, etc.).

3. **CRUD de Presupuestos y Metas de Ahorro:**
   - Los usuarios deben poder crear nuevos presupuestos y metas de ahorro.
   - Los usuarios deben poder ver una lista de presupuestos existentes.
   - Los usuarios deben poder actualizar un presupuesto o meta de ahorro.
   - Los usuarios deben poder eliminar presupuestos o metas de ahorro.
   - Debe mostrarse el progreso de cada meta de ahorro y presupuesto.
   - Los usuarios deben poder ver las últimas tres transacciones asociadas a cada categoría de presupuesto.

5. **Gestión de Facturas Recurrentes:**
   - Los usuarios deben poder ver una lista de facturas recurrentes y su estado actual (pagada o pendiente) para el mes en curso.
   - Los usuarios deben poder buscar y ordenar facturas recurrentes por diferentes criterios (fecha de vencimiento, estado, monto, etc.).

6. **Responsividad:**
   - La interfaz debe ajustarse automáticamente a diferentes tamaños de pantalla para que sea usable en dispositivos móviles, tabletas y pantallas de escritorio.

### Back-End

1. **Autenticación y Autorización:**
   - Los usuarios deben poder registrarse creando una nueva cuenta.
   - Los usuarios deben poder iniciar sesión utilizando credenciales (correo electrónico y contraseña) y obtener un token JWT para autenticación.
   - Los usuarios deben poder cerrar sesión invalidando el token JWT.
   - Los endpoints protegidos deben requerir autenticación mediante JWT para acceder.

2. **Gestión de Usuarios:**
   - El sistema debe permitir crear nuevos usuarios.
   - Los usuarios deben poder ver, actualizar y eliminar su perfil personal.
 
3. **CRUD de Transacciones:**
   - Crear nuevas transacciones en el sistema.
   - Consultar una lista de sus transacciones.
   - Actualizar los detalles de sus transacciones existentes.
   - Eliminar transacciones que ya no necesiten.

4. **CRUD de Presupuestos y Metas de Ahorro:**

   - Crear presupuestos y metas de ahorro.
   - Consultar una lista de presupuestos y metas existentes.
   - Actualizar presupuestos y metas.
   - Eliminar presupuestos y metas.

5. **Gestión de Facturas Recurrentes:**
   - Crear nuevas facturas recurrentes (por ejemplo, alquiler o servicios públicos).
   - Ver una lista de sus facturas recurrentes.
   - Actualizar los detalles de las facturas.
   - Eliminar facturas recurrentes.

6. **Persistencia de Datos:**
   - Toda la información de usuarios, transacciones, presupuestos, metas de ahorro y facturas recurrentes debe ser persistente en una base de datos.
   - El sistema debe permitir el uso de consultas eficientes para obtener, actualizar o eliminar la información almacenada.

7. **Documentación del API:**
   - La API debe estar documentada con la especificación OpenAPI para facilitar la comprensión y prueba de los endpoints.
