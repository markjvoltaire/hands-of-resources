const pool = require('../utils/pool');
const shirts = require('../controllers/shirts');

module.exports = class Shirts {
  id;
  kind;
  color;

  constructor(row) {
    this.id = row.id;
    this.kind = row.kind;
    this.color = row.color;
  }

  static async createShirts({ kind, color }) {
    const { rows } = await pool.query(
      'INSERT INTO shirts (kind, color) VALUES ($1, $2) RETURNING *;',
      [kind, color]
    );
    return new Shirts(rows[0]);
  }

  static async getAllShirts() {
    const { rows } = await pool.query(
      `
      SELECT
      *
      FROM
      shirts
      `
    );
    return rows.map((row) => new Shirts(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `SELECT
    *
    FROM
    shirts
    WHERE
    id=$1
    `,
      [id]
    );
    return new Shirts(rows[0]);
  }

  static async updateShirt(id, attributes) {
    const oldShirt = await Shirts.findById(id);
    const { kind, color } = { ...oldShirt, ...attributes };
    const { rows } = await pool.query(
      `
      UPDATE
      shirts
      SET
      kind = $2, color = $3
      WHERE
      id=$1
      RETURNING
      *
      `,
      [id, kind, color]
    );
    return new Shirts(rows[0]);
  }

  static async deleteShirts(id) {
    const { rows } = await pool.query(
      `
    DELETE FROM 
    shirts
    WHERE id=$1 
    RETURNING 
    *
    `,
      [id]
    );
    if (!rows[0]) return null;
    return new Shirts(rows[0]);
  }
};
