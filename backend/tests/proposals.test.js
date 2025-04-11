const request = require('supertest');
const express = require('express');
const proposals = require('../src/api/proposals');

const app = express();
app.use(express.json());
app.use('/api/proposals', proposals);

describe('Proposals API', () => {
  it('GET /api/proposals should return 200 and array', async () => {
    const res = await request(app).get('/api/proposals');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/proposals should fail with missing fields', async () => {
    const res = await request(app).post('/api/proposals').send({});
    expect(res.statusCode).toBe(400);
  });
});
