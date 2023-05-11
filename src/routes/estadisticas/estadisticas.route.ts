import express from 'express'
import { EstadisticasService } from '../../services/estadisticas.service';
import passport from 'passport';
import { IPayloadToken } from '../../services/auth.service';
import { RolesMiddleware, validatorRole } from '../../middlewaresd/validator.handler';
const route = express.Router();
const service = new EstadisticasService();
// datos para las session de estadistica
route.get('/',
passport.authenticate('jwt',{session:false}),
validatorRole(RolesMiddleware.ADMIN),
 async(req,res,next)=>{
    try {
        const {documento_ad} = req.user as IPayloadToken;
        const response = await service.getData(documento_ad);
        res.json(response);
    } catch (error) {
        next(error);
    }
})

export default route;