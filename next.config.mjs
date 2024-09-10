/** @type {import('next').NextConfig} */

const nextConfig = {
  // output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_BACKEND_BASE_PATH: process.env.NEXT_PUBLIC_BACKEND_BASE_PATH || '',
    NEXT_PUBLIC_KEYCLOAK_URL: process.env.NEXT_PUBLIC_KEYCLOAK_URL || '',
    NEXT_PUBLIC_KEYCLOAK_CLIENT_ID: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || '',
    NEXT_PUBLIC_KEYCLOAK_REDIRECT_URI: process.env.NEXT_PUBLIC_KEYCLOAK_REDIRECT_URI || '',
    NEXT_PUBLIC_KEYCLOAK_POST_LOGOUT_REDIRECT_URI: process.env.NEXT_PUBLIC_KEYCLOAK_POST_LOGOUT_REDIRECT_URI || '',
    NEXT_PUBLIC_KEYCLOAK_PRES_REQ_CONF_ID: process.env.NEXT_PUBLIC_KEYCLOAK_PRES_REQ_CONF_ID || '',
  }
};

export default nextConfig;
