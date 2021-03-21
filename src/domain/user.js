import {ROLES} from './roles.js'

export class User {
    id;
    name;
    email;
    surname;
    password;
    provider;
    role = ROLES.CUSTOMER;
    setPassword(newPassword){
        this.password = newPassword;
    }
}