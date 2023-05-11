import { AdminService } from "./admin.service";
import crypto from 'crypto';
import boom from '@hapi/boom';
import jwt from 'jsonwebtoken';
import config from "../config";
import { Administrador } from "../db/models/admin.model";
import { LiderService } from "./lider.service";
import { Lider } from "../db/models/lider.model";
import { RolesMiddleware } from "../middlewaresd/validator.handler";
const adminService = new AdminService();
const liderService = LiderService.getInstancia();
export interface IPayloadToken {
    documento_ad: string;
    documento_li?:string;
    role:RolesMiddleware
  }
export class AuthService {
  //autentica las credenciales del usuario
    async getadmin(username: string, pass: string): Promise<Administrador | Lider | undefined> {
        const admin = await adminService.getAdminByUsername(username);
        const lider = await liderService.getLider(username);
        // console.log(lider);
        const isNotUser = !admin && !lider
  
        if (isNotUser) {
          throw boom.unauthorized();
        }
        if(admin){
          const hash = crypto.createHash('sha512').update(pass).digest('hex');
          const match = admin.contrasena === hash;
      
          if (!match) {
            throw boom.unauthorized();
          }
      
          return admin;
        }

        if(lider){
          const hash = crypto.createHash('sha512').update(pass).digest('hex');
          const match = lider.contrasena === hash;
          if(!match){
            throw boom.unauthorized();
          }
          
          return lider;
        }
      }
 //genera un JWT 
     generateJwt (user:Administrador | Lider):string{
        let payload:IPayloadToken;
        if(user instanceof Administrador){
          payload ={
            documento_ad:user.documento_ad,
            role:RolesMiddleware.ADMIN
          }
        }else{
          payload={
            documento_ad:user.documento_ad,
            documento_li:user.documento_li,
            role:RolesMiddleware.LIDER
          }
        }
       const token = jwt.sign(payload,config.jwtSecret as string,{expiresIn:"12h"})
        return token
    }
}