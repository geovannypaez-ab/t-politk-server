"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PuestoVotacionSchema = exports.PUESTO_VOTACION_TABLE = exports.PuestoVotacion = void 0;
const sequelize_1 = require("sequelize");
const departamento_model_1 = require("./departamento.model");
const PUESTO_VOTACION_TABLE = 'puestovotacion';
exports.PUESTO_VOTACION_TABLE = PUESTO_VOTACION_TABLE;
const PuestoVotacionSchema = {
    pv_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        'autoIncrement': true
    },
    pv_nombre: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    pv_comuna: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
    },
    id_dep: {
        allowNull: false,
        type: sequelize_1.DataTypes.BIGINT,
        references: {
            model: departamento_model_1.Departamento,
            key: 'id_dep'
        }
    }
};
exports.PuestoVotacionSchema = PuestoVotacionSchema;
class PuestoVotacion extends sequelize_1.Model {
    // static associate (){
    //    this.hasMany(Administrador,{foreignKey:'documento_ad'})
    // };
    static config(sequelize) {
        return {
            sequelize,
            tableName: PUESTO_VOTACION_TABLE,
            modelName: 'PuestoVotacion',
            timestamps: false,
        };
    }
}
exports.PuestoVotacion = PuestoVotacion;
