"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lider = exports.LIDER_TABLE = exports.LiderSchema = void 0;
const sequelize_1 = require("sequelize");
const admin_model_1 = require("./admin.model");
const person_model_1 = require("./person.model");
const LIDER_TABLE = 'lider';
exports.LIDER_TABLE = LIDER_TABLE;
const LiderSchema = {
    documento_ad: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: false,
    },
    documento_li: {
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
    email: {
        type: sequelize_1.DataTypes.STRING(80),
    },
    fecha_naci: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: '0000-00-00'
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING(11),
        allowNull: false
    },
    id_muni: {
        type: sequelize_1.DataTypes.BIGINT({
            length: 20
        }),
        allowNull: false
    },
    usuario: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: false,
        unique: true
    },
    contrasena: {
        type: sequelize_1.DataTypes.STRING(600),
        allowNull: false
    },
    estado: {
        type: sequelize_1.DataTypes.STRING(1),
        allowNull: false
    },
    imagen: {
        type: sequelize_1.DataTypes.STRING(600),
        allowNull: false,
        defaultValue: 'sistemas.com/candidaturas/Dise_App/img/Avatar4.png'
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING(350),
    },
    fecha: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    monto: {
        type: sequelize_1.DataTypes.BIGINT({
            length: 20
        }),
        allowNull: false,
        defaultValue: '0'
    }
};
exports.LiderSchema = LiderSchema;
class Lider extends sequelize_1.Model {
    static associate() {
        //
        this.belongsTo(admin_model_1.Administrador, { as: 'administrador' });
        this.hasMany(person_model_1.Persona, { foreignKey: 'documento_pe', as: 'personas' });
        // this.belongsTo(User,{as:'user'});
        // this.hasOne(Profile,{foreignKey:'followerId', as:'profile'});
    }
    ;
    static config(sequelize) {
        return {
            sequelize,
            tableName: LIDER_TABLE,
            modelName: 'Lider',
            timestamps: false,
            // hooks:{
            //   beforeCreate: async (user:User,options)=>{
            //     const passwor = await bcrypt.hash(user.password,10);
            //     user.password = passwor;
            //   }
        };
    }
}
exports.Lider = Lider;
