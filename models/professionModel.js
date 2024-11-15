const { sql } = require('../config/db');

const Profession = {
  getAll: async (page = 1, pageSize = 10) => {
    const offset = (page - 1) * pageSize;
    try {
      const result = await sql.query`
        SELECT * FROM Professions
        ORDER BY ID
        OFFSET ${offset} ROWS FETCH NEXT ${pageSize} ROWS ONLY;
      `;
      return result.recordset;
    } catch (err) {
      throw new Error('Error fetching professions');
    }
  },
  create: async (workerId, profession, experience) => {
    try {
      await sql.query`
        INSERT INTO Professions (WorkerID, Profession, Experience)
        VALUES (${workerId}, ${profession}, ${experience});
      `;
    } catch (err) {
      throw new Error('Error creating profession');
    }
  },
  update: async (id, workerId, profession, experience) => {
    try {
      await sql.query`
        UPDATE Professions
        SET WorkerID = ${workerId}, Profession = ${profession}, Experience = ${experience}
        WHERE ID = ${id};
      `;
    } catch (err) {
      throw new Error('Error updating profession');
    }
  },
  delete: async (id) => {
    try {
      await sql.query`DELETE FROM Professions WHERE ID = ${id}`;
    } catch (err) {
      throw new Error('Error deleting profession');
    }
  }
};

module.exports = Profession;
