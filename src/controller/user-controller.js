import bodyParser from 'body-parser';
import {body} from 'express-validator';
import {UserApplication} from '../application/user-application.js';
import { validator, password } from '../util/validator.js';
import cors from 'cors'

var corsOptions = {
    origin: "*"
  }

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
                res.status(201).send(result);
            } catch (err) {
                console.log(err);
                const code = err.code || 500;
                const msg = err.code === 500 ? 'Error inesperado' : err.message;
                res.status(code).send(msg).end();
            } finally {
                controller.dispose();
            }
        });
        app.post('/users/change-password', [

            body('id').notEmpty(),
            body('oldPassword').notEmpty(),
            password('newPassword'),
            validator
        ], async (req, res) => {
            let controller = new UserController();
            try {
                await controller.changePassword(req.body);
                res.status(204).end();
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
    changePassword(userChangePasswordDTO){
        return this._application.changePassword(userChangePasswordDTO)
    }
    dispose(){
        this._application.dispose();
    }
}