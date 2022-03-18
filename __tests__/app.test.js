const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('handOfResources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create a hat', async () => {
    const res = await request(app)
      .post('/api/v1/hats')
      .send({ kind: 'snapback', color: 'red' });

    expect(res.body).toEqual({
      id: expect.any(String),
      kind: 'snapback',
      color: 'red',
    });
  });
});
