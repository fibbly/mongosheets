const router = require('express').Router()
const {check, validationResult} = require('express-validator/check')

module.exports = (db) => {

    // Get All Collections
    router.get('/', (req, res) => {
        db.listCollections().toArray((err, collections) => {
            if(err) {
                return res.status(500).json(err)
            }else {
                res.status(200).json(collections)
            }
        })
    })

    // Get All Contents of a Collection
    router.get('/:name', (req, res) => {
        db.collection(req.params.name).find({}).toArray((err, results) => {
            if(err) {
                return res.json(err)
            }else {
                res.json(results)
            }
        })
    })

    // Create New Collection
    router.post('/', [
        check('collectionName').isAlphanumeric()
    ], (req, res) => {
        const errors =  validationResult(req) 
        if(errors) {
            return res.status(422).json({"errors": errors.array()})
        }
        db.createCollection(req.body.collectionName, (err, collection) => {
            if(err) {
                return res.status(500).json({"errors": err})
            }else {
                res.status(200).json({"message": `Successfully created collection: '${req.body.collectionName}'`})
            }
        })
    })

    return router

}