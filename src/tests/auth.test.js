const request = require('supertest');
const app = require('../app');
const prisma = require('../models/prismaClient');

describe('Auth Endpoints', () => {
  beforeAll(async () => {
    await prisma.users.deleteMany(); // Limpa os usuários antes dos testes
  });

  afterAll(async () => {
    await prisma.$disconnect(); // Fecha a conexão com o banco
  });

  it('Should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'testuser1',
      password: 'password123',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.user).toHaveProperty('username', 'testuser1');
  });

  it('Should not register a user with existing username', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'testuser1', // Mesmo username para causar o erro
      password: 'password123',
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Could not create user.');
  });

  it('Should login with correct credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      username: 'testuser1',
      password: 'password123',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('Should not login with incorrect credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      username: 'testuser1',
      password: 'wrongpassword',
    });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error', 'Invalid credentials.');
  });
});