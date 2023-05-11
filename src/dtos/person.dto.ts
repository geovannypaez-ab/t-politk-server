import Joi from "joi";

// Definir la función personalizada para validar la fecha de nacimiento para que sea mayor de edads
const isDateOfBirthValid = (value:string, helpers:Joi.CustomHelpers) => {
  const age = Math.floor((Date.now() - new Date(value).getTime()) / 31557600000);
  if (age < 18) {
    return helpers.error("debe ser mayor de edad",{
        label:"debe ser mayor de edad",
        "value":"value"
    });
  }
  return value;
};
// dto para poder crear personas
const createPersonDto = Joi.object({
  documento_pe: Joi.string().max(15).required(),
  nombre: Joi.string().max(20).required(),
  apellido: Joi.string().max(20).required(),
  email: Joi.string().email().max(50),
  fecha_naci: Joi.date().custom(isDateOfBirthValid, 'custom validation').required(), // Usar la función personalizada para validar la fecha de nacimiento
  puesto_votacion: Joi.string().required(),
  genero: Joi.string().min(5).required(),
  telefono: Joi.string().max(11).required(),
  id_bar: Joi.string().required(),
});
//dto para poder actualizar los datos de una persona
const updatedPersonDto = Joi.object({
    documento_pe: Joi.string().max(15),
    documento_li: Joi.string().max(15),
    fecha_naci: Joi.date(),
    nombre: Joi.string().max(20),
    apellido: Joi.string().max(20),
    genero: Joi.string().max(15),
    id_bar: Joi.number().integer(),
    email: Joi.string().email().max(50),
    telefono: Joi.string().max(11),
    puesto_votacion: Joi.string().max(100),
    estado: Joi.string().max(1).required()
  });
  
export {createPersonDto,updatedPersonDto}