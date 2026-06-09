import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from 'dotenv';
import { app } from './app.js';
import { connectDb } from './config/db.js';

dotenv.config();

const port = process.env.PORT || 5000;

connectDb()
  .then(() => {
    app.listen(port, () => console.log(`API running on port ${port} - server.js:16`));
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
app.use(cors({
  origin: "https://minicrmnowdigitaleasy-2.onrender.com",
  credentials: true
}));