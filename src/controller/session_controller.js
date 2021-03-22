import {SessionApplication} from '../application/session_application.js'
class SessionControler{
    static async session(req,res){
        const sessionApplication = new SessionApplication();
        const session = await sessionApplication.getSession(req.params.id)
        res.status(200).send(session).end();
    }
    static async logout(req,res){
        const sessionApplication = new SessionApplication();
        await sessionApplication.logout(req.params.id)
        res.redirect('/');
    }
}

export function register(app){
    app.get('/session/:id',SessionControler.session)
    app.post('/logout/:id',SessionControler.logout)
}