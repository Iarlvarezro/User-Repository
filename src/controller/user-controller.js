
import {body} from 'express-validator';
import {UserApplication} from '../application/user-application.js';
import { validator, password } from '../util/validator.js';


export class UserController {
    static register(app) {
        app.post('/users', [
            body('email').isEmail(),
            password('password'),
            body('name').notEmpty({ignore_whitespace:true}).withMessage('El nombre es requerido'),
            validator,
        ], async (req, res) => {
            let controller = new UserController();
            try {
                const result = await controller.post(req.body);
                res.status(200).send(result);
            } catch (err) {
                console.log(err);
                const code = err.code || 500;
                const msg = err.code === 500 ? 'Error inesperado' : err.message;
                res.status(code).send(msg).end();
            } finally {
                controller.dispose();
            }
        });
        app.post('/login', [
            body('email').notEmpty(),
            body('password').notEmpty(),
            validator
        ], async (req, res) => {
            let controller = new UserController();
            try {
                const result = await controller.login(req.body);
                res.status(200).send(result).end();
            } catch (err) {
                console.log(err)
                const code = err.code || 500;
                const msg = err.code === 500 ? 'Error inesperado' : err.message
                res.status(code).send(msg).end();
            }
            finally {
                controller.dispose();
            }
        })

        app.post('/login/google', [
            body('email').notEmpty(),
            body('name').notEmpty(),
            body('surname').notEmpty(),
            validator
        ], async (req, res) => {
            let controller = new UserController();
            try {
                const result = await controller.loginGoogle(req.body);
                res.status(200).send(result).end();
            } catch (err) {
                console.log(err)
                const code = err.code || 500;
                const msg = err.code === 500 ? 'Error inesperado' : err.message
                res.status(code).send(msg).end();
            }
            finally {
                controller.dispose();
            }
        })
    }
    _application = new UserApplication();
    post(userDTO) {
        return this._application.register(userDTO);
    }
    login(userLogin){
        return this._application.login(userLogin)
    }
    loginGoogle(userLogin){
        return this._application.loginGoogle(userLogin)
    }
    dispose(){
        this._application.dispose();
    }
}