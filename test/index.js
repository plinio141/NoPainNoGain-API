import app from './app';
import request from 'supertest';

describe('Test the index', () => {
    test('It should response the login', async () => {
        const response = await request(app)
            .post('/api/login')
            .send({email: 'admin@admin.com', password: 'admin123'});
        expect(response.status).toBe(true);
    });
})