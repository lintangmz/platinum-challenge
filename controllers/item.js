const Item = require('../models').Item;

module.exports = {
    list(req, res) {
        return Item.findAll()
            .then((items) => res.status(200).send(items))
            .catch((error) => {
                res.status(500).send(error)
            });
    },

    getById(req, res) {
        return Item.findByPk(req.params.id)
            .then((item) => {
                if (!item) {
                    return res.status(404).send({
                        message: 'Item Not Found',
                    });
                }
                return res.status(200).send(item);
            })
            .catch((error) => res.status(400).send(error));
    },

    add(req, res) {
        return Item.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            qty: req.body.qty
        })
            .then((item) => res.status(200).send(item))
            .catch((error) => res.status(500).send(error))
    },

    update(req, res) {
        return Item.findByPk(req.params.id)
            .then(item => {
                if (!item) {
                    return res.status(404).send({
                        message: 'Item Not Found',
                    });
                }
                return item.update({
                    name: req.body.name,
                    description: req.body.description,
                    price: req.body.price,
                    qty: req.body.qty
                })
                    .then(() => res.status(200).send(item))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return Item.findByPk(req.params.id)
            .then(item => {
                if (!item) {
                    return res.status(400).send({
                        message: 'Item Not Found',
                    });
                }
                return item.destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    }
}