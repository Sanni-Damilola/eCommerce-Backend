import dotenv from "dotenv";

dotenv.config();

export const envVariables = {
  PORT: process.env.PORT as string,
  DB_STRING: process.env.MONGODB_STRING as string,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY as string,
};
