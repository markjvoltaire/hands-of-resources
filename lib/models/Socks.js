const pool = require('../utils/pool');
const socks = require('../controllers/socks');

module.exports = class Socks {
  id;
  kind;
  color;

  constructor(row) {
    this.id = row.id;
    this.kind = row.kind;
    this.color = row.color;
  }

  static async createSocks({ kind, color }) {
    const { rows } = await pool.query(
      'INSERT INTO socks (kind, color) VALUES ($1, $2) RETURNING *;',
      [kind, color]
    );
    return new Socks(rows[0]);
  }
};
