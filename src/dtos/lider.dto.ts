import Joi from "joi";
// dto para validar el body al momento de crear un lider
const createLiderDto = Joi.object({
    documento_li: Joi.string().max(15).required(),
    nombre: Joi.string().max(20).required(),
    apellido: Joi.string().max(20).required(),
    email: Joi.string().email().max(50),
    fecha_naci: Joi.date(),
    telefono: Joi.string().max(11).required(),
    id_muni: Joi.number().integer().required(),
    usuario: Joi.string().max(15).required(),
    contrasena: Joi.string().min(6).required(),
    imagen: Joi.string().max(600),
    descripcion: Joi.string().max(350),
    fecha: Joi.date(),
    monto: Joi.number().integer(),
    estado: Joi.number().integer().max(2).required(),
  });
// valida las propiedades para poder actualizar los datos de un lider
  const updatedLiderDto = Joi.object({
    // documento_li: Joi.string().max(15).required(),
    nombre: Joi.string().max(20),
    apellido: Joi.string(),
    email: Joi.string().email(),
    fecha_naci: Joi.date(),
    telefono: Joi.string().max(11),
    id_muni: Joi.number().integer(),
    usuario: Joi.string().max(15),
    contrasena: Joi.string().max(600),
    imagen: Joi.string().max(600),
    descripcion: Joi.string().max(350),
    fecha: Joi.date(),
    monto: Joi.number().integer(),
    estado: Joi.number().integer().max(2),
  });
  // valida el parametro que de documento_li el valor sea un numero
  const paramUpdatedLiderDto= Joi.object({
    documento_li:Joi.number().required()
  });


  export {createLiderDto,paramUpdatedLiderDto,updatedLiderDto};