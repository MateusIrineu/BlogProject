import sequelize from '../../../config/database.js';
import { DataTypes } from 'sequelize';

const UserModel = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            validade: {
                len: {
                    args: [2, 100],
                    msg: 'Your user might have between 2 and 100 characters.'
                }, 
                notEmpty: {
                    msg: 'The field "name" might be filled!'
                },
                is: {
                    args: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s]+$/,
                    msg: 'The name can not have special characters.'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validade: {
                isEmail: {
                    msg: 'Email might have the respective format: myemail@example.com.',
                    notEmpty: {
                        msg: 'The e-mail might be filled.'
                    }
                }
            }
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'The password mught be filled.'
                } 
            }
        },
        foto_perfil: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: {
                    msg: 'Your URL might be valid.'
                }
            }
        },

    },

    {
        tableName: 'User',
        createdAt: 'Created_at',
        updatedAt: 'Updated_at'
    }
);

export default UserModel;