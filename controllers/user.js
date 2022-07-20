const User = require('../models').User;

module.exports = {
    list(req, res) {
        return User.findAll({
            include: [],
            order: [['createdAt', 'DESC']]
        })
            .then((users) => res.status(200).send(users))
            .catch((error) => {
                res.status(400).send(error)
            })
    },

    logIn(req, res) {
        return User.findOne({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        })
            .then((user) => {
                if (!user) {
                    return res.status(404).send({
                        message: 'Log in gagal.'
                    })
                }
                return res.status(201).send({
                    message: 'Log in berhasil.'
                })
            })
            .catch((error) => {
                res.status(400).send(error)
            })
    },

    getById(req, res) {
        return User.findByPk(req.params.id, {
            include: []
        })
            .then((user) => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User tidak ditemukan.'
                    })
                }
                return res.status(200).send(user)
            })
            .catch((error) => {
                res.status(400).send(error)
            })
    },

    add(req, res) {
        return User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password
        })
            .then(() => res.status(201).send({
                message: 'Register Berhasil.'
            }))
            .catch(() => {
                res.status(404).send({
                    message: 'Register Gagal.'
                });
            });
    },

    update(req, res) {
        return User.findByPk(req.params.id)
            .then((user) => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User tidak ditemukan.'
                    })
                }
                return user.update({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    userName: req.body.userName,
                    email: req.body.email,
                    password: req.body.password
                })
                    .then(() => res.status(201).send({
                        message: 'User berhasil diperbarui.'
                    }))
                    .catch(() => {
                        res.status(404).send({
                            message: 'User gagal diperbarui.'
                        })
                    })
            })
    },

    delete(req, res) {
        return User.findByPk(req.params.id)
            .then((user) => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User tidak ditemukan.'
                    })
                }
                return user.destroy()
                    .then(() => res.status(201).send({
                        message: 'User berhasil dihapus.'
                    }))
                    .catch(() => {
                        res.status(404).send({
                            message: 'User gagal dihapus.'
                        });
                    });
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    }
}