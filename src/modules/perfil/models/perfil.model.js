import { DataTypes } from 'sequelize';
import  sequelize  from '../../../config/database.js';

const PerfilModel = sequelize.define(
    "Profile",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            unique: true,
            references: {
                model: 'User',
                key: 'id'
            }
        },

        bio: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                len: {
                    args: [0, 500],
                    msg: "A bio deve ter entre 0 e 500 caracteres."
                }
            }
        },

        site_pessoal: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: {
                    msg: "O site pessoal deve ser uma URL válida."
                }
            }
        },

        data_nascimento: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            validate: {
                isBefore: {
                    args: new Date().toISOString().split('T')[0],
                    msg: "A data de nascimento deve ser uma data válida."
                }
            }
        }
    },

    {
        tableName: 'Profile',
        createdAt: 'Created_at',
        updatedAt: 'Updated_at'
    }
);

export default PerfilModel;