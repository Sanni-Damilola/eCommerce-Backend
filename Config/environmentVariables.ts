import dotenv from "dotenv";

dotenv.config();

export const envVariables = {
  PORT: process.env.PORT as string,
  DB_STRING: process.env.MONGODB_STRING as string,
};

// cool