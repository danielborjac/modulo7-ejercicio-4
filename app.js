
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const helmet = require('helmet');
const sanitize = require('./middlewares/sanitizeMiddleware');
const express = require('express');
const cors = require('cors');
const sanitizeBody = require('./middlewares/sanitizeMiddleware.js');
const app = express();

// Configurar CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Sanitización y validación de entradas
app.use(sanitizeBody);

// Middleware de seguridad
app.use(helmet());
app.use(express.json());
app.use(sanitize);

// Rutas
app.use('/api', authRoutes);
app.use('/api', taskRoutes);

// Conexión a la base de datos (solo si no está en test)
if (process.env.NODE_ENV !== 'test') {
  sequelize
    .authenticate()
    .then(() => {
      console.log('✅ Conexión establecida a la base de datos');
    })
    .catch((err) => {
      console.error('❌ Error de conexión a la base de datos:', err);
    });
}

module.exports = app;