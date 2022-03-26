const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Shirts = require('../lib/models/Shirts');

describe('handOfResources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create a shirt', async () => {
    const res = await request(app)
      .post('/api/v1/shirts')
      .send({ kind: 'long sleeve', color: 'red' });

    expect(res.body).toEqual({
      id: expect.any(String),
      kind: 'long sleeve',
      color: 'red',
    });
  });

  it('should get all shirts', async () => {
    const expected = await Shirts.getAllShirts();
    const res = await request(app).get('/api/v1/shirts');

    expect(res.body).toEqual(expected);
  });

  it('should get a shirt by id', async () => {
    const expected = await Shirts.findById(2);

    const res = await request(app).get(`/api/v1/shirts/2`);
    console.log('res', res.body);

    expect(res.body).toEqual(expected);
  });
});
