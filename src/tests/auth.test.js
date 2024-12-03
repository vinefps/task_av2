const request = require('supertest');
const app = require('../app');
const prisma = require('../models/prismaClient');

beforeAll(async () => {
  await prisma.user.deleteMany(); // Limpa usuários para testes.
});

describe('Authentication Tests', () => {
  test('Register a new user', async () => {
    const response = await request(app).post('/api/auth/register').send({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(response.status).toBe(201);
    expect(response.body.user).toHaveProperty('email', 'test@example.com');
  });

  test('Login with valid credentials', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  test('Login with invalid credentials', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'wrongpassword',
    });
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error', 'Invalid credentials.');
  });
});
