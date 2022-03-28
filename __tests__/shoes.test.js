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

  it('should get shoes by id', async () => {
    const expected = await Shoes.findById(1);

    const res = await request(app).get('/api/v1/shoes/1');

    expect(res.body).toEqual(expected);
  });

  it('should update a shoe', async () => {
    const expected = await Shoes.updateShoes(1, { color: 'lime' });
    console.log('expected', expected);

    const resp = await request(app)
      .patch('/api/v1/shoes/1')
      .send({ color: 'lime' });

    expect(resp.body).toEqual(expected);
  });

  it('deletes a shoe by id', async () => {
    const expected = await Shoes.createShoes({
      kind: 'jordans',
      color: 'red',
    });

    console.log('expected', expected);
    const res = await request(app).delete(`/api/v1/shoes/${expected.id}`);

    expect(expected).not.toContain(res.body);
  });
});
