"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const passport_1 = __importDefault(require("passport"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const lider_dto_1 = require("../dtos/lider.dto");
const validator_handler_1 = require("../middlewaresd/validator.handler");
const lider_service_1 = require("../services/lider.service");
const persona_service_1 = require("../services/persona.service");
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
const router = express_1.default.Router();
const personaService = persona_service_1.PersonaService.getInstance();
const service = lider_service_1.LiderService.getInstancia();
// solo los administradores pueden utilizar esta ruta
router.get('/', passport_1.default.authenticate('jwt', { session: false }), (0, validator_handler_1.validatorRole)(validator_handler_1.RolesMiddleware.ADMIN), async (req, res, next) => {
    try {
        const { documento_ad } = req.user;
        const acepts = req.query?.acepts;
        // console.log(acepts)
        if (acepts) {
            const aceptsUknown = acepts;
            const aceptsString = aceptsUknown;
            const aceptsBoolean = JSON.parse(aceptsString);
            const query = {
                acepts: aceptsBoolean
            };
            res.json(await service.getByAdmin(documento_ad, query));
            return;
        }
        res.json(await service.getByAdmin(documento_ad));
    }
    catch (error) {
        next(error);
    }
});
//eliminar lider
router.delete('/:documento_li', passport_1.default.authenticate('jwt', { session: false }), (0, validator_handler_1.validatorRole)(validator_handler_1.RolesMiddleware.ADMIN), async (req, res, next) => {
    try {
        const { documento_ad } = req.user;
        const documento_li = req.params.documento_li;
        res.json(await service.deleteByAdmin(documento_ad, documento_li));
    }
    catch (error) {
        next(error);
    }
});
// crear lider
router.post('/', passport_1.default.authenticate('jwt', { session: false }), (0, validator_handler_1.validatorRole)(validator_handler_1.RolesMiddleware.ADMIN), 
//middleware para obtener la imagen de la peticion
upload.single('imagen'), (0, validator_handler_1.validatorHandler)(lider_dto_1.createLiderDto, validator_handler_1.PropertyValidatorHandler.BODY), async (req, res, next) => {
    try {
        const { documento_ad } = req.user;
        const lider = req.body;
        const imagen = req.file;
        // console.log(lider);
        if (imagen) {
            //modificamos  imagen con sharp
            const processImage = (0, sharp_1.default)(imagen?.buffer).resize(300, 300, {
                fit: 'cover'
            });
            const bufferNewImaga = await processImage.toBuffer();
            // guarda imagen en carpeta images
            fs_1.default.writeFileSync(`images/${imagen?.originalname}`, bufferNewImaga);
            // creamos url para responder a la imagen. ruta esta definida en el archivo ./images.route.ts
            const baseUrl = req.protocol + '://' + req.get('host') + '/app';
            const rutaImagen = `${baseUrl}/images/${imagen?.originalname}`;
            lider.imagen = rutaImagen;
            const response = await service.createLiderByAdmin(documento_ad, lider);
            res.json(response);
        }
        else {
            lider.imagen = "https://ab-sistemas.com/candidaturas/Dise_App/img/Avatar4.png";
            const response = await service.createLiderByAdmin(documento_ad, lider);
            res.json(response);
        }
    }
    catch (error) {
        next(error);
    }
});
//actualizar lider
router.patch('/:documento_li', passport_1.default.authenticate('jwt', { session: false }), (0, validator_handler_1.validatorRole)(validator_handler_1.RolesMiddleware.ADMIN), (0, validator_handler_1.validatorHandler)(lider_dto_1.paramUpdatedLiderDto, validator_handler_1.PropertyValidatorHandler.PARAMS), (0, validator_handler_1.validatorHandler)(lider_dto_1.updatedLiderDto, validator_handler_1.PropertyValidatorHandler.BODY), async (req, res, next) => {
    try {
        const { documento_ad } = req.user;
        const documento_li = req.params.documento_li;
        const lider = req.body;
        const liderUpdated = await service.updateLiderByAdmin(documento_ad, documento_li, lider);
        res.json(liderUpdated);
    }
    catch (error) {
        next(error);
    }
});
// las personas relacionadas a un lider en especifico
router.get('/:documento_li/personas', passport_1.default.authenticate('jwt', { session: false }), (0, validator_handler_1.validatorRole)(validator_handler_1.RolesMiddleware.ADMIN), async (req, res, next) => {
    try {
        const documento_li = req.params.documento_li;
        const personas = await personaService.getAllByLider(documento_li);
        res.json(personas);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
