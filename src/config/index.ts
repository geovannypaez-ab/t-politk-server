import dotenv from 'dotenv';
dotenv.config();
// lector de variables de entorno
const config = {
    port: process.env.PORT || 3001,
    dbUrl:process.env.DATABASE_URL,
    env:process.env.NODE_ENV || 'development',
    isprod:process.env.NODE_ENV  === 'production',
    isDev:process.env.NODE_ENV=== 'development',
    jwtSecret:process.env.JWT_SECRET
}
export default config;