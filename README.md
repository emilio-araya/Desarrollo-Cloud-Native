# Cloud Native — Amazon Cognito

Proyecto de desarrollo Cloud Native que implementa autenticación de usuarios mediante **Amazon Cognito**, utilizando React, Vite, TypeScript y OpenID Connect.

Esta versión corresponde a la rama **`aws`**, creada a partir del proyecto original que utilizaba autenticación mediante **Microsoft Entra ID**.

---

## 📌 Descripción

El objetivo de esta etapa del proyecto fue migrar el sistema de autenticación desde **Microsoft Entra ID / MSAL** hacia **Amazon Cognito**.

La aplicación permite:

* Iniciar sesión mediante Amazon Cognito.
* Gestionar el estado de autenticación desde React.
* Obtener un token JWT mediante OpenID Connect.
* Mostrar información básica del usuario autenticado.
* Proteger una sección de la aplicación para usuarios autenticados.
* Utilizar el token Bearer para futuras consultas a APIs protegidas.
* Cerrar sesión mediante el endpoint de logout de Cognito.

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

La rama `aws` fue creada a partir de `main` para mantener separada la implementación de Amazon Cognito.

Actualmente la rama contiene un commit adicional respecto a `main`:

```text
d083dae
Migrar autenticación de Entra ID a Amazon Cognito
```

---

# ☁️ Configuración de Amazon Cognito

Se creó y configuró un **User Pool** en Amazon Cognito.

### User Pool

```text
User Pool Name:
User pool - l4955l
```

### User Pool ID

```text
us-east-1_K556WtvmF
```

### Región

```text
us-east-1
```

### App Client

```text
cloud-native-app
```

### App Client ID

```text
69su5f4eqp4e87su81drkvv3qd
```

La aplicación utiliza un cliente sin `client secret`, adecuado para una aplicación SPA ejecutándose en el navegador.

---

# 🔐 OAuth / OpenID Connect

La aplicación utiliza:

```text
Authorization Code Grant
```

El issuer de Cognito utilizado por la aplicación es:

```text
https://cognito-idp.us-east-1.amazonaws.com/us-east-1_K556WtvmF
```

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

> Se utiliza `phone` porque es uno de los scopes habilitados en el App Client de Cognito.

---

# 📦 Dependencias agregadas

Para realizar la migración se instalaron las siguientes dependencias:

```text
oidc-client-ts
react-oidc-context
```

Instalación realizada mediante:

```powershell
pnpm add oidc-client-ts react-oidc-context
```

Versiones utilizadas:

```text
oidc-client-ts     3.5.0
react-oidc-context 3.3.1
```

---

# 📁 Archivos modificados

Durante la migración se modificaron principalmente los siguientes archivos:

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

---

# ⚙️ Configuración de autenticación

La configuración principal se encuentra en:

```text
src/main.tsx
```

Se utiliza `AuthProvider` de `react-oidc-context`.

Configuración utilizada:

```typescript
const cognitoAuthConfig = {
  authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_K556WtvmF',
  client_id: '69su5f4eqp4e87su81drkvv3qd',
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

---

# 🔑 Inicio de sesión

El componente principal utiliza:

```typescript
useAuth()
```

para comprobar el estado de autenticación.

Cuando el usuario selecciona:

```text
Iniciar Sesión con Amazon Cognito
```

se ejecuta:

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

La interfaz muestra información como:

* Nombre del usuario.
* Correo electrónico.
* Nombre de usuario, si está disponible.
* User Pool ID.
* Estado de autenticación.

La pantalla muestra además:

```text
¡Bienvenido, Usuario!
Autenticado con Amazon Cognito
```

---

# 🛡️ Recurso protegido

El componente:

```text
src/ProtectedData.tsx
```

representa una sección disponible solamente para usuarios autenticados.

Antes de obtener el token se comprueba:

```typescript
auth.user?.access_token
```

Si no existe un token válido, se muestra un mensaje de acceso denegado.

Cuando existe un token, se muestra información de prueba indicando que se obtuvo correctamente el JWT de Amazon Cognito.

Por seguridad, la interfaz solamente muestra una parte truncada del token:

```text
xxxxxxxxxxxxxxxxxxxx...
```

No se muestra el JWT completo en pantalla.

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

El cierre de sesión utiliza el endpoint de logout administrado por Amazon Cognito.

La aplicación elimina primero el usuario local:

```typescript
auth.removeUser()
```

y posteriormente redirige al endpoint:

```text
/cognito/logout
```

utilizando el App Client ID y la URL de salida configurada.

La intención es cerrar correctamente la sesión de Cognito y regresar a:

```text
http://localhost:5173
```

---

# 🧪 Ejecución del proyecto

Primero ingresar al directorio del proyecto:

```powershell
cd "C:\Users\MP-Alumno\Downloads\Desarrollo-Cloud-Native\cloud-01-entra-app-integration-main - copia"
```

Instalar dependencias:

```powershell
pnpm install
```

Ejecutar el servidor de desarrollo:

```powershell
pnpm dev
```

La aplicación queda disponible normalmente en:

```text
http://localhost:5173
```

---

# ✅ Comprobación de TypeScript

Durante la migración se utilizó:

```powershell
pnpm exec tsc --noEmit
```

para comprobar que el proyecto no presentara errores de TypeScript.

---

# 🔄 Migración desde Microsoft Entra ID

El proyecto originalmente utilizaba:

```text
@azure/msal-browser
@azure/msal-react
```

para autenticación mediante Microsoft Entra ID.

La nueva implementación utiliza:

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

---

# ⚠️ Estado actual

La integración de Amazon Cognito está implementada y subida a GitHub en la rama:

```text
aws
```

El flujo de redirección hacia Cognito fue probado correctamente.

También se comprobó que Cognito presenta la pantalla de inicio de sesión.

Queda pendiente completar/prueba final con las credenciales del usuario creado en Cognito.

El problema pendiente corresponde a las credenciales/configuración del usuario de Cognito y no a la subida del código a GitHub.

---

# 📌 Git

Repositorio:

```text
Desarrollo-Cloud-Native
```

Rama:

```text
aws
```

Commit de la migración:

```text
d083dae
```

Mensaje:

```text
Migrar autenticación de Entra ID a Amazon Cognito
```

La rama remota está sincronizada con GitHub:

```text
aws -> origin/aws
```

Estado final comprobado:

```text
On branch aws
Your branch is up to date with 'origin/aws'.

nothing to commit, working tree clean
```

---

# 🚀 Próximos pasos

Para continuar con el proyecto:

1. Solucionar/probar las credenciales del usuario de Amazon Cognito.
2. Confirmar el inicio de sesión completo.
3. Confirmar la visualización de los datos del usuario.
4. Probar el cierre de sesión.
5. Probar la obtención del JWT.
6. Si se requiere, conectar `fetchWithToken()` con una API protegida.
7. Eliminar posteriormente las dependencias antiguas de MSAL si ya no son necesarias.
8. Revisar y eliminar archivos de configuración de Entra ID que ya no tengan uso.
9. Considerar mover la configuración de Cognito a variables de entorno de Vite.

---

## 👨‍💻 Autor:  Emilio Araya

Proyecto académico de la asignatura **Desarrollo Cloud Native**.

Repositorio:

```text
Desarrollo-Cloud-Native
```

Implementación actual:

```text
Rama aws — Amazon Cognito
```
