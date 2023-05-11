"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupModels = void 0;
const admin_model_1 = require("./admin.model");
const barrio_model_1 = require("./barrio.model");
const departamento_model_1 = require("./departamento.model");
const dep_tipocandi_model_1 = require("./dep_tipocandi.model");
const lider_model_1 = require("./lider.model");
const municipio_model_1 = require("./municipio.model");
const muni_tipocandi_model_1 = require("./muni_tipocandi.model");
const partido_mode_1 = require("./partido.mode");
const person_model_1 = require("./person.model");
const puestoVotacion_model_1 = require("./puestoVotacion.model");
const tipocandi_model_1 = require("./tipocandi.model");
// permite inicializar cada modelo creado con la instancia que le pasemos como param
const setupModels = (sequelize) => {
    admin_model_1.Administrador.init(admin_model_1.AdministradorSchema, admin_model_1.Administrador.config(sequelize));
    lider_model_1.Lider.init(lider_model_1.LiderSchema, lider_model_1.Lider.config(sequelize));
    person_model_1.Persona.init(person_model_1.PersonaSchema, person_model_1.Persona.config(sequelize));
    tipocandi_model_1.Tipocandi.init(tipocandi_model_1.TipocandiSchema, tipocandi_model_1.Tipocandi.config(sequelize));
    partido_mode_1.Partido.init(partido_mode_1.PartidoSchema, partido_mode_1.Partido.config(sequelize));
    departamento_model_1.Departamento.init(departamento_model_1.DepartamentoSchema, departamento_model_1.Departamento.config(sequelize));
    municipio_model_1.Municipio.init(municipio_model_1.MunicipioSchema, municipio_model_1.Municipio.config(sequelize));
    barrio_model_1.Barrio.init(barrio_model_1.BarrioSchema, barrio_model_1.Barrio.config(sequelize));
    muni_tipocandi_model_1.MuniTipocandi.init(muni_tipocandi_model_1.MuniTipocandiSchema, muni_tipocandi_model_1.MuniTipocandi.config(sequelize));
    dep_tipocandi_model_1.DepTipocandi.init(dep_tipocandi_model_1.DepTipocandiSchema, dep_tipocandi_model_1.DepTipocandi.config(sequelize));
    puestoVotacion_model_1.PuestoVotacion.init(puestoVotacion_model_1.PuestoVotacionSchema, puestoVotacion_model_1.PuestoVotacion.config(sequelize));
    // Persona.associate();
    // Lider.associate();
    // retornamos los modelos para poder usarlos en los servicios
    return {
        Administrador: admin_model_1.Administrador,
        Lider: lider_model_1.Lider,
        Persona: person_model_1.Persona,
        Tipocandi: tipocandi_model_1.Tipocandi,
        Partido: partido_mode_1.Partido,
        PuestoVotacion: puestoVotacion_model_1.PuestoVotacion,
        DepTipocandi: dep_tipocandi_model_1.DepTipocandi,
        MuniTipocandi: muni_tipocandi_model_1.MuniTipocandi,
        Barrio: barrio_model_1.Barrio,
        Municipio: municipio_model_1.Municipio,
        Departamento: departamento_model_1.Departamento,
    };
};
exports.setupModels = setupModels;
