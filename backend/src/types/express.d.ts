// src/types/express.d.ts
import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string }; // Add 'user' property to the Request object
    }
  }
}
