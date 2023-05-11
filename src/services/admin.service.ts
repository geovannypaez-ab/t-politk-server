import { Op } from "sequelize";
import { models } from "../db/sequelize";
import { LiderService } from "./lider.service";
 
const liderService = LiderService.getInstancia();

//patron de diseño singleto
export class AdminService {
    private static instancia:AdminService;
    public static getInstacia ():AdminService{
        if(!AdminService.instancia){
            AdminService.instancia = new AdminService();
        }
        return AdminService.instancia;
    }

   async getAll(){
        return await models.Administrador.findAll();
    }

    async getAdminByUsername(usuario:string){
        const admin = await models.Administrador.findOne({
            where:{
                usuario
            },
         
        });
        
        
        return admin;
    }
    
    async getOne(documento_ad:string){
        const admin = await models.Administrador.findOne({
            where:{
                documento_ad
            },
            attributes:{exclude:['contrasena']}
        });
        const candidatura = await models.Tipocandi.findOne({
            where:{
                id:admin?.tipocandidatura
            }
        });
        const partido = await models.Partido.findByPk(admin?.partido);
        const lideres = await liderService.getByAdmin(documento_ad);
        const listDocumentsLiders = lideres.map(lider=>lider.documento_li);
        // console.log(listDocumentsLiders)
        const countPersons = await models.Persona.count({
            where:{
                estado:1,
                documento_li:{
                    [Op.or]:[...listDocumentsLiders]
                }
            }
        });
        return {...admin?.dataValues,votos:countPersons,candidatura,infoPartido:partido?.dataValues}
    }
}