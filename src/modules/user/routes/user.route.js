import express from 'express'
import UserController from '../controllers/user.controller.js'
import PerfilController from '../../perfil/controllers/perfil.controller.js';

const router = express.Router()

// CADASTRAR 
router.post("/usuario/cadastrar", UserController.cadastrar);
router.post("/perfil/cadastrar", PerfilController.cadastrar);

// LISTAR USUÁRIO POR ID
router.get("/usuario/:id", UserController.listarPorId);
router.get("/perfil/:id", PerfilController.listarPerfil);

// LISTAR TODOS OS USUÁRIOS
router.get("/usuarios", UserController.ListarTodos);
router.get("/perfis", PerfilController.listarTodos);


// BUSCAR PERFIL POR USER ID
router.get("/perfil/user/:user_id", PerfilController.BuscarPerfilPorUserId);

// ATUALIZAR POR ID
router.patch("/usuario/atualizar/:id", UserController.atualizar);
router.patch("/perfil/atualizar/:id", PerfilController.atualizar);

// DELETAR POR ID
router.delete("/usuario/deletar/:id", UserController.deletarPorId);
router.delete("/perfil/deletar/:id", PerfilController.deletarPorId);

// DELETAR TODOS OS USUÁRIOS
router.delete("/usuarios/deletar", UserController.deletarTodos);

// TOTAL DE USUÁRIOS
router.get("/usuarios/total", UserController.totalUsuarios);

export default router;