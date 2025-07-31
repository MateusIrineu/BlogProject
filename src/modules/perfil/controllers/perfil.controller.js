import PerfilModel from "../models/perfil.model.js";

class PerfilController {
    static async cadastrar(req, res) {
        try {
            const { user_id, bio, site_pessoal, data_nascimento } = req.body;

            if(!user_id || !bio || !site_pessoal || !data_nascimento) {
                return res.status(400).json({ message: 'Erro do cliente.' })
            }

            const profile = await PerfilModel.create({ user_id, bio, site_pessoal, data_nascimento })
            res.status(201).json({ message: 'Perfil criado com sucesso!', profile: profile })

        } catch (error) {
            res.status(500).json({ message: 'Erro interno do servidor. Por favor, tente mais tarde', erro: error.message });
        }
    }

    static async listarPerfil(req, res) {
        try {
            const id = (req.params.id)
            const profile = await PerfilModel.findByPk(id)

            if(!profile) {
                return res.status(404).json({ message: 'Perfil não encontrado' })
            }

            res.status(200).json(profile)
        } catch (error) {
            res.status(500).json({ message: 'Erro interno do servidor. Por favor, tente mais tarde', erro: error.message });
        }
    }

    static async listarTodos(req, res) {
        try {
            const profiles = await PerfilModel.findAll();

            if (profiles.length === 0) {
                return res.status(404).json({ message: 'Nenhum perfil encontrado.' });
            }

            res.status(200).json(profiles);

        } catch (error) {
            res.status(500).json({ message: 'Erro interno do servidor. Por favor, tente mais tarde', erro: error.message });
        }
    }

    static async BuscarPerfilPorUserId(req, res) {
        try {
            const user_id = (req.params.user_id);
            const profile = await PerfilModel.findOne({ where: { user_id } });

            if (!profile) {
                return res.status(404).json({ message: 'Perfil não encontrado para este usuário.' });
            }

            res.status(200).json(profile);

        } catch (error) {
            res.status(500).json({ message: 'Erro interno do servidor. Por favor, tente mais tarde', erro: error.message });
        }
    }

    static async atualizar(req, res) {
        try {
            
            const id = (req.params.id);
            const { bio, site_pessoal, data_nascimento } = req.body;
            const profile = await PerfilModel.update({ user_id, bio, site_pessoal, data_nascimento }, {where: { id } });

            if (!profile || profile.length === 0) {
                return res.status(404).json({ message: 'Perfil não encontrado' });
            }

            profile.bio = bio || profile.bio;
            profile.site_pessoal = site_pessoal || profile.site_pessoal;
            profile.data_nascimento = data_nascimento || profile.data_nascimento;

            res.status(200).json({ message: 'Perfil atualizado com sucesso!' });
            
        } catch (error) {
            res.status(500).json({ message: 'Erro interno do servidor. Por favor, tente mais tarde', erro: error.message });
        }

    }

    static async deletarPorId(req, res) {
        try {
            const id = (req.params.id);
            const profile = await PerfilModel.destroy({ where: { id } });

            if (!profile) {
                return res.status(404).json({ message: 'Perfil não encontrado' });
            };

            res.status(200).json({ message: 'Perfil deletado com sucesso!' });

        } catch (error) {
            res.status(500).json({ message: 'Erro interno do servidor. Por favor, tente mais tarde', erro: error.message });
        }
    }
}

export default PerfilController;
// post - criar perfil OK
// get - listar perfil por id OK
// get - listar todos os perfis OK
// get - buscar perfil id de usuario user_id OK
// put - atualizar perfil OK
// delete - deletar perfil por id OK