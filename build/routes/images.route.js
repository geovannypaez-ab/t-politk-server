"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
// ruta para responder a las imagenes de los lideres
router.get('/:name', async (req, res, next) => {
    try {
        const nameImg = req.params.name;
        const imagePath = path_1.default.join(__dirname, '../../images', nameImg);
        res.sendFile(imagePath);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
