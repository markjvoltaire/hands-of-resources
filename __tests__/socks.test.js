const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Socks = require('../lib/models/Socks');

describe('handOfResources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create socks', async () => {
    const res = await request(app)
      .post('/api/v1/socks')
      .send({ kind: 'ankle sock', color: 'black' });

    expect(res.body).toEqual({
      id: expect.any(String),
      kind: 'ankle sock',
      color: 'black',
    });
  });

  it('should get all socks', async () => {
    const expected = await Socks.getAllSocks();
    const res = await request(app).get('/api/v1/socks');

    expect(res.body).toEqual(expected);
  });

  it('should get socks by id', async () => {
    const expected = await Socks.findById(1);

    const res = await request(app).get('/api/v1/socks/1');

    expect(res.body).toEqual(expected);
  });

  it('deletes a sock by id', async () => {
    const expected = await Socks.createSocks({
      kind: 'medium',
      color: 'black',
    });

    const res = await request(app).delete(`/api/v1/socks/${expected.id}`);

    expect(expected).not.toContain(res.body);
  });

  it('should update socks', async () => {
    const expected = await Socks.updateSocks(1, { color: 'lime' });

    const response = await request(app)
      .patch('/api/v1/socks/1')
      .send({ color: 'lime' });

    expect(response.body).toEqual({ id: expect.any(String), ...expected });
  });
});
