const pool = require('../utils/pool');
const shoes = require('../controllers/shoes');

module.exports = class Shoes {
  id;
  kind;
  color;

  constructor(row) {
    this.id = row.id;
    this.kind = row.kind;
    this.color = row.color;
  }
  static async createShoes({ kind, color }) {
    const { rows } = await pool.query(
      'INSERT INTO shoes (kind, color) VALUES ($1, $2) RETURNING *;',
      [kind, color]
    );
    return new Shoes(rows[0]);
  }

  static async getAllShoes() {
    const { rows } = await pool.query(`
    SELECT
    *
    FROM
    shoes`);
    return rows.map((row) => new Shoes(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
      SELECT
      *
      FROM
      shoes
      WHERE
      id=$1
      `,
      [id]
    );
    return new Shoes(rows[0]);
  }

  static async updateShoes(id, attributes) {
    const oldShoe = await Shoes.findById(id);
    const { kind, color } = { ...oldShoe, ...attributes };
    const { rows } = await pool.query(
      `
      UPDATE
      shoes
      SET
      kind = $2, color = $3
      WHERE
      id=$1
      RETURNING
      *
      `,
      [id, kind, color]
    );
    return new Shoes(rows[0]);
  }
};
