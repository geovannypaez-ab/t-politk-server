import { Model, InferAttributes, InferCreationAttributes, CreationOptional, Sequelize,DataTypes, InitOptions, ModelAttributes,Optional, ForeignKey, NonAttribute} from "sequelize";
import { Lider } from "./lider.model";


const PERSON_TABLE = 'persona';

const PersonaSchema:ModelAttributes<Persona, Optional<InferAttributes<Persona, { omit: never; }>, never>>= {
    
        documento_pe: {
          type: DataTypes.STRING(15),
          allowNull: false,
          primaryKey: true
        },
        documento_li: {
          type: DataTypes.STRING(15),
          allowNull: false,
          references:{
            model:Lider,
            key:'documento_li'
          }
        },
        fecha_naci: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        nombre: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        apellido: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        genero: {
          type: DataTypes.STRING(15),
          allowNull: false,
        },
        id_bar: {
          type: DataTypes.BIGINT({
            length:20
          }),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        telefono: {
          type: DataTypes.STRING(11),
          allowNull: false,
        },
        puesto_votacion: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        estado: {
          type: DataTypes.STRING(1),
          allowNull: false,
          defaultValue:"0"
        },
        fecha: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          defaultValue:DataTypes.NOW
        }
    }
  
  
class Persona extends Model<InferAttributes<Persona>, InferCreationAttributes<Persona>>{

    declare documento_pe: string;
  declare documento_li: ForeignKey<Lider['documento_li']>;
  declare fecha_naci: Date;
  declare nombre: string;
  declare apellido: string;
  declare genero: string;
  declare id_bar: number;
  declare email: string;
  declare telefono: string;
  declare puesto_votacion: string;
  declare estado: string;
  declare fecha: Date;
    static associate (){
        this.belongsTo(Lider,{as:'lider'})
        //
        // this.belongsTo(User,{as:'user'});
        // this.hasOne(Profile,{foreignKey:'followerId', as:'profile'});
    };
  
    static config(sequelize: Sequelize):InitOptions {
        return {
            sequelize,
            tableName: PERSON_TABLE,
            modelName: 'Person',
            timestamps: false,
            }
        }
    }


// User.init()
export { PERSON_TABLE, Persona,PersonaSchema}

