const pool = require('../utils/pool');
const pants = require('../controllers/pants');

module.exports = class Pants {
  id;
  kind;
  color;

  constructor(row) {
    this.id = row.id;
    this.kind = row.kind;
    this.color = row.color;
  }

  static async createPants({ kind, color }) {
    const { rows } = await pool.query(
      'INSERT INTO pants (kind, color) VALUES ($1, $2) RETURNING *;',
      [kind, color]
    );
    return new Pants(rows[0]);
  }

  static async getAllPants() {
    const { rows } = await pool.query(`
    SELECT
    *
    FROM
    pants`);
    return rows.map((row) => new Pants(row));
  }
};
