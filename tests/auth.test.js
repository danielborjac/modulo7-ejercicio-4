const request = require('supertest');
const app = require('../app');
const { sequelize, User } = require('../models');

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Limpia DB de pruebas
});

afterAll(async () => {
  await sequelize.close();
});

describe('Auth: Register & Login', () => {
  const userData = { username: 'testuser', password: 'testpass123' };

  test('Debe registrar un nuevo usuario', async () => {
    const res = await request(app).post('/api/register').send(userData);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  test('No debe registrar si el usuario ya existe', async () => {
    const res = await request(app).post('/api/register').send(userData);
    expect(res.statusCode).toBe(400);
  });

  test('Debe permitir login con credenciales válidas', async () => {
    const res = await request(app).post('/api/login').send(userData);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  test('No debe permitir login con credenciales inválidas', async () => {
    const res = await request(app).post('/api/login').send({
      username: 'testuser',
      password: 'wrongpass',
    });
    expect(res.statusCode).toBe(400);
  });
});