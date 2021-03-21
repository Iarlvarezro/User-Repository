import {InternalError} from '../util/errors.js';
import { User } from '../domain/user.js';
import {Session} from '../domain/session.js'
import { Repository } from './repository.js';
import {SessionRepository} from './session-respository.js'
import { RedisClient } from './redis.js';

export class Context {
    constructor(){
        this._client = new RedisClient();
        this.userRepository = new Repository(this._client, 'user', User);
        this.sessionRepostory = new SessionRepository(this._client,'session',Session)
    }
    async dispose(){
        try {
            await this._client.dispose();
        } catch(err) {
            throw new InternalError('Error inesperado');
        }
    }
}