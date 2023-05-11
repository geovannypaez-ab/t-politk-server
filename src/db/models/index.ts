import { Sequelize } from "sequelize";
import { Administrador, AdministradorSchema } from "./admin.model";
import { Barrio, BarrioSchema } from "./barrio.model";
import { Departamento, DepartamentoSchema } from "./departamento.model";
import { DepTipocandi, DepTipocandiSchema } from "./dep_tipocandi.model";
import { Lider, LiderSchema } from "./lider.model";
import { Municipio, MunicipioSchema } from "./municipio.model";
import { MuniTipocandi, MuniTipocandiSchema } from "./muni_tipocandi.model";
import { Partido, PartidoSchema } from "./partido.mode";
import { Persona, PersonaSchema } from "./person.model";
import { PuestoVotacion, PuestoVotacionSchema } from "./puestoVotacion.model";
import { Tipocandi, TipocandiSchema } from "./tipocandi.model";

// permite inicializar cada modelo creado con la instancia que le pasemos como param
export const setupModels = (sequelize: Sequelize) => {
    
    Administrador.init(AdministradorSchema, Administrador.config(sequelize));
    Lider.init(LiderSchema, Lider.config(sequelize));
    Persona.init(PersonaSchema, Persona.config(sequelize));
    Tipocandi.init(TipocandiSchema, Tipocandi.config(sequelize));
    Partido.init(PartidoSchema, Partido.config(sequelize));
    Departamento.init(DepartamentoSchema, Departamento.config(sequelize));
    Municipio.init(MunicipioSchema, Municipio.config(sequelize));
    Barrio.init(BarrioSchema, Barrio.config(sequelize));
    MuniTipocandi.init(MuniTipocandiSchema, MuniTipocandi.config(sequelize));
    DepTipocandi.init(DepTipocandiSchema, DepTipocandi.config(sequelize));
    PuestoVotacion.init(PuestoVotacionSchema, PuestoVotacion.config(sequelize));

    // Persona.associate();
    // Lider.associate();

    // retornamos los modelos para poder usarlos en los servicios
    return {
        Administrador,
        Lider,
        Persona,
        Tipocandi,
        Partido,
        PuestoVotacion,
        DepTipocandi,
        MuniTipocandi,
        Barrio,
        Municipio,
        Departamento,
    };


}