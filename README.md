# Cloud Native — Amazon Cognito

Proyecto académico de la asignatura **Desarrollo Cloud Native** que implementa autenticación de usuarios mediante **Amazon Cognito**, utilizando React, Vite, TypeScript y OpenID Connect.

Esta versión corresponde a la rama **`aws`**, desarrollada a partir del proyecto original que utilizaba autenticación mediante **Microsoft Entra ID**.

---

## 📌 Descripción

El objetivo de esta etapa del proyecto es migrar el sistema de autenticación desde **Microsoft Entra ID / MSAL** hacia **Amazon Cognito**.

La aplicación permite:

* Iniciar sesión mediante Amazon Cognito.
* Gestionar el estado de autenticación desde React.
* Obtener un token JWT mediante OpenID Connect.
* Mostrar información básica del usuario autenticado.
* Proteger una sección de la aplicación para usuarios autenticados.
* Preparar el uso del token Bearer para futuras consultas a APIs protegidas.
* Cerrar sesión mediante el mecanismo de logout de Cognito.

---

## 🛠️ Tecnologías utilizadas

* **React**
* **TypeScript**
* **Vite**
* **Amazon Cognito**
* **OpenID Connect (OIDC)**
* **oidc-client-ts**
* **react-oidc-context**
* **pnpm**
* **Git / GitHub**

---

## 🌿 Rama utilizada

Esta implementación se encuentra en la rama:

```text
aws
```

La rama `aws` mantiene separada la implementación de Amazon Cognito respecto de la implementación principal basada en Microsoft Entra ID.

---

# ☁️ Configuración de Amazon Cognito

Para esta etapa se configuró un **User Pool** de Amazon Cognito en la región `us-east-1` y un App Client destinado a una aplicación SPA.

La aplicación utiliza un cliente **sin `client secret`**, apropiado para una aplicación que se ejecuta en el navegador.

> Los identificadores mostrados en la configuración corresponden al entorno académico utilizado durante el desarrollo. Los secretos reales de Cognito no deben almacenarse en el repositorio.

### Región

```text
us-east-1
```

### User Pool

```text
User Pool configurado para el proyecto Cloud Native
```

### App Client

```text
cloud-native-app
```

---

# 🔐 OAuth / OpenID Connect

La aplicación utiliza el flujo:

```text
Authorization Code Grant
```

La autenticación se realiza mediante **OpenID Connect (OIDC)** utilizando Amazon Cognito.

La URL de redirección utilizada durante el desarrollo local es:

```text
http://localhost:5173
```

Los scopes utilizados son:

```text
openid
email
phone
```

> Se utiliza `phone` porque forma parte de los scopes habilitados para el App Client utilizado durante esta práctica.

---

# 📦 Dependencias agregadas

Para realizar la migración se incorporaron las siguientes dependencias:

```text
oidc-client-ts
react-oidc-context
```

Instalación:

```bash
pnpm add oidc-client-ts react-oidc-context
```

Estas librerías permiten integrar el flujo OIDC con React y administrar la sesión del usuario autenticado.

---

# 📁 Estructura utilizada

```text
cloud-01-entra-app-integration-main - copia/
│
├── package.json
├── pnpm-lock.yaml
│
└── src/
    ├── App.tsx
    ├── ProtectedData.tsx
    ├── main.tsx
    └── useApi.ts
```

La carpeta conserva el nombre utilizado originalmente en el proyecto académico para mantener la estructura y el historial de trabajo.

---

# ⚙️ Configuración de autenticación

La configuración principal de Cognito se encuentra actualmente en:

```text
src/main.tsx
```

En esta etapa se utiliza `AuthProvider` de `react-oidc-context` para proporcionar el contexto de autenticación a la aplicación React.

Conceptualmente, la configuración utiliza:

```typescript
const cognitoAuthConfig = {
  authority: 'https://cognito-idp.us-east-1.amazonaws.com/<USER_POOL_ID>',
  client_id: '<APP_CLIENT_ID>',
  redirect_uri: 'http://localhost:5173',
  response_type: 'code',
  scope: 'openid email phone',
};
```

La aplicación se envuelve con:

```tsx
<AuthProvider {...cognitoAuthConfig}>
  <App />
</AuthProvider>
```

Esto permite utilizar `useAuth()` en los componentes React.

> Como mejora futura, la configuración de Cognito puede trasladarse a variables de entorno de Vite para separar configuración de código fuente.

---

# 🔑 Inicio de sesión

El componente principal utiliza:

```typescript
useAuth()
```

para comprobar el estado de autenticación.

Cuando el usuario selecciona la opción de inicio de sesión, se ejecuta:

```typescript
auth.signinRedirect()
```

El navegador es redirigido al sistema de autenticación administrado por Amazon Cognito.

Después de autenticarse, Cognito devuelve el resultado mediante el flujo **Authorization Code** y `react-oidc-context` administra la sesión.

---

# 👤 Información del usuario

Una vez autenticado, la aplicación obtiene la información del usuario desde:

```typescript
auth.user?.profile
```

La interfaz permite trabajar con información como:

