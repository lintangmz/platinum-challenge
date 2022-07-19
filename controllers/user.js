const User = require('../models').User;

module.exports = {
    list(req, res) {
        return User.findAll({
            include: [],
            order: [['createdAt', 'DESC']]
        })
            .then((users) => res.status(200).send(users))
            .catch((error) => {
                res.status(500).send(error)
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
                        message: 'log in gagal'
                    })
                }
                return res.status(200).send({
                    message: 'log in berhasil'
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
                        message: 'User Not Found'
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
            password: req.body.password,
            orderId: req.body.orderId
        })
            .then(() => res.status(201).send({
                message: 'Register Berhasil'
            }))
            .catch((error) => {
                res.status(400).send(error);
            });
    },

    update(req, res) {
        return User.findByPk(req.params.id)
            .then((user) => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found'
                    })
                }
                return user.update({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    userName: req.body.userName,
                    email: req.body.email,
                    password: req.body.password,
                    orderId: req.body.orderId
                })
                    .then(() => res.status(200).send({ message: 'User is Updated' }))
                    .catch((error) => {
                        res.status(400).send(error)
                    })
            })
    },

    delete(req, res) {
        return User.findByPk(req.params.id)
            .then((user) => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found'
                    })
                }
                return user.destroy()
                    .then(() => res.status(204).send({ message: "User is Deleted" }))
                    .catch((error) => {
                        res.status(400).send(error);
                    });
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    }
}