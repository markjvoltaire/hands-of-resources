const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Shirts = require('../lib/models/Shirts');
const shirts = require('../lib/controllers/shirts');

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
    const expected = await Shirts.findById(1);

    const res = await request(app).get(`/api/v1/shirts/1`);
    console.log('res', res.body);

    expect(res.body).toEqual(expected);
  });

  it('should update a shirt', async () => {
    const expected = await Shirts.updateShirt(1, { color: 'green' });

    const res = await request(app)
      .patch('/api/v1/shirts/1')
      .send({ color: 'green' });

    console.log('res.body', res.body);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('deletes a shirt by id', async () => {
    const expected = await Shirts.createShirts({
      kind: 'polo',
      color: 'red',
    });

    console.log('expected', expected);
    const res = await request(app).delete(`/api/v1/shirts/${expected.id}`);

    expect(expected).not.toContain(res.body);
  });
});
