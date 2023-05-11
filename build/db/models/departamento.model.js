"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEPARTAMENTO_TABLE = exports.Departamento = exports.DepartamentoSchema = void 0;
const sequelize_1 = require("sequelize");
const DEPARTAMENTO_TABLE = 'departamento';
exports.DEPARTAMENTO_TABLE = DEPARTAMENTO_TABLE;
const DepartamentoSchema = {
    id_dep: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
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
exports.DepartamentoSchema = DepartamentoSchema;
class Departamento extends sequelize_1.Model {
    // static associate (){
    //    this.hasMany(Administrador,{foreignKey:'documento_ad'})
    // };
    static config(sequelize) {
        return {
            sequelize,
            tableName: DEPARTAMENTO_TABLE,
            modelName: 'Departamento',
            timestamps: false,
        };
    }
}
exports.Departamento = Departamento;
