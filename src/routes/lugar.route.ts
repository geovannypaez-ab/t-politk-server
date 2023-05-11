import express from 'express';
import passport from 'passport';
import { IPayloadToken } from '../services/auth.service';
import { LugarService } from '../services/lugares.services';
const router = express.Router();
const service = new LugarService();
// lugares para para el formulario de crear lideres
router.get('/admin',
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        try {
            const { documento_ad } = req.user as IPayloadToken;
            const lugares = await service.getLugarByAdmin(documento_ad);
            res.json(lugares);
        } catch (error) {
            next(error);
        }
    });
    //lugares para el lider, es decir, lugares para el formulario "crear votante"
router.get('/lider',passport.authenticate('jwt',{session:false}),
    async (req,res,next)=>{
       try {
        const {documento_ad,documento_li} = req.user as IPayloadToken;
        if(documento_li && documento_ad){
            const response = await service.getLugaresByLider(documento_li,documento_ad)
            res.json(response)
        }else {
            res.json({
                statusCode:409,
                message:"solo un lider pude consultar estos datos"
            })
        }

       } catch (error) {
        next(error)
       }
    }
);

export default router;