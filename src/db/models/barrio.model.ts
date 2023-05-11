import { Model, InferAttributes, InferCreationAttributes, Sequelize,DataTypes, InitOptions, ModelAttributes,Optional, ForeignKey} from "sequelize";
import { Municipio } from "./municipio.model";

const BARRIO_TABLE = 'barrio';

const BarrioSchema:ModelAttributes<Barrio, Optional<InferAttributes<Barrio, { omit: never; }>, never>>= {
        id_bar: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
        },
        id_muni:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:Municipio,
                'key':'id_muni'
            }
        },
        nombre: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        comuna: {
          type: DataTypes.STRING(3),
          allowNull: false,
        },
    }
class Barrio extends Model<InferAttributes<Barrio>, InferCreationAttributes<Barrio>>{
    declare id_bar:number
    declare id_muni: ForeignKey<Municipio['id_muni']>;
    declare nombre: string;
    declare comuna :number;
    // static associate (){
    //    this.hasMany(Administrador,{foreignKey:'documento_ad'})
    // };
  
    static config(sequelize: Sequelize):InitOptions {
        return {
            sequelize,
            tableName: BARRIO_TABLE,
            modelName: 'Barrio',
            timestamps: false,
            }
        }
    }
// User.init()
export { Barrio, BarrioSchema,BARRIO_TABLE}

