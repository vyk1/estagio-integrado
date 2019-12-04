const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser')
// const port = process.env.PORT || 4444
const app = express();

const server = require('http').Server(app);

mongoose.connect('mongodb+srv://developer:developer@cluster0-dqw7t.mongodb.net/eiDB', {
     useNewUrlParser: true,
}).finally(() => {
     console.log("conectado");
});

//habilita o cors
app.use(cors());
app.use(cookieParser());

// const corsOptions = {
//      origin: 'http://localhost:4444'
// }
// app.use(cors(corsOptions))

//alias para o caminho relativo dos arquivos

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))

app.use(require('./routes'))

server.listen(4444);



