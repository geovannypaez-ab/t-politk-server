import { Model, InferAttributes, InferCreationAttributes, Sequelize,DataTypes, InitOptions, ModelAttributes,Optional, ForeignKey} from "sequelize";
import { Administrador } from "./admin.model";
import { Municipio } from "./municipio.model";
import { Tipocandi } from "./tipocandi.model";

const MUNI_TIPOCANDI_TABLE = 'muni_tipocandi';

const MuniTipocandiSchema:ModelAttributes<MuniTipocandi, Optional<InferAttributes<MuniTipocandi, { omit: never; }>, never>>= {
        id_muni: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references:{
            model:Municipio,
            key:'id_muni'
          }
        },
        id_tc:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:Tipocandi,
                'key':'id'
            }
        },
        documento_ad: {
          type: DataTypes.STRING(255),
          allowNull: false,
          references:{
            model:Administrador,
            key:'documento_ad'
          }
        },
       
        
    }
class MuniTipocandi extends Model<InferAttributes<MuniTipocandi>, InferCreationAttributes<MuniTipocandi>>{
    declare id_muni:ForeignKey<Municipio['id_muni']>;
    declare id_tc: ForeignKey<Tipocandi['id']>;
    declare documento_ad: ForeignKey<Administrador['documento_ad']>
    // static associate (){
    //    this.hasMany(Administrador,{foreignKey:'documento_ad'})
    // };
  
    static config(sequelize: Sequelize):InitOptions {
        return {
            sequelize,
            tableName: MUNI_TIPOCANDI_TABLE,
            modelName: 'MuniTipocandi',
            timestamps: false,
            }
        }
    }
// User.init()
export { MuniTipocandi, MUNI_TIPOCANDI_TABLE,MuniTipocandiSchema}

