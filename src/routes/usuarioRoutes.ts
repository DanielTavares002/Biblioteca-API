import { Router } from 'express';
import { usuarioController } from '../controllers/usuarioController';
import { validate } from '../middleware/validation';
import { UsuarioSchema } from '../types';

const router = Router();

router.get('/', usuarioController.listarUsuarios);
router.get('/:id', usuarioController.obterUsuario);
router.post('/', validate({ body: UsuarioSchema }), usuarioController.criarUsuario);

export default router;
