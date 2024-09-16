import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql2/promise";
import router from './routes.js';
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(router); 

let conn = null; 
const Myserverambulance = async () => {
  try {
    conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    });
    console.log("Connected to MySQL!");
  } catch (error) {
    console.error("Error connecting to MySQL:", error);
  }
};

app.listen(PORT, async () => {
  await Myserverambulance();
  console.log(`Server is running on http://localhost:${PORT}`);
});

export { conn };