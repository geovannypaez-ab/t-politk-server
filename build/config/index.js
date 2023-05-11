"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// lector de variables de entorno
const config = {
    port: process.env.PORT || 3001,
    dbUrl: process.env.DATABASE_URL,
    env: process.env.NODE_ENV || 'development',
    isprod: process.env.NODE_ENV === 'production',
    isDev: process.env.NODE_ENV === 'development',
    jwtSecret: process.env.JWT_SECRET
};
exports.default = config;
