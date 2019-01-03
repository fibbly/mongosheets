/**
 *  Mongo Sheets
 *  Create databases with Google Sheets
 * 
 *  @file       Server
 *  @author     Angel R. Perez <apsr9095@gmail.com>
 *  @version    1.0
 *  @requires   express
 *  @requires   mongodb
 *  @requires   morgan
 *  @requires   cors
 *  @requires   body-parser
 * 
 */

require('dotenv').config()

let db
const app = require('express')()
const cors = require('cors')
const port = process.env.PORT || 8000
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

MongoClient.connect(process.env.DB_URI, {useNewUrlParser: true}, (err, client) => {
    if(err) throw err
    db = client.db(process.env.DB)
    app.use('/', require('./routes/index')(db))
    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
})