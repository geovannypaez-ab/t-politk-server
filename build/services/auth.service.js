"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const admin_service_1 = require("./admin.service");
const crypto_1 = __importDefault(require("crypto"));
const boom_1 = __importDefault(require("@hapi/boom"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const admin_model_1 = require("../db/models/admin.model");
const lider_service_1 = require("./lider.service");
const validator_handler_1 = require("../middlewaresd/validator.handler");
const adminService = new admin_service_1.AdminService();
const liderService = lider_service_1.LiderService.getInstancia();
class AuthService {
    //autentica las credenciales del usuario
    async getadmin(username, pass) {
        const admin = await adminService.getAdminByUsername(username);
        const lider = await liderService.getLider(username);
        // console.log(lider);
        const isNotUser = !admin && !lider;
        if (isNotUser) {
            throw boom_1.default.unauthorized();
        }
        if (admin) {
            const hash = crypto_1.default.createHash('sha512').update(pass).digest('hex');
            const match = admin.contrasena === hash;
            if (!match) {
                throw boom_1.default.unauthorized();
            }
            return admin;
        }
        if (lider) {
            const hash = crypto_1.default.createHash('sha512').update(pass).digest('hex');
            const match = lider.contrasena === hash;
            if (!match) {
                throw boom_1.default.unauthorized();
            }
            return lider;
        }
    }
    //genera un JWT 
    generateJwt(user) {
        let payload;
        if (user instanceof admin_model_1.Administrador) {
            payload = {
                documento_ad: user.documento_ad,
                role: validator_handler_1.RolesMiddleware.ADMIN
            };
        }
        else {
            payload = {
                documento_ad: user.documento_ad,
                documento_li: user.documento_li,
                role: validator_handler_1.RolesMiddleware.LIDER
            };
        }
        const token = jsonwebtoken_1.default.sign(payload, config_1.default.jwtSecret, { expiresIn: "12h" });
        return token;
    }
}
exports.AuthService = AuthService;
