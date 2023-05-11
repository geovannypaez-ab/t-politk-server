import { Model, InferAttributes, InferCreationAttributes, Sequelize,DataTypes, InitOptions, ModelAttributes,Optional, ForeignKey} from "sequelize";
import { Departamento } from "./departamento.model";


const PUESTO_VOTACION_TABLE = 'puestovotacion';

const PuestoVotacionSchema:ModelAttributes<PuestoVotacion, Optional<InferAttributes<PuestoVotacion, { omit: never; }>, never>>= {
        pv_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey:true,
          'autoIncrement':true
        },
        pv_nombre:{
            type:DataTypes.STRING(100),
            allowNull:false,
        },
        pv_comuna: {
          type: DataTypes.BIGINT,
          allowNull: false, 
        },
        id_dep:{
            allowNull:false,
            type:DataTypes.BIGINT,
            references:{
                model:Departamento,
                key:'id_dep'
            }
        }
    }
class PuestoVotacion extends Model<InferAttributes<PuestoVotacion>, InferCreationAttributes<PuestoVotacion>>{
    declare pv_id:number;
    declare pv_nombre:string;
    declare pv_comuna:number;
    declare id_dep: ForeignKey<Departamento['id_dep']>;
    // static associate (){
    //    this.hasMany(Administrador,{foreignKey:'documento_ad'})
    // };
  
    static config(sequelize: Sequelize):InitOptions {
        return {
            sequelize,
            tableName: PUESTO_VOTACION_TABLE,
            modelName: 'PuestoVotacion',
            timestamps: false,
            }
        }
    }
// User.init()
export { PuestoVotacion, PUESTO_VOTACION_TABLE,PuestoVotacionSchema}

