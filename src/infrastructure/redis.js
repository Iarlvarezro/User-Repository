import {promisify} from 'util';
import redis from 'redis';

const asyncApi = ['set', 'del', 'get', 'quit'];

export class RedisClient {
    constructor(){
        this._client = redis.createClient();
        for(let method of asyncApi){
            this[method] = promisify(this._client[method].bind(this._client));
        }
    }
    multi(){
        const _multi = this._client.multi();
        _multi.exec = promisify(_multi.exec.bind(_multi));
        return _multi;
    }
    dispose(){
        return this._client.quit();
    }
}

