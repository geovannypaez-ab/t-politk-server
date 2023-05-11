"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PARTIDO_TABLE = exports.PartidoSchema = exports.Partido = void 0;
const sequelize_1 = require("sequelize");
const admin_model_1 = require("./admin.model");
const PARTIDO_TABLE = 'partido';
exports.PARTIDO_TABLE = PARTIDO_TABLE;
const PartidoSchema = {
    id: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: false,
        primaryKey: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(40),
        allowNull: false,
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING(350),
        allowNull: false,
    },
};
exports.PartidoSchema = PartidoSchema;
class Partido extends sequelize_1.Model {
    static associate() {
        this.hasMany(admin_model_1.Administrador, { foreignKey: 'documento_ad' });
    }
    ;
    static config(sequelize) {
        return {
            sequelize,
            tableName: PARTIDO_TABLE,
            modelName: 'Partido',
            timestamps: false,
        };
    }
}
exports.Partido = Partido;
