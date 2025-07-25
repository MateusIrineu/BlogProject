import UserModel from "../models/user.model.js";

class UserController {
    static async cadastrar(req, res) {
        try {
            const { nome, email, senha, foto_perfil } = req.body;
            if(!nome || !email || !senha || !foto_perfil) {
                return res.status(400).json({ message: 'Erro do cliente.' })
            }

            const user = await UserModel.create({ nome, email, senha, foto_perfil })
        } catch (error) {
            res.status(201).json({ message: 'Usuário criado com sucesso!', user: user })
        }
    }
}