import {ROLES} from './roles.js'

export class User {
    id;
    name;
    email;
    password;
    avatar;
    role = ROLES.CUSTOMER;
    setPassword(newPassword){
        this.password = newPassword;
    }
}