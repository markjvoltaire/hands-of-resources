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
};
