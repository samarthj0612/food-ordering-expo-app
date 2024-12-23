type Environment = {
  PRODUCTION: boolean;
  API_URL: string;
  API_KEY: string;
};

const ENV: Record<string, Environment> = {
  development: {
    PRODUCTION: false,
    API_URL: "https://dev.example.com/api",
    API_KEY: "dev-api-key",
  },
  staging: {
    PRODUCTION: false,
    API_URL: "https://staging.example.com/api",
    API_KEY: "staging-api-key",
  },
  production: {
    PRODUCTION: true,
    API_URL: "https://prod.example.com/api",
    API_KEY: "prod-api-key",
  },
};

const CURRENT_ENV = "production";

export const Config: Environment = ENV[CURRENT_ENV] || ENV.production;
