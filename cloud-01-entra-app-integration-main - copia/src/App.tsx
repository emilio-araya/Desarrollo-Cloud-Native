import { useAuth } from "react-oidc-context";
import { ProtectedData } from "./ProtectedData";
import "./App.css";

export default function App() {
  const auth = useAuth();

  const handleLogin = () => {
    auth.signinRedirect().catch((e) => console.error(e));
  };

  const handleLogout = () => {
    // Cerramos la sesión local del cliente OIDC
    auth.removeUser();

    // Cerramos también la sesión de Cognito
    const clientId = "69su5f4eqp4e87su81drkvv3qd";
    const logoutUri = encodeURIComponent("http://localhost:5173");

    window.location.href =
      `https://us-east-1k556wtvmf.auth.us-east-1.amazoncognito.com/logout` +
      `?client_id=${clientId}&logout_uri=${logoutUri}`;
  };

  if (auth.isLoading) {
    return (
      <div className="layout">
        <main className="container">
          <div className="card text-center">
            <h2>Cargando...</h2>
            <p className="subtitle">
              Verificando la sesión con Amazon Cognito.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const currentUser = auth.user?.profile;

  return (
    <div className="layout">
      <header className="navbar">
        <div className="logo">
          ⚡ <span>Portal MiApp</span>
        </div>

        <div>
          {auth.isAuthenticated ? (
            <button
              className="btn btn-logout"
              onClick={handleLogout}
            >
              Cerrar Sesión
            </button>
          ) : (
            <button
              className="btn btn-login"
              onClick={handleLogin}
            >
              Iniciar Sesión
            </button>
          )}
        </div>
      </header>

      <main className="container">
        {auth.isAuthenticated ? (
          <div className="card">
            <div className="avatar">
              {currentUser?.name
                ? String(currentUser.name).charAt(0).toUpperCase()
                : "U"}
            </div>

            <h2>
              ¡Bienvenido, {currentUser?.name || "Usuario"}!
            </h2>

            <p className="subtitle">
              Autenticado con Amazon Cognito
            </p>

            <div className="user-details">
              <div className="detail-item">
                <strong>Correo / Usuario:</strong>
                <span>
                  {currentUser?.email ||
                    currentUser?.preferred_username ||
                    "No disponible"}
                </span>
              </div>

              <div className="detail-item">
                <strong>User Pool ID:</strong>
                <code>us-east-1_K556WtvmF</code>
              </div>
            </div>

            <hr
              style={{
                margin: "1.5rem 0",
                borderColor: "#eee",
              }}
            />

            <ProtectedData />
          </div>
        ) : (
          <div className="card text-center">
            <h2>Acceso Requerido</h2>

            <p className="subtitle">
              Para ingresar al sistema debes validar tus credenciales
              mediante Amazon Cognito.
            </p>

            <button
              className="btn btn-login btn-lg"
              onClick={handleLogin}
            >
              Iniciar Sesión con Amazon Cognito
            </button>
          </div>
        )}
      </main>
    </div>
  );
}