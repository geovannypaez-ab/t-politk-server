import express from 'express';
import { IPayloadToken } from '../services/auth.service';
import passport from 'passport';
import { PersonaService } from '../services/persona.service';
import { PropertyValidatorHandler, RolesMiddleware, validatorHandler, validatorRole } from '../middlewaresd/validator.handler';
import { createPersonDto, updatedPersonDto } from '../dtos/person.dto';
import { Persona } from '../db/models/person.model';


const personaService = PersonaService.getInstance();
const router = express.Router();
//votantes del lider que inicie session con el jwt
router.get('/lider',
passport.authenticate('jwt',{session:false}),
validatorRole(RolesMiddleware.LIDER),
async(req,res,next)=>{
    try {
        const {documento_li} = req.user as IPayloadToken;
        const query = req.query.accepted;
        const isAccpets = query ==='true'&& true
        const isNotAccpets = query ==='false' &&true
        if(documento_li && isNotAccpets){
        const personas = await personaService.getAllByLider(documento_li,!isNotAccpets);
            res.json(personas)
            return;
        }
        if(isAccpets && documento_li){
            res.json(await personaService.getAllByLider(documento_li));
            return;
        }
        res.json( await personaService.getAll(documento_li as string) )
    } catch (error) {
        next(error)
    }
}
);
//actualizar persona o votante
router.patch('/:documento_pe',
    passport.authenticate('jwt',{session:false}),
    validatorRole(RolesMiddleware.LIDER),
    validatorHandler(updatedPersonDto,PropertyValidatorHandler.BODY),
    async (req,res,next)=>{
        try {
            if(req.params.documento_pe){
                const data = req.body as Persona
                const {documento_li} = req.user as IPayloadToken;
                const person = await personaService.updatePersonByLider(req.params.documento_pe,documento_li as string,data);
                res.json(person);
                return ;
            }
            res.statusCode ===400 
            res.send("/:documento_pe no esta en el parametro de la url")
        } catch (error) {
            next(error)
        }
    }
);
//crear un nuevo votante
router.post('/',
    passport.authenticate('jwt', { session: false }),
    validatorRole(RolesMiddleware.LIDER),
    validatorHandler(createPersonDto,PropertyValidatorHandler.BODY),
   async (req, res, next) => {
        try {
            // console.log(req.user)
            const { documento_li,documento_ad } = req.user as IPayloadToken;
            // console.log(req.body)
            const data = req.body;
            if (documento_li && documento_ad) {
                
                const newPerson = await personaService.createPersonByLider(documento_li,documento_ad,data);
                const response =  {
                    message:"success",
                    persona:newPerson
                }
                res.json(response);
            }else{
                res.statusCode == 409
                res.json({
                    statusCode:409,
                    message:"Solo un lider puede añadir votantes"
                });
            }
            // res.json("eroro")
        } catch (error) {
            next(error)
        }
    });

    export default router;