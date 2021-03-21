import {Repository} from './repository.js'
export class SessionRepository extends Repository{
    constructor(client, hash, type) {
       super(client,hash,type)
    }
    add(entity){
        this._set(entity)
        return entity;
    }
}