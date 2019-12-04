const express = require('express')
const multer = require('multer');
const uploadsConfig = require('./config/upload');
const upload = multer(uploadsConfig);
const routes = new express.Router();
const withAuth = require('./middleware/auth')

const InternshipController = require('./controllers/InternshipController')
const ActivityController = require('./controllers/ActivityController')
const UserController = require('./controllers/UserController')

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();

// routes.get('/', (req, res) => {
//      // console.log(req);
//      return res.status(200).send({ status: 200, message: "Ei, DB" });

// })

routes.get('/internship', InternshipController.index);
routes.get('/internship/:id', InternshipController.getById);

routes.get('/internship/user/:id_user', withAuth, jsonParser, InternshipController.getInternshipsByUserId);
routes.get('/internship/user/:id_dvisor/students', withAuth, jsonParser, InternshipController.getStudentsRelated)
routes.get('/internship/user/:id_user/contacts/:tipo', withAuth, jsonParser, InternshipController.getContacts);
routes.get('/internship/user/:id_student/:id_dvisor', withAuth, jsonParser, InternshipController.internshipsByStudentAndDvisorId);

// post by user (student!)
routes.post('/activity', withAuth, upload.single('image'), ActivityController.store2);
routes.post('/activity/noimg', withAuth, jsonParser, ActivityController.storeWithNoImage);
routes.delete('/activity', withAuth, ActivityController.remove);
// made but not used
// routes.get('/activity',jsonParser, ActivityController.index);
// routes.put('/activity/:id', jsonParser, ActivityController.update);
// routes.post('/user/forgot', jsonParser, UserController.recovery);
// routes.put('/internship/:id', jsonParser, InternshipController.update);
// routes.delete('/internship/:id', jsonParser, InternshipController.remove);


// no need to tokenize
routes.get('/user/confirmation/:token/:email', jsonParser, UserController.emailConfirmation);
routes.post('/user/register', jsonParser, UserController.store);
routes.post('/user/auth', jsonParser, UserController.auth);
routes.post('/user/admin/auth', jsonParser, UserController.authAdmin);
routes.post('/user/resetpassword', jsonParser, UserController.reset);


//Admin routes!
routes.get('/users', withAuth, jsonParser, UserController.index);
routes.get('/users/notVerified', withAuth, jsonParser, UserController.notVerified);
routes.get('/user/:id', withAuth, jsonParser, UserController.getById);
routes.put('/user', withAuth, jsonParser, UserController.update);
routes.get('/users/:type', withAuth, jsonParser, UserController.getByType)
routes.post('/user/accept', withAuth, jsonParser, UserController.accept);
routes.post('/user/decline', withAuth, jsonParser, UserController.remove);
routes.post('/internship', withAuth, jsonParser, InternshipController.store);

module.exports = routes;