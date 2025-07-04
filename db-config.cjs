require('dotenv').config();

module.exports = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10), 
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: false, 
};