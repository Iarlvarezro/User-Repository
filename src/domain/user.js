import {ROLES} from './roles.js'

export class User {
    id;
    name;
    email;
    surname;
    password;
    role = ROLES.CUSTOMER;
    setPassword(newPassword){
        this.password = newPassword;
    }
}