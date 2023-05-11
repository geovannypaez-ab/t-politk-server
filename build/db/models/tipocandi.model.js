"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIPOCANDI_TABLE = exports.TipocandiSchema = exports.Tipocandi = void 0;
const sequelize_1 = require("sequelize");
const admin_model_1 = require("./admin.model");
const TIPOCANDI_TABLE = 'tipocandi';
exports.TIPOCANDI_TABLE = TIPOCANDI_TABLE;
const TipocandiSchema = {
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
exports.TipocandiSchema = TipocandiSchema;
class Tipocandi extends sequelize_1.Model {
    static associate() {
        this.hasMany(admin_model_1.Administrador, { foreignKey: 'documento_ad' });
    }
    ;
    static config(sequelize) {
        return {
            sequelize,
            tableName: TIPOCANDI_TABLE,
            modelName: 'Tipocandi',
            timestamps: false,
        };
    }
}
exports.Tipocandi = Tipocandi;
