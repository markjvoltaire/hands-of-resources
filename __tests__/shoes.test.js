const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Shoes = require('../lib/models/Shoes');

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

    expect(res.body).toEqual({
      id: expect.any(String),
      kind: 'nike',
      color: 'blue',
    });
  });

  it('should get all shoes', async () => {
    const expected = await Shoes.getAllShoes();
    const res = await request(app).get('/api/v1/shoes');

    expect(res.body).toEqual(expected);
  });
});
