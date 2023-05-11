"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonaSchema = exports.Persona = exports.PERSON_TABLE = void 0;
const sequelize_1 = require("sequelize");
const lider_model_1 = require("./lider.model");
const PERSON_TABLE = 'persona';
exports.PERSON_TABLE = PERSON_TABLE;
const PersonaSchema = {
    documento_pe: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: false,
        primaryKey: true
    },
    documento_li: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: false,
        references: {
            model: lider_model_1.Lider,
            key: 'documento_li'
        }
    },
    fecha_naci: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
    },
    apellido: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
    },
    genero: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: false,
    },
    id_bar: {
        type: sequelize_1.DataTypes.BIGINT({
            length: 20
        }),
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING(11),
        allowNull: false,
    },
    puesto_votacion: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.STRING(1),
        allowNull: false,
        defaultValue: "0"
    },
    fecha: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    }
};
exports.PersonaSchema = PersonaSchema;
class Persona extends sequelize_1.Model {
    static associate() {
        this.belongsTo(lider_model_1.Lider, { as: 'lider' });
        //
        // this.belongsTo(User,{as:'user'});
        // this.hasOne(Profile,{foreignKey:'followerId', as:'profile'});
    }
    ;
    static config(sequelize) {
        return {
            sequelize,
            tableName: PERSON_TABLE,
            modelName: 'Person',
            timestamps: false,
        };
    }
}
exports.Persona = Persona;
