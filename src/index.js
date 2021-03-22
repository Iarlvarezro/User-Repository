import express from 'express';
import {UserController} from './controller/user-controller.js';
import {register} from './controller/session_controller.js'
import cors from 'cors'
const PORT = 8083;
const app = express();

app.use(express.static('public'));
app.use(express.json())
app.use(cors())

UserController.register(app);
register(app);
app.listen(PORT, () => {
    console.log(`listening in http://localhost:${PORT}`);
});