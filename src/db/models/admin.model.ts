import { Model, InferAttributes, InferCreationAttributes, CreationOptional, Sequelize,DataTypes, InitOptions, ModelAttributes,Optional, NonAttribute} from "sequelize";
import { Lider } from "./lider.model";
// import { Tipocandi } from "./tipocandi.model";


const ADMINISTRADOR_TABLE = 'administrador';

const AdministradorSchema:ModelAttributes<Administrador, Optional<InferAttributes<Administrador, { omit: never; }>, never>>= {
    documento_ad: {
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
      partido: {
        type: DataTypes.BIGINT({
            "length":20
        }),
        allowNull: false
      },
      tipocandidatura: {
        type: DataTypes.BIGINT({
            length:20
        }),
        allowNull: false
      },
      imagen: {
        type: DataTypes.STRING(600),
        allowNull: false,
        defaultValue: 'https://ab-sistemas.com/candidaturas/Dise_App/img/Avatar4.png'
      },
      telefono: {
        type: DataTypes.STRING(11),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      usuario: {
        type: DataTypes.STRING(15),
        allowNull: false
      },
      contrasena: {
        type: DataTypes.STRING(600),
        allowNull: false
      },
      estado: {
        type: DataTypes.STRING(1),
        defaultValue: '0'
      },
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
      }
    }
  
  
class Administrador extends Model<InferAttributes<Administrador>, InferCreationAttributes<Administrador>>{

    declare documento_ad: string;
    declare apellido:string;
    declare nombre: string;
    declare partido: number;
    declare tipocandidatura: number;
    declare imagen: CreationOptional<string>;
    declare telefono : string
    declare email:string;
    declare contrasena: string;
    declare usuario:string;
    declare estado:string
    declare fecha: Date;
    declare lideres :NonAttribute<Lider[]>
    static associate (){
        //
        this.hasMany(Lider,{as:'lideres',foreignKey:'documento_li'});
        // this.belongsTo(Tipocandi,)
    };
  
    static config(sequelize: Sequelize):InitOptions {
        return {
            sequelize,
            tableName: ADMINISTRADOR_TABLE,
            modelName: 'Administrador',
            timestamps: false,
            }
        }
    }


// User.init()
export { AdministradorSchema, ADMINISTRADOR_TABLE,Administrador}

