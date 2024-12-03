const request = require('supertest');
const app = require('../app');
const prisma = require('../models/prismaClient');

let token;

beforeAll(async () => {
  await prisma.task.deleteMany(); // Limpa tarefas para testes.
  await prisma.user.deleteMany(); // Limpa usuários para testes.

  // Registra e loga o usuário para obter o token.
  await request(app).post('/api/auth/register').send({
    email: 'testuser@example.com',
    password: 'password123',
  });

  const response = await request(app).post('/api/auth/login').send({
    email: 'testuser@example.com',
    password: 'password123',
  });

  token = response.body.token;
});

describe('Task Management Tests', () => {
  test('Create a new task', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Task' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('title', 'Test Task');
  });

  test('Get tasks for the user', async () => {
    const response = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('Update a task', async () => {
    const task = await prisma.task.findFirst();
    const response = await request(app)
      .put(`/api/tasks/${task.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Task', completed: true });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title', 'Updated Task');
    expect(response.body).toHaveProperty('completed', true);
  });

  test('Delete a task', async () => {
    const task = await prisma.task.findFirst();
    const response = await request(app)
      .delete(`/api/tasks/${task.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Task deleted successfully.');
  });
});