* Nombre del usuario.
* Correo electrónico.
* Nombre de usuario, si está disponible.
* Estado de autenticación.

---

# 🛡️ Recurso protegido

El componente:

```text
src/ProtectedData.tsx
```

representa una sección disponible solamente para usuarios autenticados.

Antes de utilizar el token se comprueba:

```typescript
auth.user?.access_token
```

Si no existe un token válido, se muestra un mensaje de acceso denegado.

Cuando existe un token, la aplicación puede demostrar que el flujo de autenticación entregó correctamente un **Access Token JWT de Amazon Cognito**.

Por seguridad, la interfaz no necesita mostrar el JWT completo.

---

# 🌐 Uso del token Bearer

El archivo:

```text
src/useApi.ts
```

contiene un hook personalizado llamado:

```typescript
useApi()
```

Este hook obtiene el token desde:

```typescript
auth.user?.access_token
```

y lo incorpora a las peticiones HTTP mediante el encabezado:

```http
Authorization: Bearer <access_token>
```

La función utilizada es:

```typescript
fetchWithToken()
```

Esto deja preparada la aplicación para comunicarse posteriormente con una API protegida mediante tokens JWT.

---

# 🚪 Cierre de sesión

El cierre de sesión utiliza el mecanismo de logout administrado por Amazon Cognito.

La aplicación elimina primero el usuario local mediante:

```typescript
auth.removeUser()
```

y posteriormente puede redirigir al endpoint de logout configurado para Cognito.

La intención es cerrar correctamente la sesión y regresar a la aplicación local.

---

# 🧪 Ejecución del proyecto

Ingresar al directorio del proyecto y ejecutar:

```bash
pnpm install
pnpm dev
```

La aplicación queda disponible normalmente en:

```text
http://localhost:5173
```

---

# ✅ Comprobación de TypeScript

Durante el desarrollo se puede comprobar el proyecto mediante:

```bash
pnpm exec tsc --noEmit
```

Esto permite verificar que no existan errores de TypeScript antes de continuar con las pruebas de autenticación.

---

# 🔄 Migración desde Microsoft Entra ID

El proyecto originalmente utilizaba:

```text
@azure/msal-browser
@azure/msal-react
```

para autenticación mediante Microsoft Entra ID.

La implementación de esta rama utiliza:

```text
oidc-client-ts
react-oidc-context
```

y Amazon Cognito como proveedor de identidad.

### Antes

```text
React
  ↓
MSAL
  ↓
Microsoft Entra ID
```

### Ahora

```text
React
  ↓
react-oidc-context
  ↓
oidc-client-ts
  ↓
OpenID Connect
  ↓
Amazon Cognito
```

Esta migración permite comparar dos proveedores de identidad diferentes utilizando conceptos y estándares comunes de autenticación.

---

# ⚠️ Estado actual

La integración de Amazon Cognito está implementada en la rama:

```text
aws
```

El flujo de redirección hacia Cognito forma parte de la implementación actual y la aplicación está preparada para trabajar con la sesión y el Access Token entregados por Cognito.

La etapa de prueba continúa enfocada en validar el flujo completo de autenticación con el usuario configurado en Cognito.

### Progreso

* [x] Migración desde Microsoft Entra ID hacia Amazon Cognito
* [x] Integración de OpenID Connect
* [x] Integración de `react-oidc-context`
* [x] Flujo de redirección hacia Cognito
* [x] Gestión del usuario autenticado desde React
* [x] Preparación del Access Token para peticiones Bearer
* [ ] Validación final del inicio de sesión con el usuario de Cognito
* [ ] Integración con una API protegida
* [ ] Configuración mediante variables de entorno
* [ ] Limpieza de dependencias y configuración antigua de Entra ID

---

# 🔐 Seguridad

Las credenciales y configuraciones sensibles **no deben almacenarse directamente en el repositorio**.

Los secretos reales deben mantenerse fuera del código fuente y configurarse mediante mecanismos seguros.

Los identificadores públicos de una aplicación SPA, como un `client_id`, no equivalen a un `client_secret`; aun así, mantener la configuración mediante variables de entorno facilita separar código y configuración.

---

# 🚀 Próximos pasos

Para continuar con el proyecto:

1. Completar la validación del inicio de sesión con el usuario de Amazon Cognito.
2. Confirmar la visualización de los datos del usuario autenticado.
3. Probar el cierre de sesión.
4. Confirmar la obtención y utilización del JWT.
5. Conectar `fetchWithToken()` con una API protegida.
6. Trasladar la configuración de Cognito a variables de entorno de Vite.
7. Revisar y retirar las dependencias o archivos de configuración de Entra ID que ya no sean necesarios.
8. Continuar con las siguientes actividades de la asignatura.

---

# 👨‍💻 Autor

**Emilio Araya**

Estudiante de **Ingeniería en Informática** 🇨🇱

Proyecto académico de la asignatura **Desarrollo Cloud Native**.

Este repositorio documenta el avance práctico de la asignatura y la evolución desde una implementación basada en Microsoft Entra ID hacia una implementación basada en Amazon Cognito.
