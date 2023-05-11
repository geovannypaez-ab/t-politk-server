"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const config_1 = __importDefault(require("../../config"));
// import { IPayloadToken } from '../../../routes/auth.route';
const { jwtSecret } = config_1.default;
const options = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret
};
const verifyCallback = (payload, done) => {
    return done(null, payload);
};
//creamos la estrategia para verificar los JWT
const JwtStrtegy = new passport_jwt_1.Strategy(options, verifyCallback);
exports.default = JwtStrtegy;
