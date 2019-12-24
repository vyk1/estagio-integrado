const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();

const server = require('http').Server(app);

mongoose.connect('mongodb+srv://developer:developer@cluster0-dqw7t.mongodb.net/eiDB', {
     useNewUrlParser: true,
     useUnifiedTopology: true
})
mongoose.connection.on('connected', function () {
  console.log('Conectou');
});

app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))

app.use(require('./routes'))

server.listen(4444);