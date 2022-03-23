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

  it('should create socks', async () => {
    const res = await request(app)
      .post('/api/v1/socks')
      .send({ kind: 'ankle sock', color: 'black' });

    console.log('res', res.body);

    expect(res.body).toEqual({
      id: expect.any(String),
      kind: 'ankle sock',
      color: 'black',
    });
  });
});
