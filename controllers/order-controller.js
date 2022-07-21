const User = require('../models').User;
const Item = require('../models').Item;
const Order = require('../models').Order;

module.exports = {
    list(req, res) {
        return Order.findAll()
            .then((orders) => res.status(200).send(orders))
            .catch((error) => {
                res.status(400).send(error)
            })
    },

    getById(req, res) {
        return Order.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    as: 'users'
                },
                {
                    model: Item,
                    as: 'items'
                }
            ]
        })
            .then((order) => {
                if (!order) {
                    return res.status(404).send({
                        message: 'Order Not Found'
                    })
                }
                return res.status(200).send(order);
            })
            .catch((error) => {
                res.status(400).send(error)
            })
    },

    add(req, res) {
        return Order.create({
            dateOrder: req.body.dateOrder,
            userId: req.body.userId,
            status: req.body.status
        })
            .then(() => res.status(201).send({
                message: 'Order berhasil ditambahkan.'
            }))
            .catch(() => {
                res.status(404).send({
                    message: 'Order gagal ditambahkan.'
                })
            })
    },

    update(req, res) {
        return Order.findByPk(req.params.id)
            .then((order) => {
                if (!order) {
                    return res.status(404).send({
                        message: 'Order Not Found'
                    })
                }
                return order.update({
                    dateOrder: req.body.dateOrder,
                    userId: req.body.userId,
                    status: req.body.status
                })
                    .then(() => res.status(201).send({
                        message: 'Order berhasil diperbarui.'
                    }))
                    .catch((error) => {
                        res.status(404).send({
                            message: 'Order gagal diperbarui.'
                        })
                    })
            })
            .catch((error) => {
                res.status(400).send(error)
            })
    },

    delete(req, res) {
        return Order.findByPk(req.params.id)
            .then((order) => {
                if (!order) {
                    return res.status(404).send({
                        message: 'Order Not Found'
                    })
                }
                return order.destroy()
                    .then(() => res.status(201).send({
                        message: 'Order berhasil dihapus.'
                    }))
                    .catch(() => {
                        res.status(404).send({
                            message: 'Order gagal dihapus.'
                        })
                    })
            })
            .catch((error) => {
                res.status(400).send(error)
            })
    }
}