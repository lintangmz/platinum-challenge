const express = require('express')
const app = express()
const port = 3000
const router = require('./routes/index')
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
}

app.set('view engine', 'ejs')

app.use(logger)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', router)

app.get('/', (req, res) => res.render('home'))

const errorHandler = (err, req, res, next) => {
    console.log(err);
    return res.status(500).json({
        status: 'fail',
        errors: err.message
    })
}

const notFoundHandler = (req, res, next) => {
    return res.status(404).json({
        status: 'fail',
        errors: "Not Found"
    })
}

app.use(errorHandler)
app.use(notFoundHandler)

app.listen(port, () => console.log(`http: ${port}`))