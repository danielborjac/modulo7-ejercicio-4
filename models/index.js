const { Sequelize } = require('sequelize');
require('dotenv').config();

// Base de datos diferente si es entorno de pruebas
const dbName =
  process.env.NODE_ENV === 'test'
    ? process.env.DB_NAME_TEST || 'secure_tasks_test'
    : process.env.DB_NAME;

const sequelize = new Sequelize(
  dbName,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

// Importar modelos y pasar la instancia sequelize
const User = require('./user')(sequelize);
const Task = require('./task')(sequelize);

// Relaciones
User.hasMany(Task, { onDelete: 'CASCADE' });
Task.belongsTo(User);

module.exports = {
  sequelize,
  User,
  Task,
};