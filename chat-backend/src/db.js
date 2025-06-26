const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    port: process.env.POSTGRES_PORT,
    logging: false,
});

sequelize.authenticate()
  .then(() => console.log('Connected to POSTGRES'))
  .catch(err => console.error('DB Error:', err));

module.exports = sequelize;