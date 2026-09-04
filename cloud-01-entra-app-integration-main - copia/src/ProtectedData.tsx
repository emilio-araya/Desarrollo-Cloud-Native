import { useState } from "react";
import { useAuth } from "react-oidc-context";
import { useApi } from "./useApi";

export function ProtectedData() {
  const auth = useAuth();
  const { fetchWithToken } = useApi();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      /*
       * Aquí posteriormente pondremos la URL de nuestro Backend/API
       * protegido con el JWT de Amazon Cognito.
       *
       * Por ahora no llamamos a Microsoft Graph, ya que estamos
       * migrando de Microsoft Entra ID a Amazon Cognito.
       */

      if (!auth.user?.access_token) {
        throw new Error("No se encontró el token de acceso de Cognito.");
      }

      const token = auth.user.access_token;

      setData({
        mensaje: "Token de Amazon Cognito obtenido correctamente",
        tipo: "Bearer JWT",
        token: `${token.substring(0, 20)}...`,
      });
    } catch (err: any) {
      setError(err.message || "Error al obtener datos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {auth.isAuthenticated ? (
        <div style={{ marginTop: "1.5rem", textAlign: "left" }}>
          <h3>Consulta Protegida con Amazon Cognito</h3>

          <p
            style={{
              fontSize: "0.85rem",
              color: "#666",
              marginBottom: "1rem",
            }}
          >
            Esta sección prueba la obtención del JWT de Amazon Cognito.
          </p>

          <button
            className="btn btn-login"
            onClick={handleFetchData}
            disabled={loading}
          >
            {loading ? "Consultando..." : "Obtener Token de Cognito"}
          </button>

          {error && (
            <p style={{ color: "red", marginTop: "1rem" }}>
              {error}
            </p>
          )}

          {data && (
            <pre
              style={{
                backgroundColor: "#2d2d2d",
                color: "#67cdaa",
                padding: "1rem",
                borderRadius: "6px",
                marginTop: "1rem",
                fontSize: "0.8rem",
                overflowX: "auto",
              }}
            >
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
        </div>
      ) : (
        <p style={{ color: "#d9534f", marginTop: "1rem" }}>
          ⚠️ Acceso denegado. Debes iniciar sesión para consultar este
          recurso protegido.
        </p>
      )}
    </div>
  );
}