
# Aplicación de Finanzas Personales

AFP es un proyecto de software FullStack que me he propuesto para desarrollar y reafirmar mis conocimientos tanto en el desarrollo front-end como back-end

## Descripción 📖

`AFP` es una aplicación web diseñada para ayudar a los usuarios a gestionar sus finanzas personales de manera intuitiva. Ofrece diversas herramientas que permiten un control eficiente de los recursos:

- **Presupuestos**: proporcionan una guía clara sobre el límite máximo de gasto en cada categoría financiera, ayudando a evitar excesos.
- **Metas**: permiten al usuario monitorear sus ahorros y visualizar su progreso hacia objetivos financieros específicos.
- **Gastos recurrentes**: gestionan pagos periódicos, como cuotas, suscripciones o facturas, manteniendo al usuario al tanto de sus compromisos financieros.
- **Transacciones**: registran y gestionan los ingresos y egresos, ofreciendo una visión completa de las finanzas personales.

Con estas funcionalidades, `AFP` facilita una gestión financiera más ordenada y eficiente.

## Requerimientos

Para el desarrollo de la aplicación, se han definido los siguientes requerimientos necesarios para su completo funcionamiento:

- **Gestión de Bolsillos de Ahorro**: El sistema permitirá a los usuarios crear y gestionar bolsillos de ahorro. Los usuarios podrán definir metas, establecer cronogramas de ahorro y asociar transacciones de ahorro a estas metas. Será posible aprobar, modificar o eliminar estos bolsillos en cualquier momento.

- **Gestión de Transacciones**: Los usuarios podrán crear y gestionar transacciones (ingresos y gastos), cada una asociada a una categoría financiera específica. El sistema debe permitir la clasificación de las transacciones de acuerdo a la naturaleza del movimiento (ingreso o gasto) y su categoría correspondiente.

- **Presupuestos**: El sistema permitirá a los usuarios crear y gestionar presupuestos, estableciendo límites máximos de gasto para diferentes categorías. Estos presupuestos ayudarán a los usuarios a controlar sus finanzas y evitar exceder los límites definidos.

- **Gastos Recurrentes**: El sistema permitirá a los usuarios gestionar pagos recurrentes, como suscripciones, facturas o cuotas periódicas. Los usuarios podrán visualizar y administrar estos pagos, configurando la frecuencia y las fechas de inicio y fin.

- **Registro y Autenticación Segura**: El sistema debe proporcionar un mecanismo seguro para que los usuarios se registren, inicien sesión y accedan a la aplicación. Además, permitirá a los usuarios modificar su información personal cuando lo deseen, respetando las normas de seguridad y privacidad.

Con estos requerimientos, se busca garantizar una gestión integral y segura de las finanzas personales de los usuarios.

# Planificación del Sistema

Esta sección incluye toda la información visual y los datos utilizados para planear el desarrollo de `AFP`, una aplicación web para gestionar finanzas personales.

## 1. Diagramas de Arquitectura del Sistema 🏗️

### 1.1 Diagrama Entidad-Relación (ER)

![Diagrama ER](https://ucarecdn.com/41e92130-f5b0-430b-a5e5-8d533ea3b1a8/)

<!-- ### 1.2 Diagrama de Componentes

![Diagrama de Componentes](https://ucarecdn.com/066f4bde-293a-4bae-828c-1d69a3196f61/) -->

## 2. Estructura de Base de Datos 🗄️

### 2.1 Esquema de Tablas

A continuación, se presenta una vista general de las tablas y sus relaciones:

- **Users**: Maneja la información personal y de acceso de los usuarios.
- **Transactions**: Registra todas las transacciones de ingresos y gastos.
- **Goals**: Representa los diferentes objetivos de ahorro.
- **Subscription**: Gestiona las suscripciones y pagos periódicos.
- **Budgets**: Define los límites de gasto en distintas categorías.

## 3. Mockups y Diseño de la UI 🎨

_En desarrollo_

<!-- ### 3.1 Pantallas de Usuario

![Pantalla de Usuario](ruta/al/mockup-pantalla-usuario.png)
Descripción: Diseño preliminar de la interfaz de usuario, mostrando cómo los usuarios gestionarán sus finanzas personales.

### 3.2 Pantallas de Transacciones

![Pantalla de Transacciones](ruta/al/mockup-pantalla-transacciones.png)
Descripción: Diseño de la pantalla donde los usuarios pueden añadir, editar y visualizar sus transacciones. -->

## 4. Reglas de Negocio y Validaciones ⚖️

- Los usuarios deben autenticarse de manera segura antes de poder acceder a la aplicación.
- Solo los usuarios registrados podrán crear, modificar o eliminar transacciones, presupuestos, y metas.
- Las transacciones deben asociarse a una categoría y deben respetar los límites definidos en los presupuestos.
- Los pagos recurrentes serán automáticos según la frecuencia establecida, pero los usuarios podrán cancelarlos en cualquier momento.

# Estado del Proyecto 📆

| Tarea | Descripción | Estado |
|-------|-------------|--------|
| **Diseño de la Arquitectura** | Proporcionar más claridad del funcionamiento. | ⬜️ En Proceso |
