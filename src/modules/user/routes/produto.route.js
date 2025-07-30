import express from 'express'
import UserController from '../controllers/user.controller.js'

const router = express.Router()

// CADASTRAR USUÁRIO
router.post("/usuario/cadastrar", UserController.cadastrar);

// LISTAR USUÁRIO POR ID
router.get("/usuario/:id", UserController.listarPorId);

// LISTAR TODOS OS USUÁRIOS
router.get("/usuarios", UserController.ListarTodos);

// ATUALIZAR USUÁRIO POR ID
router.patch("/usuario/atualizar/:id", UserController.atualizar);

// DELETAR USUÁRIO POR ID
router.delete("/usuario/deletar/:id", UserController.deletarPorId);

// DELETAR TODOS OS USUÁRIOS
router.delete("/usuarios/deletar", UserController.deletarTodos);

// TOTAL DE USUÁRIOS
router.get("/usuarios/total", UserController.totalUsuarios);

export default router;