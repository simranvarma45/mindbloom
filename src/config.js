// src/config.js

const isProduction = import.meta.env.PROD;

export const BASE_URL = isProduction
  ? "https://mindbloom-backend.onrender.com"
  : "http://localhost:5000";
