# ☁️ Desarrollo Cloud Native

Laboratorios de la asignatura **Desarrollo Cloud Native** (Ingeniería en Informática). El foco es la autenticación de una SPA con un proveedor de identidad mediante OAuth 2.0 / OpenID Connect, primero con Microsoft Entra ID y luego con Amazon Cognito.

> El proyecto donde apliqué estos conceptos de forma completa (BFF, microservicios, validación JWT con Entra ID y Cognito, Terraform) es [Pedidos360](https://github.com/emilio-araya/pedidos360-infra).

## Contenido

| Carpeta / rama | Qué contiene | Estado |
|---|---|---|
| [`cloud-01-entra-app-integration/`](cloud-01-entra-app-integration) | SPA React + TypeScript + Vite que inicia sesión con Microsoft Entra ID usando MSAL, obtiene un access token (`User.Read`) y lo adjunta como `Bearer` en las peticiones. | ✅ Funcional |
| Rama [`aws`](https://github.com/emilio-araya/Desarrollo-Cloud-Native/tree/aws) | La misma SPA migrada a Amazon Cognito con `react-oidc-context` (Authorization Code + PKCE). | ✅ Funcional |
| [`backend/`](backend) | Proyecto Spring Boot con Spring Security y OAuth2 Resource Server. | 🚧 Solo el esqueleto inicial: aún no expone endpoints ni valida tokens. |

## Cómo ejecutar la SPA (Entra ID)

Requisitos: Node.js 18+ y un registro de aplicación en Microsoft Entra ID de tipo *Single-page application* con la URI de redirección `http://localhost:5173`. Los pasos para crear el registro están en el [README de la práctica](cloud-01-entra-app-integration/README.md).

```bash
cd cloud-01-entra-app-integration
cp .env.example .env   # completar VITE_AZURE_CLIENT_ID y VITE_AZURE_TENANT_ID
npm install
npm run dev
```

## Decisiones

- **MSAL para Entra ID y `react-oidc-context` para Cognito.** Cada librería es la recomendada para su proveedor; compararlas muestra que el flujo OIDC es el mismo aunque cambie el proveedor.
- **Configuración por variables de entorno.** Los identificadores del registro de la aplicación no se versionan; solo se incluye `.env.example`.
- **El token se pide con `acquireTokenSilent`.** Así se reutiliza la sesión sin redirigir al usuario en cada petición.

## Pendiente

- Implementar en `backend/` una API que valide los tokens emitidos por Entra ID y Cognito.
- Contenerizar y desplegar la SPA y la API.
