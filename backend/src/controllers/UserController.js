const User = require('../models/User');
const Internship = require('../models/Internship');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const authConfig = require('../config/auth');

const mailer = require('../modules/mailer');

const crypto = require('crypto');

function generateToken(params = {}) {
     return jwt.sign(params, authConfig.secret, { expiresIn: 86400 })
}

// convenção:
// header apenas para auth do user bem como seu id
// body faço as reqs de mudança
module.exports = {
     async accept(req, res) {
          const { id } = req.body;
          console.log(id);
          
          await User.findOneAndUpdate({ '_id': id }, { verified: true }, { new: true, useFindAndModify: false }, (err, doc) => {
               console.log('====================================');
               console.log('====================================');
               if (err) {
                    console.log(err);
                    return res.status(500).send(err);
               } else {
                    if (doc) {
                         // se new é true traz doc updateado
                         // dá pra por na url e direcionar!
                         return res.status(200).send({ status: 200, message: 'Usuário aceito com sucesso!' })
                    } else {
                         console.log(err);
                         return res.status(400).send({ status: 400, message: "Erro na operação." });
                    }
               }
          })
     },
     async remove(req, res) {
          const { id } = req.body;
          await User.findByIdAndDelete(id, (err, doc) => {
               if (err) {
                    console.log(err);
                    return res.status(500).send(err);
               } else {
                    return res.status(200).send({ status: 200, message: "Usuário apagado com sucesso!" })
               }

          });
     },
     async notVerified(req, res) {
          const users = await User.find({ verified: false });
          return res.json(users);
     },
     async getByType(req, res) {
          const { type } = req.params
          if (type == 1) {
               let arrayEstudantesSemEstagio = []
               let arrayCompleto= []

               // pego todos ids dos estudantes,
               const estudantes = await User.find({ type: type })

               for (let index = 0; index < estudantes.length; index++) {
                    const element = estudantes[index];
                    estagio = await Internship.find({ id_student: element._id })

                    // se voltar vazio, arrayDeIds push
                    if (estagio.length == 0)
                         arrayEstudantesSemEstagio.push(element)
               }
               for (let i = 0; i < arrayEstudantesSemEstagio.length; i++) {
                    const element = arrayEstudantesSemEstagio[i];
                    estudante = await User.findById(element._id)
                    arrayCompleto.push(estudante)
               }

               // console.log(arrayCompleto);
               return res.json(arrayCompleto);

          } else {
               const users = await User.find({ type: type });
               return res.json(users);
          }

     },
     async index(req, res) {
          const users = await User.find().sort('type');
          return res.json(users);
     },

     async getById(req, res) {
          const { id } = req.params;
          await User.findById(id, (err, user) => {

               if (user) {
                    return res.status(200).send({ status: 200, user })
               } else {
                    console.log(err);
                    return res.status(404).send({ status: 404, message: "Não foi encontrado." });
               }

          });
     },

     async store(req, res) {
          const { name, email, password, phone, type } = req.body;
          const user = new User({ name, email, password, phone, type });

          user.save((err) => {
               user.password = undefined;
               if (err) {
                    if (err.code == 11000)
                         return res.status(500).json({ status: 500, message: "E-mail já cadastrado" });

                    return res.status(500).json({ status: 500, message: "Erro ao criar usuário" });
               }
               else {
                    return res.status(200).send({ status: 200, message: "Welcome to the jungle ", token: generateToken({ id: user.id }) });
               }
          });
     },

     async auth(req, res) {
          const { email, password } = req.body;
          const user = await User.findOne({ email }).select('+password');
          if (!user) {
               return res.status(401).json({ status: 401, message: "User doesn't exist." });
          }

          if (!await bcrypt.compare(password, user.password)) {
               return res.status(401).json({ status: 401, message: "Wrong password!" });
          }

          user.password = undefined;

          // const token = jwt.sign({id:user.id}, authConfig.secret, {expiresIn:86400});
          res.send({ user, token: generateToken({ id: user.id }) });

     },

     async recovery(req, res) {
          const email = req.body.email;

          try {
               const user = await User.findOne({ email });
               if (!user)
                    return res.status(400).json({ status: 400, message: "User not found" });

               //geração de token de identidade
               const token = crypto.randomBytes(15).toString('hex');
               const expires = new Date();
               expires.setDate(expires.getHours() + 1);

               //atualização do token no mongo
               await User.findOneAndUpdate(user.id, {
                    '$set': {
                         passwordResetToken: token,
                         passwordResetExpires: expires
                    }
               })

               mensagem = `Hey there! Here's your token:  ${token}. It'll expires in 1 hour.`;

               //envio do email
               mailer.sendMail({
                    to: email,
                    from: 'checagem.sistemas@gmail.com',
                    subject: 'Password Recovery',
                    text: mensagem,
                    html: mensagem
               }, (err) => {

                    if (err)
                         return res.status(400).json({ status: 400, message: "Cannot send forgot email" });

                    return res.status(201).json({ status: 201, message: "Recovery's mail sent." });
               })

          }
          catch (err) {
               console.log(err);

               return res.status(400).json({ status: 400, message: "Error on recovery password" });
          }
     },


     async reset(req, res) {
          const { email, token, password } = req.body;
          try {
               const user = await User.findOne({ email }).select('+passwordResetToken passwordResetExpires');
               if (!user)
                    return res.json({ "AAAA": "aaaa" });

               if (token !== user.passwordResetToken)
                    return res.json({ "AAAA": "bbbb" });

               if (new Date() > user.passwordResetExpires)
                    return res.json({ "AAAA": "ccccc" });

               user.password = password;

               await user.save();

               res.send(200);



          }
          catch (err) {
               return res.status(400).json({ status: 400, message: "cannot reset password. try again" });
          }
     }


};