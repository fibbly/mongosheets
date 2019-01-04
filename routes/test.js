const router = require('express').Router()

module.exports = (db) => {

    router.get('/', (req, res) => {
        db.collection('Test').find({}).toArray((err, test) => {
            if(err) {
                return res.status(500).json(err)
            }else {
                res.json(test)
            }
        })
    })

    return router

}