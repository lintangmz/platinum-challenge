const OrderDetail = require('../models').OrderDetail;
const Order = require('../models').Order;
const User = require('../models').User;
const Item = require('../models').Item;

module.exports = {
    list(req, res) {
        return OrderDetail.findAll({
            include: [],
            order: [['createdAt', 'DESC']]
        })
            .then((orderDetails) => res.status(200).send(orderDetails))
            .catch((error) => {
                res.status(500).send(error)
            });
    },

    getById(req, res) {
        return OrderDetail.findByPk(req.params.id)
            .then((orderDetail) => {
                if (!orderDetail) {
                    return res.status(404).send({
                        message: 'OrderDetail Not Found',
                    });
                }
                return res.status(200).send(orderDetail);
            })
            .catch((error) => res.status(400).send(error));
    },

    add(req, res) {
        return OrderDetail.create({
            orderId: req.body.orderId,
            itemId: req.body.itemId
        })
            .then((orderDetail) => res.status(200).send(orderDetail))
            .catch((error) => res.status(500).send(error))
    },

    update(req, res) {
        return OrderDetail.findByPk(req.params.id)
            .then(orderDetail => {
                if (!orderDetail) {
                    return res.status(404).send({
                        message: 'OrderDetail Not Found',
                    });
                }
                return orderDetail.update({
                    orderId: req.body.orderId,
                    itemId: req.body.itemId
                })
                    .then(() => res.status(200).send(orderDetail))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return OrderDetail.findByPk(req.params.id)
            .then(orderDetail => {
                if (!orderDetail) {
                    return res.status(400).send({
                        message: 'OrderDetail Not Found',
                    });
                }
                return OrderDetail.destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    }
}