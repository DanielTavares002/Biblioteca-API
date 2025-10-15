import { Router } from 'express';
import { emprestimoController } from '../controllers/emprestimoController';
import { validate } from '../middleware/validation';
import { EmprestimoSchema } from '../types';

const router = Router();

router.get('/', emprestimoController.listarEmprestimos);
router.post('/', validate({ body: EmprestimoSchema }), emprestimoController.realizarEmprestimo);
router.patch('/:id/devolver', emprestimoController.devolverLivro);

export default router;
