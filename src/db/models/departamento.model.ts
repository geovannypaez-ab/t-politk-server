import { Model, InferAttributes, InferCreationAttributes, Sequelize,DataTypes, InitOptions, ModelAttributes,Optional} from "sequelize";


const DEPARTAMENTO_TABLE = 'departamento';

const DepartamentoSchema:ModelAttributes<Departamento, Optional<InferAttributes<Departamento, { omit: never; }>, never>>= {
    
        id_dep: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
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
class Departamento extends Model<InferAttributes<Departamento>, InferCreationAttributes<Departamento>>{
    declare id_dep: number;
    declare nombre: string;
    declare codigo :number;
    // static associate (){
    //    this.hasMany(Administrador,{foreignKey:'documento_ad'})
    // };
  
    static config(sequelize: Sequelize):InitOptions {
        return {
            sequelize,
            tableName: DEPARTAMENTO_TABLE,
            modelName: 'Departamento',
            timestamps: false,
            }
        }
    }
// User.init()
export { DepartamentoSchema, Departamento,DEPARTAMENTO_TABLE}

