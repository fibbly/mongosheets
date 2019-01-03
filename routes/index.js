const router = require('express').Router()

module.exports = (db) => {

    router.get('/', (req, res) => {
        res.status(200).json({ message: 'Connected!' })
    })

    router.use('/test', require('./test')(db))
    router.use('/api/collections', require('./collections')(db))

    return router

}