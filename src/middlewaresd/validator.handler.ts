
import Boom from '@hapi/boom'
import {ObjectSchema} from 'joi'
import {NextFunction, Request, Response} from 'express'
import { IPayloadToken } from '../services/auth.service'


export enum PropertyValidatorHandler{
    QUERY ='query',
    BODY= 'body',
    PARAMS='params',
    USER='user'
}

// valida los objetos Joi o schemas que le pasemos
export const validatorHandler =(eschema:ObjectSchema,property:PropertyValidatorHandler)=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        const data = req[property];
        const {error} = eschema.validate(data,{abortEarly:false});
        if( error) {
            next(Boom.badRequest(error))
        }
        next();
    }
}
// roles
export enum RolesMiddleware{
    LIDER='lider',
    ADMIN ='admin'
}
// middleware que validad el role en el token de authenticacion 
export const validatorRole = (role:RolesMiddleware) =>{
    return (req:Request,res:Response,next:NextFunction)=>{
        const  payloadToken = req.user as IPayloadToken;
        const isAuthorized = payloadToken.role === role
        if(!isAuthorized ){
            next(Boom.unauthorized("No authorizado para pedir estos datos"))
        }
        next()
    }
}