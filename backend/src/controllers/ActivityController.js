const moment = require('moment')
const Activity = require('../models/Activity');
const Internship = require('../models/Internship');

module.exports = {
    async index(req, res) {
        const activity = await Activity.find().sort('-createdAt');
        if (activity.length) {
            return res.status(200).send({ status: 200, activity });
        } else {
            return res.status(404).send({ status: 404, message: "Não há registros." });
        }
    },

    async store(req, res) {
        // store é obrigatório o estágio
        // validar req.body
        // formato do date tem que converter para isostring
        console.log(req.file);
        let { date, description, inputTime, outputTime, id_internship } = req.body
        date = moment(date, 'DD-MM-YYYY').toISOString()
        
        const obj = {
            date,
            description,
            inputTime,
            outputTime,
            id_internship,
            image: req.file.filename
        }

        const activity = new Activity(obj);
        console.log(activity);
        // return res.status(201).send({ status: 201, message: "Atividade Cadastrada!" });
        

        await activity.save((err, activity) => {
            if (err) {
                console.log(err);
                return res.status(400).send({ status: 400, message: "Erro ao salvar atividade!" });

            } else {
                // console.log(activity.id);
                // $ pull para fazer um pop ou remove https://boostlog.io/@vithalreddy/push-and-pop-items-into-mongodb-array-via-mongoose-in-nodejs-5a8c3a95a7e5b7008ae1d809
                Internship.findByIdAndUpdate(req.body.id_internship, { $push: { id_activities: activity.id } }, { new: true, useFindAndModify: false }, (err, internship) => {
                    // console.log(internship);
                    if (err) {
                        // console.log(err);
                        return res.status(400).send({ status: 400, message: "Erro ao salvar atividade!" });
                    } else {
                        // console.log(internship);
                        return res.status(201).send({ status: 201, message: "Atividade Cadastrada!" });
                    }
                });
            }
        })
    },
    async remove(req, res) {
        const { id } = req.params;

        await Activity.findByIdAndDelete(id, (err, act) => {
            if (err) {
                // console.log(err);
                return res.status(500).send(err);
            } else {
                // continuar daqui
                Internship.findByIdAndUpdate(req.body.id_internship, { $pull: { id_activities: activity.id } }, { new: true, useFindAndModify: false }, (err, internship) => {
                    // console.log(doc);
                    // internship
                    if (err) {
                        // console.log(err);
                        return res.status(200).send({ status: 200, message: "Estágio apagado com sucesso!" })
                    } else {
                        return res.status(500).send(err);
                    }
                })
            }

        });
    },
    async update(req, res) {

        const { id } = req.params;
        console.log(req.body);
        // validar req.body
        // para parar de dar erro de deprecation põe o useFindAndModify junto do new!
        // é possivel colocar junto das configs do mongoose.connect,

        // no update não precisa atualizar o id da internship
        // e nem a activity id
        await Activity.findOneAndUpdate({ '_id': id }, req.body, { new: true, useFindAndModify: false }, (err, doc) => {
            if (doc) {
                // se new é true traz doc updateado
                // dá pra por na url e direcionar!
                console.log(doc);
                return res.status(200).send({ status: 200, message: "Atualizado com sucesso." })

            } else {
                console.log(err);
                return res.status(400).send({ status: 400, message: "Erro no update." });
            }
        })
    }

};