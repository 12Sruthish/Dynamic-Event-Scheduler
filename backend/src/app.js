const express = require('express');
const cors = require('cors');
const scheduleRouter = require('./routes/schedule');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/schedule', scheduleRouter);

app.get('/', (req, res) => res.send({ status: 'ok', service: 'des-backend' }));

module.exports = app;
