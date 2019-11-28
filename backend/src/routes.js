const express = require('express')
const multer = require('multer');
const uploadsConfig = require('./config/upload');
const upload = multer(uploadsConfig);
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const routes = new express.Router();

const withAuth = require('./middleware/auth')
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

// retorna todos os estágios associados aquele user
routes.get('/internship/user/:id_user', jsonParser, InternshipController.getInternshipsByUserId);
// retorna todos os alunos associados ao user
routes.get('/internship/user/:id_dvisor/students', jsonParser, InternshipController.getStudentsRelated)
routes.get('/internship/user/:id_user/contacts/:tipo', jsonParser, InternshipController.getContacts);
routes.get('/internship/user/:id_student/:id_dvisor', jsonParser, InternshipController.internshipsByStudentAndDvisorId);


routes.get('/activity', jsonParser, ActivityController.index);
routes.post('/activity', upload.single('image'), ActivityController.store2);

routes.post('/activity/noimg', jsonParser, ActivityController.storeWithNoImage);
routes.put('/activity/:id', jsonParser, ActivityController.update);
// routes.get('/activity/teste', jsonParser, ActivityController.checkActivityDate);
// mongodb+srv://developer:<password>@cluster0-dqw7t.mongodb.net/test?retryWrites=true&w=majority


routes.post('/upload', upload.single('image'), (req, res, next) => {
     console.log('file', req.file)
     console.log('body', req.body)
     res.status(200).json({
          message: 'success!',
     })
})

routes.post('/user/register', jsonParser, UserController.store);
routes.post('/user/auth', jsonParser, UserController.auth);
routes.post('/user/admin/auth', jsonParser, UserController.authAdmin);
// routes.post('/user/forgot', jsonParser, UserController.recovery);
routes.post('/user/resetpassword', jsonParser, UserController.reset);

routes.get('/user/checkToken', withAuth, (req, res) => {
     return res.status(200).send("Olá")
})

// USERS PARA O ADMIN!
routes.get('/users', jsonParser, UserController.index);
routes.get('/users/notVerified', jsonParser, UserController.notVerified);
routes.get('/user/:id', jsonParser, UserController.getById);
routes.get('/users/:type', withAuth, jsonParser, UserController.getByType)
routes.delete('/user', jsonParser, UserController.remove);
routes.post('/user/accept', jsonParser, UserController.accept);

module.exports = routes;