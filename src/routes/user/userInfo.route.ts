import express from 'express';
import passport from 'passport';
import { AdminService } from '../../services/admin.service';
import { IPayloadToken } from '../../services/auth.service';
import { RolesMiddleware } from '../../middlewaresd/validator.handler';
import { LiderService } from '../../services/lider.service';
const service =  AdminService.getInstacia();
const liderService = LiderService.getInstancia();
const router = express.Router();

// obtener la informacion del usuario
router.get('/',
passport.authenticate('jwt',{session:false}),
async(req,res,next)=>{
    try {
    const payloadToken= req.user as IPayloadToken;
    const {documento_ad}= payloadToken;
    const admins = await service.getOne(documento_ad)
    if((payloadToken.role === RolesMiddleware.LIDER) && (payloadToken.documento_li)) {
        const infoLider = await liderService.getLiderByDocument(payloadToken.documento_li,payloadToken.documento_ad)
        res.json({...admins,lider:infoLider})
        return;
    };
    res.json(admins);
    } catch (error) {
        next(error)
    }
})




export default router;