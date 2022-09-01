declare namespace NodeJS {
  export interface ProcessEnv {
    JWT_SECRET: string;
    DATABSE_URL: string;
    BCRYPT_SALT_ROUNDS: string;
  }
}
