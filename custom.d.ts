import * as express from "express";

declare global {
  namespace express {
    interface Request {
      user?: Record<string, any>;
    }
  }
}
