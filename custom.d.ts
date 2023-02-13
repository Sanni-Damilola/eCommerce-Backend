import * as Express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>;
    }
  }
} // declaring "user" as a global source
