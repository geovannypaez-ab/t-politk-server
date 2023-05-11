"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const admin_model_1 = require("../../db/models/admin.model");
const user_dto_1 = require("../../dtos/user.dto");
const validator_handler_1 = require("../../middlewaresd/validator.handler");
const auth_service_1 = require("../../services/auth.service");
const service = new auth_service_1.AuthService();
const router = express_1.default.Router();
// ruta para iniciar session
router.post('/login', (0, validator_handler_1.validatorHandler)(user_dto_1.loginUserDto, validator_handler_1.PropertyValidatorHandler.BODY), passport_1.default.authenticate('local', { session: false }), async (req, res, next) => {
    try {
        const user = req.user;
        const token = service.generateJwt(user);
        if (user instanceof admin_model_1.Administrador) {
            res.json({ token, role: "admin" });
        }
        else {
            res.json({ token, role: "lider" });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
