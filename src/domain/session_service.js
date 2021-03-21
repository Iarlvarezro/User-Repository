import * as uuid from 'uuid';
import {Session} from './session.js'

export class SessionService {
    static create(sessionDto) {
        const { name, email,surname,role,access_token} = sessionDto;
        const user = {
            name,
            email,
            surname,
            role,
        };
        const session = new Session();
        Object.assign(session, {
            user,
            access_token:access_token,
            id: uuid.v4()
        });
        return session;
    }
    
   
}