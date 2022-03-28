const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Hat = require('../lib/models/Hats');
const hats = require('../lib/controllers/hats');

describe('handOfResources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create a hat', async () => {
    //request(app) is sending a request to our app
    const res = await request(app)
      .post('/api/v1/hats')
      .send({ kind: 'snapback', color: 'red' });

    expect(res.body).toEqual({
      id: expect.any(String),
      kind: 'snapback',
      color: 'red',
    });
  });

  it('should get all hats', async () => {
    const expected = await Hat.getAllHats();
    const res = await request(app).get('/api/v1/hats');

    expect(res.body).toEqual(expected);
  });

  it('should get hat by id', async () => {
    const expected = await Hat.getById(1);
    const res = await request(app).get(`/api/v1/hats/${expected.id}`);

    expect(res.body).toEqual(expected);
  });

  it('should update hat', async () => {
    const expected = await Hat.updateHat(1, { color: 'red' });

    const response = await request(app)
      .patch('/api/v1/hats/1')
      .send({ color: 'red' });

    expect(response.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('deletes a hat by id', async () => {
    const expected = await Hat.createHat({
      kind: 'dad hat',
      color: 'white',
    });

    const res = await request(app).delete(`/api/v1/hats/${expected.id}`);

    expect(expected).not.toContain(res.body);
  });
});
