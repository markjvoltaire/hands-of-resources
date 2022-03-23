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

  it('should create a shoe', async () => {
    const res = await request(app)
      .post('/api/v1/shoes')
      .send({ kind: 'nike', color: 'blue' });

    console.log('res', res.body);

    expect(res.body).toEqual({
      id: expect.any(String),
      kind: 'nike',
      color: 'blue',
    });
  });
});
