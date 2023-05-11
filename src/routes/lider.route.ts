import express from 'express';
import multer from 'multer';
import passport from 'passport';
import sharp from 'sharp';
import fs from 'fs';
import { Lider } from '../db/models/lider.model';
import { createLiderDto, paramUpdatedLiderDto, updatedLiderDto } from '../dtos/lider.dto';
import { PropertyValidatorHandler, RolesMiddleware, validatorHandler, validatorRole } from '../middlewaresd/validator.handler';
import { IPayloadToken } from '../services/auth.service';



import { LiderService, QueryLider } from '../services/lider.service';
import { PersonaService } from '../services/persona.service';

const storage = multer.memoryStorage();
const upload = multer({ storage });


const router = express.Router();
const personaService =  PersonaService.getInstance();
const service = LiderService.getInstancia();

// solo los administradores pueden utilizar esta ruta

router.get('/',
    passport.authenticate('jwt', { session: false }),
    validatorRole(RolesMiddleware.ADMIN),
    async (req, res, next) => {
        try {
            const { documento_ad } = req.user as IPayloadToken;
            const acepts = req.query?.acepts;
            // console.log(acepts)
            if(acepts){
                const aceptsUknown = acepts as unknown;
                const aceptsString = aceptsUknown as string;
                const aceptsBoolean = JSON.parse(aceptsString);
                const query:QueryLider = {
                    acepts:aceptsBoolean  as boolean
                }
                res.json(await service.getByAdmin(documento_ad,query));
                return;
            }
            res.json(await service.getByAdmin(documento_ad));
        } catch (error) {
            next(error)
        }
    }
);
//eliminar lider
router.delete('/:documento_li',
    passport.authenticate('jwt', { session: false }),
    validatorRole(RolesMiddleware.ADMIN),
    async (req, res, next) => {
        try {
            const { documento_ad } = req.user as IPayloadToken;
            const documento_li = req.params.documento_li;
            res.json(await service.deleteByAdmin(documento_ad, documento_li));
        } catch (error) {
            next(error)
        }
    }
);
// crear lider
router.post('/',
    passport.authenticate('jwt', { session: false }),
    validatorRole(RolesMiddleware.ADMIN),
    //middleware para obtener la imagen de la peticion
    upload.single('imagen'),
    validatorHandler(createLiderDto, PropertyValidatorHandler.BODY),
    async (req, res, next) => {
        try {
            const { documento_ad } = req.user as IPayloadToken;
            const lider = req.body as Lider;
            const imagen = req.file;
            // console.log(lider);

            if (imagen) {
                //modificamos  imagen con sharp
                const processImage = sharp(imagen?.buffer).resize(300, 300, {
                    fit: 'cover'
                });
                const bufferNewImaga = await processImage.toBuffer();
                // guarda imagen en carpeta images
                fs.writeFileSync(`images/${imagen?.originalname}`, bufferNewImaga);
                // creamos url para responder a la imagen. ruta esta definida en el archivo ./images.route.ts
                const baseUrl = req.protocol + '://' + req.get('host') + '/app';
                const rutaImagen = `${baseUrl}/images/${imagen?.originalname}`;
                lider.imagen = rutaImagen as string;
                const response = await service.createLiderByAdmin(documento_ad, lider);
                res.json(response);
            } else {
                lider.imagen = "https://ab-sistemas.com/candidaturas/Dise_App/img/Avatar4.png"
                const response = await service.createLiderByAdmin(documento_ad, lider);
                res.json(response);
            }
        } catch (error) {
            next(error);
        }
    }
);
//actualizar lider
router.patch('/:documento_li',
    passport.authenticate('jwt', { session: false }),
    validatorRole(RolesMiddleware.ADMIN),
    validatorHandler(paramUpdatedLiderDto, PropertyValidatorHandler.PARAMS),
    validatorHandler(updatedLiderDto, PropertyValidatorHandler.BODY),
    async (req, res, next) => {
        try {
            const { documento_ad } = req.user as IPayloadToken;
            const documento_li = req.params.documento_li;
            const lider = req.body;
            const liderUpdated = await service.updateLiderByAdmin(documento_ad, documento_li, lider);
            res.json(liderUpdated);
        } catch (error) {
            next(error)
        }
    })
// las personas relacionadas a un lider en especifico
router.get('/:documento_li/personas',
    passport.authenticate('jwt', { session: false }),
    validatorRole(RolesMiddleware.ADMIN),
    async (req, res, next) => {
        try {
            const documento_li = req.params.documento_li;
            const personas = await personaService.getAllByLider(documento_li);
            res.json(personas)
        } catch (error) {
            next(error)
        }
    })

export default router;