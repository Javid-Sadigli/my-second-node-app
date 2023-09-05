const Sequelize = require('sequelize');
const sequelize_database = require('../data/database');

const Card = sequelize_database.define('card', {
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    }
});

module.exports = Card;