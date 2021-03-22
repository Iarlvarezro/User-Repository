import { Context } from '../infrastructure/context.js';
import { NotFoundError } from '../util/errors.js';
import { jwt } from '../util/jwt.js'
export class SessionApplication{
    _context = new Context();
    async getSession(id){
        const session = await this._context.sessionRepostory.findById(id);
        if(!session){
            throw new NotFoundError('la session no existe')
        }
        return this.verify(session)
    }
    async logout(id){
        const session = await this._context.sessionRepostory.findById(id);
        if(!session){
            throw new NotFoundError('la session no existe')
        }
        await this._context.sessionRepostory.remove(session)
    }
    async verify(session){
        const {access_token} = session;
        try {
            await jwt.verify(access_token, process.env.JWT_SECRET);
            return session;
        } catch (err) {
            const {name} = err
            if(name==='TokenExpiredError'){
               const newToken = jwt.sign(session.user,process.env.JWT_SECRET, { algorithm: 'HS256' })     
               session.access_token = newToken
               return session;
            }
            throw err;
        }
    
    }
    dispose(){
        this._context.dispose();
    }
}