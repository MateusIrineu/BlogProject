import EnderecoModel from "../models/endereco.model";

class EnderecoController {
    static async criar(req, res) {
        try {
            const { user_id, cep, numero } = req.body;

            if (!user_id || !cep || !numero) {
                return res.status(400).json({ message: 'Erro do cliente.' })
            }

            const endereco = await EnderecoModel.create({ user_id, cep, numero });
            res.status(201).json({ message: 'Endereço criado com sucesso!', endereco: endereco })

        } catch (error) {
            res.status(500).json({ message: 'Erro interno do servidor. Por favor, tente mais tarde', erro: error.message });
        }
    }
}