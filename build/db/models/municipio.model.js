"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MUNICIPIO_TABLE = exports.Municipio = exports.MunicipioSchema = void 0;
const sequelize_1 = require("sequelize");
const departamento_model_1 = require("./departamento.model");
const MUNICIPIO_TABLE = 'municipio';
exports.MUNICIPIO_TABLE = MUNICIPIO_TABLE;
const MunicipioSchema = {
    id_muni: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    id_dep: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: departamento_model_1.Departamento,
            'key': 'id_dep'
        }
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    codigo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
};
exports.MunicipioSchema = MunicipioSchema;
class Municipio extends sequelize_1.Model {
    // static associate (){
    //    this.hasMany(Administrador,{foreignKey:'documento_ad'})
    // };
    static config(sequelize) {
        return {
            sequelize,
            tableName: MUNICIPIO_TABLE,
            modelName: 'Municipio',
            timestamps: false,
        };
    }
}
exports.Municipio = Municipio;
