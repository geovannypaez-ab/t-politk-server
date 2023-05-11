import { Model, InferAttributes, InferCreationAttributes, Sequelize,DataTypes, InitOptions, ModelAttributes,Optional, ForeignKey} from "sequelize";
import { Departamento } from "./departamento.model";

const MUNICIPIO_TABLE = 'municipio';

const MunicipioSchema:ModelAttributes<Municipio, Optional<InferAttributes<Municipio, { omit: never; }>, never>>= {
        id_muni: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
        },
        id_dep:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:Departamento,
                'key':'id_dep'
            }
        },
        nombre: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        codigo: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        
    }
class Municipio extends Model<InferAttributes<Municipio>, InferCreationAttributes<Municipio>>{
    declare id_muni:number
    declare id_dep: ForeignKey<Departamento['id_dep']>;
    declare nombre: string;
    declare codigo :number;
    // static associate (){
    //    this.hasMany(Administrador,{foreignKey:'documento_ad'})
    // };
  
    static config(sequelize: Sequelize):InitOptions {
        return {
            sequelize,
            tableName: MUNICIPIO_TABLE,
            modelName: 'Municipio',
            timestamps: false,
            }
        }
    }
// User.init()
export { MunicipioSchema, Municipio,MUNICIPIO_TABLE}

