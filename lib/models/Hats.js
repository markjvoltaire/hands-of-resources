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
};
