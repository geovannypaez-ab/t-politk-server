"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const admin_service_1 = require("../../services/admin.service");
const validator_handler_1 = require("../../middlewaresd/validator.handler");
const lider_service_1 = require("../../services/lider.service");
const service = admin_service_1.AdminService.getInstacia();
const liderService = lider_service_1.LiderService.getInstancia();
const router = express_1.default.Router();
// obtener la informacion del usuario
router.get('/', passport_1.default.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        const payloadToken = req.user;
        const { documento_ad } = payloadToken;
        const admins = await service.getOne(documento_ad);
        if ((payloadToken.role === validator_handler_1.RolesMiddleware.LIDER) && (payloadToken.documento_li)) {
            const infoLider = await liderService.getLiderByDocument(payloadToken.documento_li, payloadToken.documento_ad);
            res.json({ ...admins, lider: infoLider });
            return;
        }
        ;
        res.json(admins);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
