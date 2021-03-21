import * as uuid from 'uuid';
import bcrypt from 'bcrypt';
import {User} from './user.js';

export class UserService {
    static create(userDTO) {
        const { name, email, password, surname,provider } = userDTO;
        const user = new User();
        Object.assign(user, {
            name,
            email,
            surname,
            password: this.encryptPassword(password || ''),
            provider,
            id: uuid.v4()
        });
        return user;
    }
    static isCorrectPassword(raw, encrypted){
        return bcrypt.compareSync(raw, encrypted);
    }
    static encryptPassword(raw){
        return bcrypt.hashSync(raw, 10);
    }
}