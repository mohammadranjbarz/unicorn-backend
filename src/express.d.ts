// src/express.d.ts
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // Define the 'user' property, you can specify a better type instead of 'any'
    }
  }
}
