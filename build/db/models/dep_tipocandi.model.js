"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepTipocandiSchema = exports.DepTipocandi = exports.DEP_TIPOCANDI_TABLE = void 0;
const sequelize_1 = require("sequelize");
const admin_model_1 = require("./admin.model");
const departamento_model_1 = require("./departamento.model");
const tipocandi_model_1 = require("./tipocandi.model");
const DEP_TIPOCANDI_TABLE = 'dep_tipocandi';
exports.DEP_TIPOCANDI_TABLE = DEP_TIPOCANDI_TABLE;
const DepTipocandiSchema = {
    id_dep: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: departamento_model_1.Departamento
        },
        field: "id_dep"
    },
    id_tc: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: tipocandi_model_1.Tipocandi
        }
    },
    documento_ad: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        references: {
            model: admin_model_1.Administrador,
            key: 'documento_ad'
        }
    },
};
exports.DepTipocandiSchema = DepTipocandiSchema;
class DepTipocandi extends sequelize_1.Model {
    // static associate (){
    //    this.hasMany(Administrador,{foreignKey:'documento_ad'})
    // };
    static config(sequelize) {
        return {
            sequelize,
            tableName: DEP_TIPOCANDI_TABLE,
            modelName: 'DepTipocandi',
            timestamps: false,
        };
    }
}
exports.DepTipocandi = DepTipocandi;
