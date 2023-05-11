"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_local_1 = require("passport-local");
// import AuthService from '../../../services/auth.service';
const auth_service_1 = require("../../services/auth.service");
const service = new auth_service_1.AuthService();
// creamos la estrategia para authenticarnos de manera normal, con usuario y contraseña
const LocalStrategy = new passport_local_1.Strategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username, password, done) => {
    try {
        const user = await service.getadmin(username, password);
        done(null, user);
    }
    catch (error) {
        done(error, false);
    }
});
exports.default = LocalStrategy;
