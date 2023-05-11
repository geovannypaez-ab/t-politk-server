import { Model, InferAttributes, InferCreationAttributes, Sequelize,DataTypes, InitOptions, ModelAttributes,Optional, ForeignKey} from "sequelize";
import { Administrador } from "./admin.model";
import { Departamento } from "./departamento.model";
import { Tipocandi } from "./tipocandi.model";

const DEP_TIPOCANDI_TABLE = 'dep_tipocandi';

const DepTipocandiSchema:ModelAttributes<DepTipocandi, Optional<InferAttributes<DepTipocandi, { omit: never; }>, never>>= {
        id_dep: {
          primaryKey:true,
          type: DataTypes.INTEGER,
          allowNull: false,
          references:{
            model:Departamento
          },
          field:"id_dep"
        },
        id_tc:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:Tipocandi
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
class DepTipocandi extends Model<InferAttributes<DepTipocandi>, InferCreationAttributes<DepTipocandi>>{
    declare id_dep:ForeignKey<Departamento['id_dep']>;
    declare id_tc: ForeignKey<Tipocandi['id']>;
    declare documento_ad: ForeignKey<Administrador['documento_ad']>
    // static associate (){
    //    this.hasMany(Administrador,{foreignKey:'documento_ad'})
    // };
  
    static config(sequelize: Sequelize):InitOptions {
        return {
            sequelize,
            tableName: DEP_TIPOCANDI_TABLE,
            modelName: 'DepTipocandi',
            timestamps: false,
            }
        }
    }
// User.init()
export { DEP_TIPOCANDI_TABLE, DepTipocandi,DepTipocandiSchema}

