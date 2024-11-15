const Worker = require('../models/workerModel');

const getWorkers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  try {
    const workers = await Worker.getAll(page, pageSize);
    res.json(workers);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getWorkerById = async (req, res) => {
  const { id } = req.params;
  try {
    const worker = await Worker.getById(id);
    if (!worker) return res.status(404).send('Worker not found');
    res.json(worker);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const createWorker = async (req, res) => {
  const { name, telephone, sex } = req.body;
  try {
    await Worker.create(name, telephone, sex);
    res.status(201).send('Worker created successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateWorker = async (req, res) => {
  const { id } = req.params;
  const { name, telephone, sex } = req.body;
  try {
    await Worker.update(id, name, telephone, sex);
    res.send('Worker updated successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteWorker = async (req, res) => {
  const { id } = req.params;
  try {
    await Worker.delete(id);
    res.send('Worker deleted successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { getWorkers, getWorkerById, createWorker, updateWorker, deleteWorker };
