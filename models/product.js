const Sequelize = require('sequelize');
const sequelize_database = require('../data/database');

const Product = sequelize_database.define('product', {
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title : {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull : false
    },
    image_link : {
        type: Sequelize.TEXT,
        allowNull: false
    },
    description : Sequelize.TEXT
});

module.exports = Product;