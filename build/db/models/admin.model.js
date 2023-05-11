"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Administrador = exports.ADMINISTRADOR_TABLE = exports.AdministradorSchema = void 0;
const sequelize_1 = require("sequelize");
const lider_model_1 = require("./lider.model");
// import { Tipocandi } from "./tipocandi.model";
const ADMINISTRADOR_TABLE = 'administrador';
exports.ADMINISTRADOR_TABLE = ADMINISTRADOR_TABLE;
const AdministradorSchema = {
    documento_ad: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: false,
        primaryKey: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    apellido: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    partido: {
        type: sequelize_1.DataTypes.BIGINT({
            "length": 20
        }),
        allowNull: false
    },
    tipocandidatura: {
        type: sequelize_1.DataTypes.BIGINT({
            length: 20
        }),
        allowNull: false
    },
    imagen: {
        type: sequelize_1.DataTypes.STRING(600),
        allowNull: false,
        defaultValue: 'https://ab-sistemas.com/candidaturas/Dise_App/img/Avatar4.png'
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING(11),
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    usuario: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: false
    },
    contrasena: {
        type: sequelize_1.DataTypes.STRING(600),
        allowNull: false
    },
    estado: {
        type: sequelize_1.DataTypes.STRING(1),
        defaultValue: '0'
    },
    fecha: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false
    }
};
exports.AdministradorSchema = AdministradorSchema;
class Administrador extends sequelize_1.Model {
    static associate() {
        //
        this.hasMany(lider_model_1.Lider, { as: 'lideres', foreignKey: 'documento_li' });
        // this.belongsTo(Tipocandi,)
    }
    ;
    static config(sequelize) {
        return {
            sequelize,
            tableName: ADMINISTRADOR_TABLE,
            modelName: 'Administrador',
            timestamps: false,
        };
    }
}
exports.Administrador = Administrador;
