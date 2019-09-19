const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

//cria inst do  servidor
const app = express();

//acessar o o http e websocket
const server = require('http').Server(app);
const io = require('socket.io')(server);

// mongoose.connect('mongodb+srv://developer:developer@cluster0-vca3f.mongodb.net/eiDB?retryWrites=true&w=majority', {
mongoose.connect('mongodb+srv://developer:developer@cluster0-dqw7t.mongodb.net/eiDB', {
     useNewUrlParser: true,
}).finally(() => {
     console.log("conectado");
});

//habilita o cors
app.use(cors());

//disponibilizar io para todo app
app.use((req, res, next) => {
     req.io = io;

     next();
})

//alias para o caminho relativo dos arquivos
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')))

app.use(require('./routes'))

// server.listen(3333);
server.listen(3333);



