"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BARRIO_TABLE = exports.BarrioSchema = exports.Barrio = void 0;
const sequelize_1 = require("sequelize");
const municipio_model_1 = require("./municipio.model");
const BARRIO_TABLE = 'barrio';
exports.BARRIO_TABLE = BARRIO_TABLE;
const BarrioSchema = {
    id_bar: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    id_muni: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: municipio_model_1.Municipio,
            'key': 'id_muni'
        }
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    comuna: {
        type: sequelize_1.DataTypes.STRING(3),
        allowNull: false,
    },
};
exports.BarrioSchema = BarrioSchema;
class Barrio extends sequelize_1.Model {
    // static associate (){
    //    this.hasMany(Administrador,{foreignKey:'documento_ad'})
    // };
    static config(sequelize) {
        return {
            sequelize,
            tableName: BARRIO_TABLE,
            modelName: 'Barrio',
            timestamps: false,
        };
    }
}
exports.Barrio = Barrio;
