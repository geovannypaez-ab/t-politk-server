"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MuniTipocandiSchema = exports.MUNI_TIPOCANDI_TABLE = exports.MuniTipocandi = void 0;
const sequelize_1 = require("sequelize");
const admin_model_1 = require("./admin.model");
const municipio_model_1 = require("./municipio.model");
const tipocandi_model_1 = require("./tipocandi.model");
const MUNI_TIPOCANDI_TABLE = 'muni_tipocandi';
exports.MUNI_TIPOCANDI_TABLE = MUNI_TIPOCANDI_TABLE;
const MuniTipocandiSchema = {
    id_muni: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: municipio_model_1.Municipio,
            key: 'id_muni'
        }
    },
    id_tc: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: tipocandi_model_1.Tipocandi,
            'key': 'id'
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
exports.MuniTipocandiSchema = MuniTipocandiSchema;
class MuniTipocandi extends sequelize_1.Model {
    // static associate (){
    //    this.hasMany(Administrador,{foreignKey:'documento_ad'})
    // };
    static config(sequelize) {
        return {
            sequelize,
            tableName: MUNI_TIPOCANDI_TABLE,
            modelName: 'MuniTipocandi',
            timestamps: false,
        };
    }
}
exports.MuniTipocandi = MuniTipocandi;
