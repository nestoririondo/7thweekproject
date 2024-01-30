import dotenv from "dotenv";
import pkg from "pg";

const { Pool } = pkg;
dotenv.config();

const pool = new Pool();

export default pool;