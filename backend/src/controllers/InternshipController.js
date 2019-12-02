const Internship = require('../models/Internship');
const User = require('../models/User');

module.exports = {
     // if(mongoose.Types.ObjectId.isValid(id)) {}
     // use findone to bring specific user (without array)
     // buscar estágios que estejam relacionados ao orientador/revisor com aluno
     // segunda tela depois da seleção do studante
     async internshipsByStudentAndDvisorId(req, res) {
          const { id_student, id_dvisor } = req.params;
          await Internship.find({
               $and: [
                    { $or: [{ id_advisor: id_dvisor }, { id_supervisor: id_dvisor }] },
                    { $or: [{ id_student }] }
               ]
          }, (err, internship) => {
               if (internship) {
                    return res.status(200).send({ status: 200, internship })
               } else {
                    console.log(err);

                    return res.status(404).send({ status: 404, message: "Não foram encontrados estágios para este id." });
               }
          })
          // await Internship.find({ id_users: { $all: [id_student, id_dvisor] } }, (err, internships) => {
     },
     // traz todos os estudantes
     async getStudentsRelated(req, res) {
          const { id_dvisor } = req.params;
          console.log(req.params);
          
          //busca todos estágios em que este user faça parte
          await Internship.find({ $or: [{ id_advisor: id_dvisor }, { id_supervisor: id_dvisor }] }, (err, internships) => {

               if (internships.length > 0) {
                    const studentsIdArr = []

                    // adiciona usuários dentro de array para cada estágio
                    internships.forEach(i => {
                         studentsIdArr.push(i.id_student)
                    });

                    if (!studentsIdArr.length > 0) {
                         return res.status(404).send({ status: 404, message: "Não foram encontrados Estudantes Associados a este Usuário. Por favor, aguarde pela admissão da administração. " });

                    }
                    // procura cada estudante
                    User.find({ '_id': { $in: studentsIdArr } }, (err, students) => {

                         if (students) {
                              return res.status(200).send({ status: 200, students })
                         } else {
                              console.log(err);
                              return res.status(404).send({ status: 404, message: "Não foram encontrados Estágios Associados a este Usuário. Por favor, aguarde pela admissão da administração. " });
                         }
                    })

               } else {
                    console.log(err);
                    return res.status(404).send({ status: 404, message: "Não foram encontrados Estudantes para este usuário. Por favor, aguarde pela admissão da administração." });
               }
          })
     },
     // relatorio geral
     async getInternshipsByUserId(req, res) {
          console.log(req.params);

          const { id_user } = req.params;
          await Internship.find({ $or: [{ id_student: id_user }, { id_advisor: id_user }, { id_supervisor: id_user }] }, (err, internships) => {

               if (internships.length > 0) {
                    return res.status(200).send({ status: 200, internships });
               } else {
                    console.log(err);
                    return res.status(404).send({ status: 404, message: "Não foram encontrados Estágios Associados a este Usuário. Por favor, aguarde pela admissão da administração. " });
               }
          }).populate('id_advisor').populate('id_supervisor').populate('id_student').populate({ path: 'id_activities', options: { sort: { createdAt: -1 } } })

     },
     async getContacts(req, res) {
          // mesma lógica do getStudents
          const { id_user } = req.params;
          const { tipo } = req.params;
          console.log(req.params);

          // passar tipo para facilitar query
          let internships
          // estudante
          if (tipo == 1) {
               internships = await Internship.find({ id_student: id_user })

          } else if (tipo == 2) {
               internships = await Internship.find({ id_advisor: id_user })

          } else if (tipo == 3) {
               internships = await Internship.find({ id_supervisor: id_user })
          }

          if (!internships.length > 0) {
               return res.status(404).send({ status: 404, message: "Não foram encontrados Estágios Associados a este Usuário. Por favor, aguarde pela admissão da administração. " });
          }

          //busca todos estágios em que este user faça parte
          if (internships.length > 0) {
               const usersIdArr = []

               // adiciona usuários dentro de array para cada estágio
               internships.forEach(i => {
                    usersIdArr.push(i.id_student, i.id_advisor, i.id_supervisor)
               });

               // filter duplicatas
               let unique = []
               o = {}
               usersIdArr.forEach(e => {
                    o[e] = true
               })
               unique = Object.keys(o)

               // splice no user da request
               let ownUser = unique.indexOf(id_user)
               unique.splice(ownUser, 1)

               User.find({
                    '_id': {
                         $in: unique
                    }
               }, (err, contacts) => {
                    if (contacts) {
                         console.log(contacts);
                         return res.status(200).send({ status: 200, contacts })
                    } else {
                         console.log(err);
                         return res.status(404).send({ status: 404, message: "Não foram encontrados Estágios associados a este usuário, portanto não há contatos a serem exibidos. Por favor, aguarde pela admissão da administração. " });
                    }
               })
          }
     },
     async remove(req, res) {
          const { id } = req.params;

          await Internship.findByIdAndDelete(id, (err, doc) => {
               if (err) {
                    console.log(err);
                    return res.status(500).send(err);
               } else {
                    return res.status(200).send({ status: 200, message: "Estágio apagado com sucesso!" })
               }

          });
     },
     async update(req, res) {

          const { id } = req.params;
          // para parar de dar erro de deprecation põe o useFindAndModify junto do new!
          // é possivel colocar junto das configs do mongoose.connect,
          await Internship.findOneAndUpdate({ '_id': id }, req.body, { new: true, useFindAndModify: false }, (err, doc) => {
               if (doc) {
                    // se new é true traz doc updateado
                    // dá pra por na url e direcionar!
                    return res.status(200).send({ status: 200, message: "Atualizado com sucesso." })

               } else {
                    console.log(err);
                    return res.status(400).send({ status: 400, message: "Erro no update." });
               }
          })
     },
     //todos para admin,0
     // alguns para client!
     async getById(req, res) {
          const { id } = req.params;
          await Internship.findById(id, (err, internship) => {

               if (internship) {
                    return res.status(200).send({ status: 200, internship })
               } else {
                    console.log(err);
                    return res.status(404).send({ status: 404, message: "Não foi encontrado." });
               }

          });
     },
     async index(req, res) {
          await Internship.find((err, internships) => {
               if (internships) {
                    // 204 significa que no content, isso
                    // quer dizer que não será enviado o
                    // corpo da requisição ou nada mais :o
                    return res.status(200).send({ status: 200, internships });
               } else {
                    return res.status(202).send({ status: 202, message: "Sem Estágios Cadastrados." });
               }

          }).sort('-createdAt');

     },
     async store(req, res) {
          // sem o activity id
          // validar o req.body!
          const internship = new Internship(req.body);

          internship.save((err, doc) => {
               if (err) {
                    console.log(err);
                    return res.status(400).send({ status: 400, message: "Não foi possível salvar." });
               }
               else {
                    return res.status(201).send({ status: 201, message: "Estágio Cadastrado!" });
               }
          })
     },
};