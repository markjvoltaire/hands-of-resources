const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Pants = require('../lib/models/Pants');
const pants = require('../lib/controllers/pants');

describe('handOfResources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create a pair of pants', async () => {
    const res = await request(app)
      .post('/api/v1/pants')
      .send({ kind: 'jeans', color: 'blue' });

    expect(res.body).toEqual({
      id: expect.any(String),
      kind: 'jeans',
      color: 'blue',
    });
  });

  it('should get all pants', async () => {
    const expected = await Pants.getAllPants();
    const res = await request(app).get('/api/v1/pants');

    expect(res.body).toEqual(expected);
  });

  it('should get pants by id', async () => {
    const expected = await Pants.getById(1);
    const res = await request(app).get(`/api/v1/pants/${expected.id}`);

    expect(res.body).toEqual(expected);
  });

  it('deletes a sock by id', async () => {
    const expected = await Pants.createPants({
      kind: 'tights',
      color: 'black',
    });

    const res = await request(app).delete(`/api/v1/pants/${expected.id}`);

    expect(expected).not.toContain(res.body);
  });

  it('should update a pair of pants', async () => {
    const expected = await Pants.updatePants(1, { color: 'blue' });

    const response = await request(app)
      .patch('/api/v1/pants/1')
      .send({ color: 'blue' });

    expect(response.body).toEqual({ id: expect.any(String), ...expected });
  });
});
