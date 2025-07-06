const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
    });
  });
} else {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
  });
}