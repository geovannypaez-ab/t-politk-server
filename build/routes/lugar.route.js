"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const lugares_services_1 = require("../services/lugares.services");
const router = express_1.default.Router();
const service = new lugares_services_1.LugarService();
// lugares para para el formulario de crear lideres
router.get('/admin', passport_1.default.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        const { documento_ad } = req.user;
        const lugares = await service.getLugarByAdmin(documento_ad);
        res.json(lugares);
    }
    catch (error) {
        next(error);
    }
});
//lugares para el lider, es decir, lugares para el formulario "crear votante"
router.get('/lider', passport_1.default.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        const { documento_ad, documento_li } = req.user;
        if (documento_li && documento_ad) {
            const response = await service.getLugaresByLider(documento_li, documento_ad);
            res.json(response);
        }
        else {
            res.json({
                statusCode: 409,
                message: "solo un lider pude consultar estos datos"
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
