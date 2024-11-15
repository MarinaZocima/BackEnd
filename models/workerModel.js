const { sql } = require('../config/db');

const Worker = {
  getAll: async (page = 1, pageSize = 10) => {
    const offset = (page - 1) * pageSize;
    try {
      const result = await sql.query`
        SELECT * FROM Workers
        ORDER BY ID
        OFFSET ${offset} ROWS FETCH NEXT ${pageSize} ROWS ONLY;
      `;
      return result.recordset;
    } catch (err) {
      throw new Error('Error fetching workers');
    }
  },
  getById: async (id) => {
    try {
      const result = await sql.query`SELECT * FROM Workers WHERE ID = ${id}`;
      return result.recordset[0];
    } catch (err) {
      throw new Error('Error fetching worker by ID');
    }
  },
  create: async (name, telephone, sex) => {
    try {
      await sql.query`
        INSERT INTO Workers (Name, Telephone, Sex)
        VALUES (${name}, ${telephone}, ${sex});
      `;
    } catch (err) {
      throw new Error('Error creating worker');
    }
  },
  update: async (id, name, telephone, sex) => {
    try {
      await sql.query`
        UPDATE Workers
        SET Name = ${name}, Telephone = ${telephone}, Sex = ${sex}
        WHERE ID = ${id};
      `;
    } catch (err) {
      throw new Error('Error updating worker');
    }
  },
  delete: async (id) => {
    try {
      await sql.query`DELETE FROM Workers WHERE ID = ${id}`;
    } catch (err) {
      throw new Error('Error deleting worker');
    }
  }
};

module.exports = Worker;
