"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const persona_service_1 = require("../services/persona.service");
const validator_handler_1 = require("../middlewaresd/validator.handler");
const person_dto_1 = require("../dtos/person.dto");
const personaService = persona_service_1.PersonaService.getInstance();
const router = express_1.default.Router();
//votantes del lider que inicie session con el jwt
router.get('/lider', passport_1.default.authenticate('jwt', { session: false }), (0, validator_handler_1.validatorRole)(validator_handler_1.RolesMiddleware.LIDER), async (req, res, next) => {
    try {
        const { documento_li } = req.user;
        const query = req.query.accepted;
        const isAccpets = query === 'true' && true;
        const isNotAccpets = query === 'false' && true;
        if (documento_li && isNotAccpets) {
            const personas = await personaService.getAllByLider(documento_li, !isNotAccpets);
            res.json(personas);
            return;
        }
        if (isAccpets && documento_li) {
            res.json(await personaService.getAllByLider(documento_li));
            return;
        }
        res.json(await personaService.getAll(documento_li));
    }
    catch (error) {
        next(error);
    }
});
//actualizar persona o votante
router.patch('/:documento_pe', passport_1.default.authenticate('jwt', { session: false }), (0, validator_handler_1.validatorRole)(validator_handler_1.RolesMiddleware.LIDER), (0, validator_handler_1.validatorHandler)(person_dto_1.updatedPersonDto, validator_handler_1.PropertyValidatorHandler.BODY), async (req, res, next) => {
    try {
        if (req.params.documento_pe) {
            const data = req.body;
            const { documento_li } = req.user;
            const person = await personaService.updatePersonByLider(req.params.documento_pe, documento_li, data);
            res.json(person);
            return;
        }
        res.statusCode === 400;
        res.send("/:documento_pe no esta en el parametro de la url");
    }
    catch (error) {
        next(error);
    }
});
//crear un nuevo votante
router.post('/', passport_1.default.authenticate('jwt', { session: false }), (0, validator_handler_1.validatorRole)(validator_handler_1.RolesMiddleware.LIDER), (0, validator_handler_1.validatorHandler)(person_dto_1.createPersonDto, validator_handler_1.PropertyValidatorHandler.BODY), async (req, res, next) => {
    try {
        // console.log(req.user)
        const { documento_li, documento_ad } = req.user;
        // console.log(req.body)
        const data = req.body;
        if (documento_li && documento_ad) {
            const newPerson = await personaService.createPersonByLider(documento_li, documento_ad, data);
            const response = {
                message: "success",
                persona: newPerson
            };
            res.json(response);
        }
        else {
            res.statusCode == 409;
            res.json({
                statusCode: 409,
                message: "Solo un lider puede añadir votantes"
            });
        }
        // res.json("eroro")
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
