import {validationResult, body} from 'express-validator';

export function validator(req, res, next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped()});
    }
    next();
}

export function password(field){
  return body(field).isLength({min:6}).withMessage('La contraseña debe tener al menos 6 caracteres');
}

