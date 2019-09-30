const express = require('express')
const multer = require('multer');
const uploadsConfig = require('./config/upload');

const routes = new express.Router();
const upload = multer(uploadsConfig);

// Implementar tokens! no final!
// const authMiddleware = require('./middleware/auth');

const InternshipController = require('./controllers/InternshipController')
const ActivityController = require('./controllers/ActivityController')
const UserController = require('./controllers/UserController')


var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();

routes.get('/', (req, res) => {
     // console.log(req);
     return res.status(200).send({ status: 200, message: "Ei, DB" });

})

routes.get('/internship', InternshipController.index);
routes.get('/internship/:id', InternshipController.getById);
routes.post('/internship', jsonParser, InternshipController.store);
routes.put('/internship/:id', jsonParser, InternshipController.update);
routes.delete('/internship/:id', jsonParser, InternshipController.remove);

// tela estudante
// registrar atv - post activity
// relatorio geral - get internship by user (1 estagio por aluno ou mais?)
// chat - get users where users.int = user.int

// tela orientador
// ver relatorio dos estagiarios - get internship where int.id_advisor = id_advisor
// ->show by name
// chat - get users where users.int = user.int

// tela supervisor
// ver relatorio dos estagiarios - get internship where int.id_supervisor = id_supervisor
// ->show by name
// chat - get users where users.int = user.int

// ADENDO:
// 0 ADMIN
// 1 ESTUDANTE
// 2 ORIENTADOR
// 3 SUPERVISOR

// estudante1
// supervisor1
// ...

// retorna todos os estágios associados aquele user
routes.get('/internship/user/:id_user', jsonParser, InternshipController.getInternshipsByUserId);
// retorna todos os alunos associados ao user
routes.get('/internship/user/:id_dvisor/students', jsonParser, InternshipController.getStudentsRelated)
routes.get('/internship/user/:id_user/contacts/:tipo', jsonParser, InternshipController.getContacts);
routes.get('/internship/user/:id_student/:id_dvisor', jsonParser, InternshipController.internshipsByStudentAndDvisorId);


routes.get('/activity', jsonParser, ActivityController.index);
routes.post('/activity', upload.single('image'), ActivityController.store);
routes.put('/activity/:id', jsonParser, ActivityController.update);



//get para where tipo = students 
// ou
// get para trazer tipo de um user
routes.get('/user', jsonParser, UserController.index);
routes.post('/user/register', jsonParser, UserController.store);
routes.post('/user/auth', jsonParser, UserController.auth);
routes.post('/user/forgot', jsonParser, UserController.recovery);
routes.post('/user/resetpassword', jsonParser, UserController.reset);

module.exports = routes;