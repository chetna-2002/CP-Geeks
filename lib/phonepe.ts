import axios from "axios";

let cachedToken: string | null = null;
let tokenExpiry = 0;

export async function getPhonePeAccessToken() {
  const now = Date.now();

  // Return cached token if still valid
  if (cachedToken && now < tokenExpiry) {
    return cachedToken;
  }

  const response = await axios.post(
    process.env.PHONEPE_OAUTH_URL!,
    new URLSearchParams({
      client_id: process.env.PHONEPE_CLIENT_ID!,
      client_version: process.env.PHONEPE_CLIENT_VERSION!,
      client_secret: process.env.PHONEPE_CLIENT_SECRET!,
      grant_type: "client_credentials"
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  );

  const data = response.data;

  // cachedToken = data.access_token;
  cachedToken = data.access_token; // Use encrypted token if provided
  // Refresh token 1 minute before expiry
  tokenExpiry = data.expires_at * 1000 - 60 * 1000;

  return cachedToken;
}
