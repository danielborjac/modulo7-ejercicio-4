process.env.NODE_ENV = 'test';
require('dotenv').config();

const { sequelize } = require('../models');

module.exports = async () => {
  try {
    // Forzar sincronización para crear las tablas
    await sequelize.sync({ force: true });
    console.log('🧪 Base de datos de pruebas sincronizada');
  } catch (err) {
    console.error('❌ Error al sincronizar la base de datos de pruebas:', err);
  }
};