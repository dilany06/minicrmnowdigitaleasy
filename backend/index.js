import dotenv from 'dotenv';
dotenv.config();

import { app } from './src/app.js';
import { connectDb } from './src/config/db.js';

let isConnected = false;

async function connectIfNeeded() {
  if (!isConnected) {
    await connectDb();
    isConnected = true;
  }
}

export default async function handler(req, res) {
  await connectIfNeeded();
  return app(req, res);
}