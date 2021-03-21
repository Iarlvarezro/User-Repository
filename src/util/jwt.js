import {promisify} from 'util';
import jsonwebtoken from 'jsonwebtoken';

export const jwt = {
    sign: promisify(jsonwebtoken.sign.bind(jsonwebtoken)),
    verify: promisify(jsonwebtoken.verify.bind(jsonwebtoken))
};