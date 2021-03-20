import {UserService} from '../domain/user-service.js';
import { Context } from '../infrastructure/context.js';
import {BadRequestError, NotFoundError} from '../util/errors.js';

export class UserApplication {
    _context = new Context();
    async register(userRegisterDTO) {
        let user = UserService.create(userRegisterDTO);
        const {email} = user;
        const userEmail = await this._context.userRepository.findByEmail(email)
        if(userEmail){
            throw new BadRequestError('El usuario ya existe');
        }
        const result = await this._context.userRepository.add(user);
        return {id:result.id};
    }
    async login(userlogin){
        const {email, password} = userlogin;
        const user = await this._context.userRepository.findByEmail(email)
        if(!user){
            throw new NotFoundError('El usuario no existe');
        }
        const isCorrectPassword = UserService.isCorrectPassword(password, user.password);
        if(!isCorrectPassword){
            throw new BadRequestError('Usuario/contraseña incorrecta');
        }
    }
    dispose(){
        this._context.dispose();
    }
}