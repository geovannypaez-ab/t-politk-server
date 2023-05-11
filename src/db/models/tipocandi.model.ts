import { Model, InferAttributes, InferCreationAttributes, Sequelize,DataTypes, InitOptions, ModelAttributes,Optional} from "sequelize";
import { Administrador } from "./admin.model";


const TIPOCANDI_TABLE = 'tipocandi';

const TipocandiSchema:ModelAttributes<Tipocandi, Optional<InferAttributes<Tipocandi, { omit: never; }>, never>>= {
    
        id: {
          type: DataTypes.STRING(15),
          allowNull: false,
          primaryKey: true
        },
        nombre: {
          type: DataTypes.STRING(40),
          allowNull: false,
        },
        descripcion: {
          type: DataTypes.STRING(350),
          allowNull: false,
        },
        
    }
class Tipocandi extends Model<InferAttributes<Tipocandi>, InferCreationAttributes<Tipocandi>>{

    declare id: number;
    declare nombre: string;
  declare descripcion: string;
  
    static associate (){
       this.hasMany(Administrador,{foreignKey:'documento_ad'});
    };
  
    static config(sequelize: Sequelize):InitOptions {
        return {
            sequelize,
            tableName: TIPOCANDI_TABLE,
            modelName: 'Tipocandi',
            timestamps: false,
            }
        }
    }


// User.init()
export { Tipocandi, TipocandiSchema,TIPOCANDI_TABLE}

