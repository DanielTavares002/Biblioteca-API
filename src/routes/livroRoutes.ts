import { Router } from 'express';
import { livroController } from '../controllers/livroController';
import { validate } from '../middleware/validation';
import { LivroCreateSchema } from '../types';

const router = Router();

router.get('/', livroController.listarLivros);
router.get('/:id', livroController.obterLivro);
router.post('/', validate({ body: LivroCreateSchema }), livroController.criarLivro);
router.put('/:id', validate({ body: LivroCreateSchema.partial() }), livroController.atualizarLivro);
router.delete('/:id', livroController.excluirLivro);

export default router;
