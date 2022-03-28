const pool = require('../utils/pool');
const hats = require('../controllers/hats');

module.exports = class Hat {
  id;
  kind;
  color;

  constructor(row) {
    this.id = row.id;
    this.kind = row.kind;
    this.color = row.color;
  }

  static async createHat({ kind, color }) {
    const { rows } = await pool.query(
      'INSERT INTO hats (kind, color) VALUES ($1, $2) RETURNING *;',
      [kind, color]
    );
    return new Hat(rows[0]);
  }

  static async getAllHats() {
    const { rows } = await pool.query(`
    SELECT
    *
    FROM
    hats`);
    return rows.map((row) => new Hat(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT
      *
      FROM
      hats
      WHERE
      id=$1
      `,
      [id]
    );
    return new Hat(rows[0]);
  }

  static async updateHat(id, attributes) {
    const existingHat = await Hat.getById(id);
    const { kind, color } = { ...existingHat, ...attributes };
    const { rows } = await pool.query(
      `
    UPDATE
    hats
    SET
    kind = $2, color = $3
    WHERE
    id=$1
    RETURNING
    *
    `,
      [id, kind, color]
    );
    return new Hat(rows[0]);
  }

  static async deleteHat(id) {
    const { rows } = await pool.query(
      `
    DELETE FROM 
    hats 
    WHERE id=$1 
    RETURNING 
    *
    `,
      [id]
    );
    if (!rows[0]) return null;
    return new Hat(rows[0]);
  }
};
