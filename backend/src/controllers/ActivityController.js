const path = require('path');
const fs = require('fs')
const Activity = require('../models/Activity');
const Internship = require('../models/Internship');
const tinify = require('tinify')
const authConfig = require('../config/auth');

module.exports = {

    async checkActivityDate(actvDate) {

        await Activity.find({ date: actvDate }, (err, doc) => {
            if (!err) {
                if (!doc) {
                    return true
                } else {
                    return false
                }
            } else {
                console.log(err);
                return res.status(400).send({ status: 400, message: "Erro ao consultar o banco de dados!" });
            }
        })

    },

    async index(req, res) {
        const activity = await Activity.find().sort('-createdAt');
        if (activity.length) {
            return res.status(200).send({ status: 200, activity });
        } else {
            return res.status(404).send({ status: 404, message: "Não há registros." });
        }
    },

    async store2(req, res) {

        if (req.file) {

            const { date, description, inputTime, outputTime, id_internship } = req.body
            await Activity.find({ date }, (err, doc) => {
                if (!err) {
                    if (!doc.length > 0) {

                        const newName = new Date().getTime() + "_min.png";
                        const destination = path.resolve(__dirname, '..', '..', 'uploads', newName);

                        tinify.key = authConfig.api;
                        const source = tinify.fromFile(req.file.path);

                        const resized = source.resize({
                            method: "scale",
                            width: 250
                        });

                        resized.toFile(destination)
                            .then(() => {
                                const obj = {
                                    date,
                                    description,
                                    inputTime,
                                    outputTime,
                                    id_internship,
                                    image: newName
                                }
                                const activity = new Activity(obj);

                                activity.save((err, activity) => {
                                    if (err) {
                                        console.log('Ocorreu um erro ao salvar...');
                                        console.log(err);
                                        return res.status(400).json({ status: 400, message: "Erro ao salvar atividade. Tente novamente." });
                                    } else {
                                        Internship.findByIdAndUpdate(id_internship, { $push: { id_activities: activity.id } }, { new: true, useFindAndModify: false }, (err, internship) => {
                                            if (err == null) {
                                                return res.status(201).json({ status: 201, message: "Atividade Cadastrada!" });
                                            }
                                        });
                                    }
                                })
                                fs.unlink(`./uploads/${req.file.filename}`, err => {
                                    if (err) console.log(err)
                                })
                            })
                            .catch(err => {
                                console.log(err);
                                console.log("Ocorreu um erro na compressão");
                                return res.status(400).json({ status: 400, message: "Ocorreu um erro, por favor tente novamente." });
                            })
                    } else {
                        console.log('Não está vago...');
                        fs.unlink(`./uploads/${req.file.filename}`, err => {
                            if (err) console.log(err)
                        });
                        return res.status(400).json({ status: 400, message: "Já existe uma atividade cadastrada para este dia." });
                    }
                }

            })
        } else {
            console.log('Imagem não recebida');
            return res.status(400).send({ status: 400, message: "Imagem não recebida." });
        }

    },

    async storeWithNoImage(req, res) {
        let { date, description, inputTime, outputTime, id_internship } = req.body

        const obj = {
            date,
            description,
            inputTime,
            outputTime,
            id_internship,
            image: null
        }

        await Activity.find({ date }, (err, doc) => {
            if (!err) {
                if (!doc.length > 0) {
                    const activity = new Activity(obj);


                    activity.save((err, activity) => {
                        if (err) {
                            console.log(err);
                            return res.status(400).send({ status: 400, message: "Erro ao salvar atividade!" });

                        } else {

                            Internship.findByIdAndUpdate(id_internship, { $push: { id_activities: activity.id } }, { new: true, useFindAndModify: false }, (err, internship) => {
                                if (err || internship == null) {
                                    console.log(err);
                                    return res.status(400).send({ status: 400, message: "Erro ao salvar atividade!" });
                                } else {
                                    return res.status(201).send({ status: 201, message: "Atividade Cadastrada!" });
                                }
                            });
                        }
                    })
                } else {
                    return res.status(400).send({ status: 400, message: "Já existe uma atividade cadastrada para este dia." });
                }
            } else {
                console.log(err);
                return res.status(400).send({ status: 400, message: "Erro ao consultar o banco de dados!" });
            }
        })
    },
    async remove(req, res) {
        const { id } = req.params;
        try {
            const act = await Activity.findById(id)
            console.log(act);
            // debugger

            if (act.image != null || "") {
                fs.unlink(`./uploads/${act.image}`)
            }

            Internship.findByIdAndUpdate(act.id_internship, { $pull: { id_activities: act._id } }, { new: true, useFindAndModify: false }, (err, internship) => {
                act.remove();
                if (err) {
                    console.log(err);
                } else {
                    return res.status(200).send({ status: 200, message: "Atividade apagada com sucesso!" })
                }
            })
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Ocorreu um erro :(", status: 500 });
        }

    },

    async update(req, res) {

        const { id } = req.params;

        await Activity.findOneAndUpdate({ '_id': id }, req.body, { new: true, useFindAndModify: false }, (err, doc) => {
            if (doc) {
                return res.status(200).send({ status: 200, message: "Atualizado com sucesso." })

            } else {
                console.log(err);
                return res.status(400).send({ status: 400, message: "Erro no update." });
            }
        })
    }

};
