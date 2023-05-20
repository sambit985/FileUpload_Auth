const { Sequelize } = require('sequelize');

const createDB = new Sequelize('test-db', 'user', 'pass', {
    dialect: 'sqlite',
    host: './config/db.sqlite',
});

const connectDB = () => {
    createDB.sync().then(() => {
        console.log('Connected to db');
    }).catch((err) => {
        console.log('db connection fail', err);
    })
}

module.exports = { connectDB, createDB };