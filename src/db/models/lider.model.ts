import { Model, InferAttributes, InferCreationAttributes, Sequelize,DataTypes, InitOptions, ModelAttributes,Optional, ForeignKey, NonAttribute, CreationOptional} from "sequelize";
import { Administrador } from "./admin.model";
import { Persona } from "./person.model";


const LIDER_TABLE = 'lider';

const LiderSchema:ModelAttributes<Lider, Optional<InferAttributes<Lider, { omit: never; }>, never>>= {
    documento_ad: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    documento_li: {
        type: DataTypes.STRING(15),
        allowNull: false,
        primaryKey: true

    },
    nombre: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(80),
    },
    fecha_naci: {
        type: DataTypes.DATEONLY,
        allowNull:true,
        defaultValue:'0000-00-00'
    },
    telefono: {
        type: DataTypes.STRING(11),
        allowNull: false
    },
    id_muni: {
        type: DataTypes.BIGINT({
            length: 20
        }),
        allowNull: false
    },
    usuario: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique:true
    },
    contrasena: {
        type: DataTypes.STRING(600),
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING(1),
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING(600),
        allowNull: false,
        defaultValue:'sistemas.com/candidaturas/Dise_App/img/Avatar4.png'
    },
    descripcion: {
        type: DataTypes.STRING(350),
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue:DataTypes.NOW
    },
    monto: {
        type: DataTypes.BIGINT({
            length: 20
        }),
        allowNull: false,
        defaultValue:'0'
    }
    }
  
  
class Lider extends Model<InferAttributes<Lider>, InferCreationAttributes<Lider>>{

    declare documento_ad: ForeignKey<Administrador['documento_ad']>;
    declare administrador:NonAttribute<Administrador>
    declare personas: NonAttribute<Persona[]>
    declare documento_li: string;
    declare nombre: string;
    declare apellido: string;
    declare email: CreationOptional<string>;
    declare fecha_naci: CreationOptional<Date>;
    declare telefono: string;
    declare id_muni: number;
    declare usuario: string;
    declare contrasena: string;
    declare estado: string;
    declare imagen: CreationOptional<string>;
    declare descripcion: CreationOptional<string>;
    declare fecha: Date;
    declare monto: number;
    static associate (){
        //
        this.belongsTo(Administrador,{as:'administrador'});
        this.hasMany(Persona,{foreignKey:'documento_pe',as:'personas'}); 
        // this.belongsTo(User,{as:'user'});
        // this.hasOne(Profile,{foreignKey:'followerId', as:'profile'});
    };
  
    static config(sequelize: Sequelize):InitOptions {
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
            }
        }
    }


// User.init()

export { LiderSchema, LIDER_TABLE,Lider}

