# ☁️ Desarrollo Cloud Native

Repositorio académico correspondiente a la asignatura **Desarrollo Cloud Native**, de la carrera de **Ingeniería en Informática**.

Este repositorio reúne mis prácticas, laboratorios, proyectos y aprendizajes relacionados con el desarrollo de aplicaciones modernas orientadas a la nube (*Cloud Native*).

---

## 🎓 Sobre la asignatura

La asignatura **Desarrollo Cloud Native** busca comprender cómo diseñar, desarrollar, desplegar y mantener aplicaciones utilizando tecnologías y arquitecturas orientadas a la nube.

Durante la asignatura se trabajan conceptos relacionados con:

* ☁️ Computación en la nube
* 🏗️ Arquitecturas Cloud Native
* 🔐 Gestión de identidad y autenticación
* 🔑 OAuth 2.0 y OpenID Connect (OIDC)
* 🪪 JSON Web Tokens (JWT)
* 🌐 APIs y servicios web
* 🐳 Contenedores
* 🚀 Despliegue de aplicaciones
* 🔄 Integración y automatización
* ☁️ Servicios de **Microsoft Azure**
* ☁️ Servicios de **Amazon Web Services (AWS)**
* 🔧 Buenas prácticas de desarrollo para aplicaciones distribuidas

La idea no es solamente aprender a utilizar servicios cloud, sino comprender **cómo se integran estos servicios dentro de una arquitectura de software real**.

---

## 🎯 Objetivos de aprendizaje

A lo largo de la asignatura espero desarrollar conocimientos para:

* Comprender los principios de desarrollo **Cloud Native**.
* Diseñar aplicaciones preparadas para ejecutarse en entornos cloud.
* Integrar aplicaciones web con proveedores de identidad.
* Implementar autenticación mediante **OAuth 2.0 / OpenID Connect**.
* Trabajar con tokens de acceso y JWT.
* Consumir y proteger APIs.
* Utilizar servicios de nube de distintos proveedores.
* Comparar diferentes soluciones cloud para un mismo problema.
* Aplicar buenas prácticas de seguridad en aplicaciones distribuidas.
* Comprender los procesos necesarios para desplegar aplicaciones en la nube.
* Integrar conceptos de desarrollo, infraestructura y automatización.

---

# 🧠 Conceptos principales

## ☁️ Cloud Native

Cloud Native es un enfoque para construir aplicaciones aprovechando las características de la computación en la nube.

Entre sus principales características se encuentran:

```text
Aplicaciones distribuidas
        ↓
Servicios independientes
        ↓
Escalabilidad
        ↓
Automatización
        ↓
Observabilidad
        ↓
Resiliencia
        ↓
Despliegue continuo
```

Durante la asignatura se busca comprender estos principios y aplicarlos en proyectos prácticos.

---

## 🔐 Identidad y autenticación

Uno de los temas trabajados es la integración de aplicaciones web con proveedores de identidad.

Entre las tecnologías estudiadas se encuentran:

* Microsoft Entra ID
* Amazon Cognito
* OAuth 2.0
* OpenID Connect
* JWT
* Access Tokens
* ID Tokens
* Bearer Authentication

Por ejemplo:

```text
┌──────────────┐
│   React App  │
└──────┬───────┘
       │
       │ Login
       ▼
┌──────────────────┐
│ Identity Provider│
│ Entra / Cognito  │
└────────┬─────────┘
         │
         │ Access Token
         ▼
┌──────────────────┐
│    Protected API │
└──────────────────┘
```

---

# ☁️ Microsoft Azure

Una parte de la asignatura se trabaja utilizando servicios de Microsoft Azure.

En este repositorio se incluye una implementación utilizando:

* Microsoft Entra ID
* Microsoft Authentication Library (MSAL)
* OAuth 2.0 / OpenID Connect
* Microsoft Graph API

La implementación permite comprender cómo una aplicación React puede autenticarse mediante una identidad administrada por Azure y posteriormente utilizar un **Access Token** para acceder a recursos protegidos.

### Flujo utilizado

```text
React
  │
  ▼
MSAL
  │
  ▼
Microsoft Entra ID
  │
  ▼
Access Token
  │
  ▼
Microsoft Graph API
```

---

# ☁️ Amazon Web Services

También se estudia la implementación de conceptos equivalentes utilizando AWS.

La rama `aws` contiene una migración de la autenticación desde Microsoft Entra ID hacia:

* Amazon Cognito
* Cognito User Pools
* OpenID Connect
* `react-oidc-context`
* `oidc-client-ts`
* JWT

### Flujo utilizado

```text
React
  │
  ▼
react-oidc-context
  │
  ▼
Amazon Cognito
  │
  ▼
OIDC / Authorization Code
  │
  ▼
Access Token
  │
  ▼
API protegida
```

Esta comparación permite comprender que una misma aplicación puede utilizar diferentes proveedores de identidad manteniendo conceptos comunes basados en estándares como **OAuth 2.0 y OpenID Connect**.

---

# 🔄 Azure vs AWS

