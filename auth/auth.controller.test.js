import request from 'supertest';
import app from '../app';

describe('POST /api/register', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('username', 'testuser');
  });
});