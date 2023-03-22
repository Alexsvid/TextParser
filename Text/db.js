const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'text_processing',
    'postgres',
    'postgres1234',
    {
        host: 'localhost',
        port: '5433',
        dialect: 'postgres',
        logging: false
    }
)