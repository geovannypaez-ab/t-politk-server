import {Strategy}from 'passport-local';
// import AuthService from '../../../services/auth.service';
import { AuthService } from '../../services/auth.service';
const service = new AuthService();
// creamos la estrategia para authenticarnos de manera normal, con usuario y contraseña
const LocalStrategy = new Strategy({
    usernameField:'username',
    passwordField:'password'
},async(username,password,done)=>{
  try {
    const user = await service.getadmin(username,password);
    done(null,user);
  } catch (error) {
    done(error,false);
  }
});
export default LocalStrategy;