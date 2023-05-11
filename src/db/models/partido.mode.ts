import { Model, InferAttributes, InferCreationAttributes, Sequelize,DataTypes, InitOptions, ModelAttributes,Optional} from "sequelize";
import { Administrador } from "./admin.model";
import { Tipocandi } from "./tipocandi.model";


const PARTIDO_TABLE = 'partido';

const PartidoSchema:ModelAttributes<Tipocandi, Optional<InferAttributes<Tipocandi, { omit: never; }>, never>>= {
    
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
class Partido extends Model<InferAttributes<Tipocandi>, InferCreationAttributes<Tipocandi>>{
    static associate (){
       this.hasMany(Administrador,{foreignKey:'documento_ad'})
    };
  
    static config(sequelize: Sequelize):InitOptions {
        return {
            sequelize,
            tableName: PARTIDO_TABLE,
            modelName: 'Partido',
            timestamps: false,
            }
        }
    }


// User.init()
export { Partido, PartidoSchema,PARTIDO_TABLE}

