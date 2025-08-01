import { DataTypes } from "sequelize";
import sequelize from "../../../config/database";

const EnderecoModel = sequelize.define(
    "Address",
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

        rua: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: {
                    args: 150,
                    msg: 'A rua deve ter no máximo 150 caracteres'
                }
            }
        },

        numero: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: {
                    args: 10,
                    msg: 'O número deve ter no máximo 10 carcteres'
                }
            }
        },

        bairro: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: {
                    args: 100,
                    msg: 'A cidade deve ter no máximo 100 caracteres'
                }
            }
        },

        cidade: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: {
                    args: 100,
                    msg: 'A cidade deve ter no máximo 100 caracteres'

                }
            },

        estado: {
            type: DataTypes.STRING,
            allowNull: false,
            max: 2,
            }
        },

        cep: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                 is: /^\d{5}?\d{3}$/,
                 msg: 'O CEP deve ser no formato "00000000", sem hífens ou espaços'
            }
        }
    },

    {
        tableName: 'Address',
        createdAt: 'Created_at',
        updatedAt: 'Updated_at',
        deletedAt: 'Deleted_at', 
    }
);

export default EnderecoModel;