Uno de los objetivos interesantes del trabajo es comprender las diferencias entre proveedores cloud.

| Concepto      | Microsoft Azure    | AWS                 |
| ------------- | ------------------ | ------------------- |
| Identidad     | Microsoft Entra ID | Amazon Cognito      |
| Librería      | MSAL               | react-oidc-context  |
| Protocolo     | OAuth 2.0 / OIDC   | OAuth 2.0 / OIDC    |
| Tokens        | JWT                | JWT                 |
| API de prueba | Microsoft Graph    | API propia / futura |
| Plataforma    | Azure              | AWS                 |

La idea no es solamente aprender una plataforma específica, sino entender **los conceptos que se mantienen aunque cambie el proveedor**.

---

# 📂 Estructura del repositorio

```text
Desarrollo-Cloud-Native/
│
├── cloud-01-entra-app-integration-main/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
│
├── ...
│
└── README.md
```

La estructura del repositorio irá creciendo a medida que avance la asignatura.

Cada actividad, laboratorio o proyecto podrá incorporar su propia documentación y código fuente.

---

# 🧪 Trabajos y prácticas

A medida que avance la asignatura, este repositorio contendrá diferentes actividades relacionadas con:

### 🔐 Autenticación

* Integración con Microsoft Entra ID
* Integración con Amazon Cognito
* OAuth 2.0
* OpenID Connect
* JWT
* Access Tokens

### 🌐 Desarrollo Web

* React
* TypeScript
* Vite
* Consumo de APIs
* Protección de recursos

### ☁️ Cloud

* Microsoft Azure
* Amazon Web Services
* Servicios administrados
* Configuración de recursos cloud
* Despliegue

### 🐳 DevOps y Cloud Native

* Docker
* Contenedores
* Automatización
* CI/CD
* Despliegue en la nube

> Los contenidos concretos se irán incorporando al repositorio a medida que avance la asignatura.

---

# 🛠️ Tecnologías

### Lenguajes

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)

### Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)

### Cloud

![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge\&logo=amazonaws\&logoColor=white)
![Azure](https://img.shields.io/badge/Azure-0078D4?style=for-the-badge\&logo=microsoftazure\&logoColor=white)

### Autenticación

![OAuth2](https://img.shields.io/badge/OAuth_2.0-000000?style=for-the-badge)
![OpenID](https://img.shields.io/badge/OpenID_Connect-F78C40?style=for-the-badge)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge\&logo=jsonwebtokens\&logoColor=white)

### Herramientas

![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge\&logo=git\&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge\&logo=github\&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge\&logo=docker\&logoColor=white)

---

# 📚 Enfoque de aprendizaje

Este repositorio no busca solamente almacenar código.

El objetivo es documentar el proceso de aprendizaje:

```text
Concepto
   ↓
Implementación
   ↓
Prueba
   ↓
Problema
   ↓
Investigación
   ↓
Solución
   ↓
Documentación
```

Cada práctica representa una oportunidad para comprender cómo funcionan las tecnologías utilizadas y cómo se aplican dentro de sistemas reales.

---

# 🚀 Evolución del repositorio

El repositorio irá evolucionando durante el desarrollo de la asignatura.

### Estado actual

* [x] Integración de React con Microsoft Entra ID
* [x] Autenticación mediante MSAL
* [x] Obtención de Access Tokens
* [x] Consumo de Microsoft Graph
* [x] Migración de autenticación hacia Amazon Cognito
* [x] Integración OIDC con Cognito
* [ ] API protegida con Cognito
* [ ] Despliegue cloud
* [ ] Containerización
* [ ] Automatización CI/CD
* [ ] Nuevas prácticas y laboratorios

---

# 🔐 Seguridad

Las credenciales y configuraciones sensibles **no deben almacenarse directamente en el repositorio**.

Las configuraciones locales utilizan archivos `.env`, los cuales se encuentran excluidos mediante `.gitignore`.

Ejemplo:

```env
VITE_CLIENT_ID=...
VITE_AUTHORITY=...
VITE_REDIRECT_URI=...
```

Los valores reales deben configurarse localmente o mediante mecanismos seguros de configuración y secretos.

---

# 👨‍💻 Autor

**Emilio Araya**

Estudiante de **Ingeniería en Informática** 🇨🇱

Interesado en:

* Backend Development
* Cloud Computing
* DevOps
* Linux
* Cybersecurity
* Cloud Native Architecture
* Automatización
* Desarrollo Web

---

## 📌 Propósito del repositorio

Este repositorio forma parte de mi proceso académico y tiene como objetivo documentar mi aprendizaje en **Desarrollo Cloud Native**, mostrando tanto las implementaciones realizadas como la evolución de los conocimientos adquiridos durante la asignatura.

> **Aprender Cloud Native no consiste solamente en aprender AWS o Azure.**
>
> Consiste en comprender cómo diseñar, desarrollar, asegurar, desplegar y operar aplicaciones modernas aprovechando las capacidades de la nube.

---

⭐ Este repositorio se actualizará durante el desarrollo de la asignatura con nuevas prácticas, proyectos y aprendizajes.
