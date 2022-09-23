declare namespace NodeJS {
  export interface ProcessEnv {
    NEXTAUTH_SECRET: string;
    JWT_SECRET: string;
    DATABSE_URL: string;
    BCRYPT_SALT_ROUNDS: string;
    GOOGLE_CLIENT_EMAIL: string;
    GOOGLE_PRIVATE_KEY: string;
    IMAGE_FOLDER_ID: string;
    WEB_PUSH_EMAIL: string;
    NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY: string;
    WEB_PUSH_PRIVATE_KEY: string;
  }
}
