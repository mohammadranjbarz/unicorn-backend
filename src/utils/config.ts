import * as dotenv from 'dotenv';
dotenv.config();

export interface Config {
  app: Partial<AppConfig>;
}

interface AppConfig {
  PORT: string;
  NODE_ENV: string;
  INFURA_API_KEY: string;
  XDAI_NODE_HTTP_URL: string;
  POSTGRES_PRISMA_URL: string;
  POSTGRES_URL_NON_POOLING: string;
  PINATA_JWT: string;
  POAP_CLIENT_SECRET: string;
  POAP_EVENT_ID: string;
  POAP_EVENT_SECRET: string;
  POAP_BASE_URL: string;
  POAP_AUTH_BASE_URL: string;
  POAP_API_KEY: string;
  POAP_CLIENT_ID: string;
  OFFCHAIN_API_KEY: string;
  OFFCHAIN_BASE_URL: string;
  OFFCHAIN_ENS_DOMAIN: string;
  PINATA_UPLOAD_URL: string;
  GATEWAY_URL: string;
  THIRDWEB_CLIENT_ID: string;
  THIRDWEB_WALLET_PRIVATE_KEY: string;
}

const config: Config = {
  app: {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    INFURA_API_KEY: process.env.INFURA_API_KEY,
    XDAI_NODE_HTTP_URL: process.env.XDAI_NODE_HTTP_URL,
    POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
    POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
    PINATA_JWT: process.env.PINATA_JWT,
    POAP_CLIENT_SECRET: process.env.POAP_CLIENT_SECRET,
    POAP_EVENT_ID: process.env.POAP_EVENT_ID,
    POAP_EVENT_SECRET: process.env.POAP_EVENT_SECRET,
    POAP_BASE_URL: process.env.POAP_BASE_URL,
    POAP_AUTH_BASE_URL: process.env.POAP_AUTH_BASE_URL,
    POAP_API_KEY: process.env.POAP_API_KEY,
    POAP_CLIENT_ID: process.env.POAP_CLIENT_ID,
    OFFCHAIN_API_KEY: process.env.OFFCHAIN_API_KEY,
    OFFCHAIN_BASE_URL: process.env.OFFCHAIN_BASE_URL,
    PINATA_UPLOAD_URL: process.env.PINATA_UPLOAD_URL,
    GATEWAY_URL: process.env.GATEWAY_URL,
    THIRDWEB_CLIENT_ID: process.env.THIRDWEB_CLIENT_ID,
    THIRDWEB_WALLET_PRIVATE_KEY: process.env.THIRDWEB_WALLET_PRIVATE_KEY,
  },
};

export default (): Config => config;
