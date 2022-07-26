const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models')

const secretKey = "123adaw123"
const register = async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    if (password.lenght < 8) {
        return res.render('register', { error: "Password must be at least 8 characters" })
    }

    const encryptedPassword = bcrypt.hashSync(password, 10)

    try {
        let user = {};
        user = await User.findOne({ where: { username: username } });
        if (user) {
            return res.render('register', { error: "Username is already registered" })
        }
        const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            username: req.body.username,
            password: encryptedPassword
        }
        await User.create(data)
        
        return res.redirect('/api/login')
    } catch {
        return res.render('register', { error: "Server is Error" })
    }
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