const express = require('express')
const router = express.Router()
const restrict = require('../middlewares/restrict')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, '../uploads')
    },

    filename: function (req, file, callback) {
        callback(null, file.originalname)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        if(allowedExtension.includes(file.mimetype)) {
            return callback(null, true)
        } else {
            callback(null, false)
            return callback(new Error ('Only .png, .jpg, .jpeg format allowed!'))
        }
    }
})

const auth = require('../controllers/auth-controller');
const userController = require('../controllers').user;
const itemController = require('../controllers').item;
const orderController = require('../controllers').order;
const profileController = require('../controllers').profile;

/* Register and Login */
router.post('/api/register', auth.register);
router.post('/api/login', auth.login);
router.get('/api/profile', restrict, auth.profile);

router.post('/api/profile', restrict, upload.single('avatar'), profileController.uploadAvatar)

/* User Router */
router.get('/api/users', userController.list);
router.get('/api/user/:id', userController.getById);
router.put('/api/user/:id', userController.update);
router.delete('/api/user/:id', userController.delete);

/* Item Router */
router.get('/api/items', itemController.list);
router.get('/api/item/:id', itemController.getById);
router.post('/api/item', itemController.add);
router.put('/api/item/:id', itemController.update);
router.delete('/api/item/:id', itemController.delete);

/* Order Router */
router.get('/api/orders', orderController.list);
router.get('/api/order/:id', orderController.getById);
router.post('/api/order', orderController.add);
router.put('/api/order/:id', orderController.update);
router.delete('/api/order/:id', orderController.delete);

module.exports = router;