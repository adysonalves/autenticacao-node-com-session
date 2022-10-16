const {Sequelize, sequelize} = require('../database/conexao');

const User = sequelize.define('Usuario', {
    user:{
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true
    },
    passwd:{
        type: Sequelize.STRING(6),
        allowNull: false
    },
},
{
    timestamps: false
}
);

module.exports = User;