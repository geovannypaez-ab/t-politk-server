
import { Sequelize, Options } from 'sequelize';
import config from '../config';
import { setupModels } from './models';


const options: Options = {
    dialect: 'mysql',
    logging: config.isDev ? console.log : false 
}
// if (config.isprod) {   
//     options.dialectOptions = {
//         ssl: { rejectUnauthorized: false }
//     }
// }


const sequelize = new Sequelize(config.dbUrl as string,options); 
const isConect =async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
// la pasamos los modelos o tablas a la intancia de sequelize
const models = setupModels(sequelize);
//nos conecamos a la db
isConect().then();
 
// // sequelize.sync().then();


export {models ,sequelize};