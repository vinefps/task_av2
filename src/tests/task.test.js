const request = require('supertest');
const app = require('../app');
const prisma = require('../models/prismaClient');

describe('Task Endpoints', () => {
  let token;
  let userId;

  beforeAll(async () => {
    // Limpa o banco antes dos testes
    await prisma.tasks.deleteMany();
    await prisma.users.deleteMany();

    // Cria um usuário para os testes
    const res = await request(app).post('/api/auth/register').send({
      username: 'taskuser',
      password: 'password123',
    });

    userId = res.body.user.id; // Armazena o ID do usuário criado

    // Faz login para obter o token
    const loginRes = await request(app).post('/api/auth/login').send({
      username: 'taskuser',
      password: 'password123',
    });

    token = loginRes.body.token;
  });

  afterAll(async () => {
    await prisma.$disconnect(); // Fecha a conexão com o banco
  });

  it('Should create a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'My first task',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('title', 'My first task');
  });

  it('Should fetch all tasks for the user', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('Should update a task', async () => {
    // Cria uma tarefa para atualizar
    const task = await prisma.tasks.create({
      data: { title: 'Task to update', userId },
    });

    const res = await request(app)
      .put(`/api/tasks/${task.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated task',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('title', 'Updated task');
  });

  it('Should delete a task', async () => {
    // Cria uma tarefa para deletar
    const task = await prisma.tasks.create({
      data: { title: 'Task to delete', userId },
    });

    const res = await request(app)
      .delete(`/api/tasks/${task.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Task deleted successfully.');
  });
});