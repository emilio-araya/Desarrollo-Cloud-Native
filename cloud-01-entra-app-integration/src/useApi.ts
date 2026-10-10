import { useAuth } from "react-oidc-context";

export function useApi() {
  const auth = useAuth();

  const fetchWithToken = async (
    url: string,
    options: RequestInit = {},
  ) => {
    const accessToken = auth.user?.access_token;

    if (!accessToken) {
      throw new Error("No hay un token de acceso de Amazon Cognito");
    }

    const headers = new Headers(options.headers);

    headers.set("Authorization", `Bearer ${accessToken}`);

    return fetch(url, {
      ...options,
      headers,
    });
  };

  return { fetchWithToken };
}