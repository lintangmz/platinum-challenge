const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models')

const secretKey = "123adaw123"
const register = (req, res) => {
    const password = req.body.password
    const encryptedPassword = bcrypt.hashSync(password, 10)

    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: encryptedPassword
    }).then((data) => {
        return res.json({
            id: data.id,
            username: data.username
        })
    })
}

const login = (req, res) => {
    const username = req.body.username
    const password = req.body.password

    User.findOne({
        where: { username: username }
    }).then((user) => {
        if (!user) {
            return res.json({ message: 'User Not Found!' })
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password)

        if (!isPasswordValid) {
            return res.json({ message: 'Username or Password Wrong!!' })
        }

        const accesToken = jwt.sign({
            id: user.id,
            username: user.username
        }, secretKey)

        return res.json({
            id: user.id,
            username: user.username,
            accesToken: accesToken
        })
    })
}

const profile = (req, res) => {
    const currentUser = req.user;
    return res.json({
        id: currentUser.id,
        username: currentUser.username
    })
}

module.exports = {
    register,
    login,
    profile
}