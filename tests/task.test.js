const request = require('supertest');
const app = require('../app');
const { sequelize, Task } = require('../models');

let token;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  // Crear usuario y obtener token
  const res = await request(app).post('/api/register').send({
    username: 'tester',
    password: '123456',
  });
  token = res.body.token;
});

afterAll(async () => {
  await sequelize.close();
});

describe('CRUD de tareas', () => {
  let taskId;

  test('Debe crear una tarea', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Tarea 1' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    taskId = res.body.id;
  });

  test('Debe obtener las tareas del usuario', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  test('Debe actualizar una tarea', async () => {
    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Tarea actualizada', completed: true });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Tarea actualizada');
    expect(res.body.completed).toBe(true);
  });

  test('Debe eliminar una tarea', async () => {
    const res = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Tarea eliminada');
  });
});