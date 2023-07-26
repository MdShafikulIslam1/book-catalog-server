import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });
export default {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  database_url: process.env.DATABASE_URL,
  salt_round: process.env.SALT_ROUND,
  secret_key: process.env.SECRET_KEY,
  refresh_secret_key: process.env.REFRESH_SECRET_KEY,
  expires_in_secret_key: process.env.EXPIRES_IN_SECRET_KEY,
  expires_in_refresh_key: process.env.EXPIRES_IN_REFRESH_KEY,
};
