const Sequelize = require('sequelize');

const sequelize = new Sequelize.Sequelize('myshop2', 'nodejs', 'password', {
    dialect : 'mysql', 
    host: 'localhost'
});

module.exports = sequelize;
