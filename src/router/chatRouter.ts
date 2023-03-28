import {Router} from 'express'
import path from 'path';

export const routerChat: Router = Router();

routerChat.get('/', (req, res) => {
    res.render("templateChat", {username: req.user?.name});
})

routerChat.get('/temple', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../../src/views/chat.hbs" ));
})