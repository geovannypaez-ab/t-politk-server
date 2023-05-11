import { Persona } from "../db/models/person.model";
import { models } from "../db/sequelize";
import { Op } from "sequelize";
import boom from '@hapi/boom';
export class PersonaService {
    private static instancia: PersonaService;
    
    public static getInstance(): PersonaService {
        if (!PersonaService.instancia) {
            PersonaService.instancia = new PersonaService();
        }
        return PersonaService.instancia;
    }
    async getAll (documento_li:string){
        return await models.Persona.findAll({
            where:{
                documento_li
            }
        });

    }
    async updatePersonByLider(documento_pe: string, documento_li: string, persona:Persona) {
        const personUpdated = await models.Persona.update(persona, {
            where: {
                [Op.and]: [
                    { documento_pe },
                    { documento_li }
                ]
            }
        })
    
        if (!personUpdated[0]) {
            throw boom.notFound("Persona asociada al lider no encontrada")
        }
        return {
            estado: personUpdated,
            message: "success"
        }
    }
    async getAllByLider(documento_li:string,acepts=true){
        const estado = acepts ?1:0
        const personas = await models.Persona.findAll({
            where:{
                documento_li,
                estado
            },
            order:[["nombre","ASC"]]
        });
        return personas
    }
    async createPersonByLider(documento_li:string,documento_ad:string,data:Persona){
        data.documento_li= documento_li;
        data.estado = "0"
        const isLiderWithThisAdmin = await models.Lider.findOne({
            where:{
                documento_ad,
                documento_li
            }
        });
        const isPerson = await models.Persona.findOne({
            where:{
                documento_pe:data.documento_pe,
                documento_li:isLiderWithThisAdmin?.documento_li
            }
        });
        
        if(isPerson && isLiderWithThisAdmin){
            throw  boom.badRequest('Persona con este documento ya fue registrado.')
        };
        const newPerson = await models.Persona.create(data);
        
        return newPerson;
    }
    
}
