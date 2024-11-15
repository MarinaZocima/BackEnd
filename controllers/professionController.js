const Profession = require('../models/professionModel');

const getProfessions = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  try {
    const professions = await Profession.getAll(page, pageSize);
    res.json(professions);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const createProfession = async (req, res) => {
  const { workerId, profession, experience } = req.body;
  try {
    await Profession.create(workerId, profession, experience);
    res.status(201).send('Profession created successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateProfession = async (req, res) => {
  const { id } = req.params;
  const { workerId, profession, experience } = req.body;
  try {
    await Profession.update(id, workerId, profession, experience);
    res.send('Profession updated successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteProfession = async (req, res) => {
  const { id } = req.params;
  try {
    await Profession.delete(id);
    res.send('Profession deleted successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { getProfessions, createProfession, updateProfession, deleteProfession };
