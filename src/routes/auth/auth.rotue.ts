import express from 'express';
import passport from 'passport';
import { Administrador } from '../../db/models/admin.model';
import { loginUserDto } from '../../dtos/user.dto';
import { PropertyValidatorHandler, validatorHandler } from '../../middlewaresd/validator.handler';
import { AuthService } from '../../services/auth.service';
import { Lider } from '../../db/models/lider.model';
const service = new AuthService();
const router = express.Router();

// ruta para iniciar session


router.post('/login',
    validatorHandler(loginUserDto, PropertyValidatorHandler.BODY)
    , passport.authenticate('local', { session: false }),
    async (req, res, next) => {
        try {
            const user = req.user as Administrador | Lider;
            const token =  service.generateJwt(user);
            if(user instanceof Administrador){
                res.json({ token,role:"admin" });
            } else{
                res.json({ token,role:"lider" });
            }
        } catch (error) {
            next(error)
        }
    });


    export default router;