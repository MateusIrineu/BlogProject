import bcrypt from 'bcryptjs';
import UserModel from "../models/user.model.js";

class UserController {
    static async cadastrar(req, res) {
        try {
            const { nome, email, senha, foto_perfil } = req.body;
            if(!nome || !email || !senha || !foto_perfil) {
                return res.status(400).json({ message: 'Erro do cliente.' })
            }

            const salt = await bcrypt.genSaltSync(10);
            const hash = await bcrypt.hash(senha, salt)

            const user = await UserModel.create({ nome, email, senha:hash, foto_perfil })
            res.status(201).json({ message: 'Usuário criado com sucesso!', user: user })

        } catch (error) {
            res.status(500).json({ message: 'Erro interno do servidor. Por favor, tente mais tarde', erro: error.message });
        }
    }
    
    static async listarPorId (req, res) {
        try {
            const id = (req.params.id)
            const user = await UserModel.findByPk(id)

            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' })
            }

            res.status(200).json(user)


        } catch (error) {
             res.status(500).json({ message: 'Erro interno do servidor. Por favor, tente mais tarde', erro: error.message })
        }
    }

    static async ListarTodos (req, res) {
        try {
            const usuarios = await UserModel.findAll()
            if (usuarios.length === 0) {
                res.status(200).json({ message: 'Nenhum usuário encontrado.' })
            }

            res.status(200).json(usuarios);

        } catch (error) {
            res.status(500).json({ message: 'Erro interno do servidor. Por favor, tente mais tarde', erro: error.message });
        }
    }


    static async atualizar (req, res) {
        try {
            const id = (req.params.id)
            const { nome, email, senha, foto_perfil } = req.body
            const user = await UserModel.update( { nome, email, senha, foto_perfil }, {where: { id } })

            if(!user || user.length === 0) {
                return res.status(404).json({ message: 'Usuário não encontrado' })
            }

            user.nome = nome || user.nome
            user.email = email || user.email
            user.senha = senha || user.senha
            user.foto_perfil = foto_perfil || user.foto_perfil

            res.status(200).json({ message: 'Usuário atualizado com sucesso!' })

        } catch (error) {
            res.status(500).json({ message: 'Erro interno do servidor. Por favor, tente mais tarde', erro: error.message })
        }
    }

    static async deletarPorId (req, res) {
        try {
            const id = (req.params.id)
            const user = await UserModel.destroy({ where: { id } })

            if(!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' })
            }

            res.status(200).json({ message: 'Usuário deletado com sucesso.' })

        } catch (error) {
            res.status(500).json({ message: 'Erro interno do servidor. Por favor, tente mais tarde', erro: error.message })
        }
    }

    static async deletarTodos (req, res) {
        try {
            await UserModel.destroy({ truncate: true })

            res.status(200).json({ message: 'Todos os usuários foram deletados com sucesso.' });

        } catch (error) {
            res.status(500).json({ message: 'Erro interno do servidor. Por favor, tente mais tarde', erro: error.message });
        }
    }

    static async totalUsuarios (req, res) {
        try {
            const total = await UserModel.count()
            res.status(200).json(total);

        } catch (error) {
            res.status(500).json({ message: 'Erro interno do servidor. Por favor, tente mais tarde', erro: error.message });
        }
    }
}

export default UserController;