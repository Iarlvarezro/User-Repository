import { UserService } from '../domain/user-service.js';
import { SessionService } from '../domain/session_service.js'
import { Context } from '../infrastructure/context.js';
import { BadRequestError, NotFoundError } from '../util/errors.js';
import { jwt } from '../util/jwt.js'

export class UserApplication {
    _context = new Context();
    async register(userRegisterDTO) {
        let user = UserService.create(userRegisterDTO);
        const { email } = user;
        const userEmail = await this._context.userRepository.findByEmail(email)
        if (userEmail) {
            throw new BadRequestError('El usuario ya existe');
        }
        await this._context.userRepository.add(user);
        return this.createSession(user)
    }
    async login(userlogin) {
        const { email, password } = userlogin;
        const user = await this._context.userRepository.findByEmail(email)
        if (!user) {
            throw new NotFoundError('El usuario no existe');
        }
        const isCorrectPassword = UserService.isCorrectPassword(password, user.password);
        if (!isCorrectPassword) {
            throw new BadRequestError('Usuario/contraseña incorrecta');
        }
        return this.createSession(user);
    }
    async loginGoogle(userlogin) {
        const { email } = userlogin;
        userlogin.provider = "Google"
        let user = await this._context.userRepository.findByEmail(email)
        if (!user) {
            user = UserService.create(userlogin);
            await this._context.userRepository.add(user);
            return this.createSession(user);
        }
        const { provider } = user
        if (provider !== "Google") {
            throw new BadRequestError('El usuario ya existe');
        }
        return this.createSession(user)
    }
    async createSession(user) {
        const { name, email, surname, role } = user;
        const access_token = await jwt.sign({
            name,
            email,
            surname,
            role
        }, process.env.JWT_SECRET, { algorithm: 'HS256' })
        const session = SessionService.create({
            name,
            email,
            surname,
            role,
            access_token
        });
        await this._context.sessionRepostory.add(session);
        return session;
    }
    dispose() {
        this._context.dispose();
    }
}