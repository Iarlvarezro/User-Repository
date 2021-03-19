import express from 'express';
import {UserController} from './controller/user-controller.js';

const PORT = 8080;
const app = express();

app.use(express.static('public'));

UserController.register(app);

app.listen(PORT, () => {
    console.log(`listening in http://localhost:${PORT}`);
});