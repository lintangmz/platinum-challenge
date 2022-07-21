const Item = require('../models').Item;

module.exports = {
    list(req, res) {
        return Item.findAll()
            .then((items) => res.status(200).send(items))
            .catch((error) => {
                res.status(400).send(error)
            });
    },

    getById(req, res) {
        return Item.findByPk(req.params.id)
            .then((item) => {
                if (!item) {
                    return res.status(404).send({
                        message: 'Item tidak ditemukan.',
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
            qty: req.body.qty,
            orderId: req.body.orderId
        })
            .then(() => res.status(201).send({
                message: 'Item  berhasil ditambahkan.' 
            }))
            .catch(() => res.status(404).send({
                message: 'Item gagal ditambahkan.'
            }))
    },

    update(req, res) {
        return Item.findByPk(req.params.id)
            .then(item => {
                if (!item) {
                    return res.status(404).send({
                        message: 'Item tidak ditemukan.',
                    });
                }
                return item.update({
                    name: req.body.name,
                    description: req.body.description,
                    price: req.body.price,
                    qty: req.body.qty,
                    orderId: req.body.orderId
                })
                    .then(() => res.status(201).send({
                        message: 'Item berhasil diperbarui.'
                    }))
                    .catch(() => res.status(404).send({
                        message: 'Item gagal diperbarui.'
                    }));
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return Item.findByPk(req.params.id)
            .then(item => {
                if (!item) {
                    return res.status(404).send({
                        message: 'Item gagal ditemukan.',
                    });
                }
                return item.destroy()
                    .then(() => res.status(201).send({
                        message: 'Item berhasil dihapus.'
                    }))
                    .catch(() => res.status(404).send({
                        message: 'Item gagal dihapus.'
                    }));
            })
            .catch((error) => res.status(400).send(error));
    }
}