import { Router } from 'express';
import tokenController from '../controllers/TokenController';

const router = new Router();

// Logar Usuário
// enviar o seguinte JSON
// {
//     "email": "joao@gmail.com",
//     "password": "123456"
// }
router.post('/', tokenController.store);

export default router;
