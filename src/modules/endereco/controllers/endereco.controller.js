import axios from "axios";
import EnderecoModel from "../models/endereco.model";

class EnderecoController {
    static async criar(req, res) {
        try {
            const { user_id, cep, numero } = req.body;

            if (!user_id || !cep || !numero) {
                return res.status(400).json({ message: 'Erro do cliente.' })
            }

            let dados = {}
            if (cep) {
                 const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
                    if (resposta.data.erro) {
                    return res.status(400).json({ message: 'CEP inválido.' });
                }
                
                dados = {
                    cep,
                    rua: resposta.data.logradouro,
                    estado: resposta.data.uf,
                    cidade: resposta.data.localidade,
                    bairro: resposta.data.bairro
                }
            }
             
            if (numero) {
                dados.numero = numero
            }


            const endereco = await EnderecoModel.create({ user_id, cep, numero });
            res.status(201).json({ message: 'Endereço criado com sucesso!', endereco: endereco })

        } catch (error) {
            res.status(500).json({ message: 'Erro interno do servidor. Por favor, tente mais tarde', erro: error.message });
        }
    }
}