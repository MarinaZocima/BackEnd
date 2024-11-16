const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connect } = require('./config/db');
const workerRoutes = require('./routes/workerRoutes');
const professionRoutes = require('./routes/professionRoutes');

console.log('1');
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
console.log('2');
app.use(cors());
app.use(express.json());

connect();

app.use('/api/workers', workerRoutes);
app.use('/api/professions', professionRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
