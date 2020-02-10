const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();

const server = require('http').Server(app);
try {
  mongoose.connect('mongodb://estagiointegra01:developer2020@mongo71-farm76.kinghost.net/estagiointegra01', {
  // mongoose.connect('mongodb+srv://developer:developer@cluster0-dqw7t.mongodb.net/eiDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  mongoose.connection.on('connected', function () {
    console.log('Conectou');
  });

} catch (error) {
  console.log(error);
  throw new Error('Erro na Conexão com o Banco de Dados.')
}

app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))

app.use(require('./routes'))

server.listen(21089);
