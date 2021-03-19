import {UserService} from '../domain/user-service.js';
import { Context } from '../infrastructure/context.js';
import {BadRequestError, NotFoundError} from '../util/errors.js';

export class UserApplication {
    _context = new Context();
    async register(userRegisterDTO) {
        let user = UserService.create(userRegisterDTO);
        const result = await this._context.userRepository.add(user);
        return {id:result.id};
    }
    async changePassword(userChangePasswordDTO){
        const {id, oldPassword, newPassword} = userChangePasswordDTO;
        const user = await this._context.userRepository.findById(id); 
        if(!user){
            throw new NotFoundError('El usuario no existe');
        }
        const isCorrectPassword = UserService.isCorrectPassword(oldPassword, user.password);
        if(!isCorrectPassword){
            throw new BadRequestError('Usuario/contraseña incorrecta');
        }
        user.setPassword(UserService.encryptPassword(newPassword));
        await this._context.userRepository.update(user);
        // Opcionalmente devolver un dto con los cambios
    }
    dispose(){
        this._context.dispose();
    }
}