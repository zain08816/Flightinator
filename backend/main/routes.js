var express = require('express')
var router = express.Router()
var connection = require('./db.js')

// Profile stuff
// SQL SYNTAX isnt correct here
router.post('/api/posts/signup', (req, res, next) => {
    if( !req.body.username || !req.body.password )
        throw 'Improperly formatted request.';
    connection.query(`INSERT INTO login
VALUES('${req.body.username}', '${req.body.password}');`,
        (error, result) => {
            res.send( error ? {error:error} : {} );
        })
})

router.post('/api/posts/login', (req, res, next) => {
    connection.query(`SELECT username,password FROM login WHERE username='${req.body.username}' AND password='${req.body.password}'`,
        (error, result) => {
            console.log(error);
            res.send( error ? {error:error} : {result:result} );
        })
})

router.get('/api/get/getuser', (req, res, next) => {
    const user = req.query.username
    console.log(username)
    connection.query(`SELECT * FROM login
                WHERE username=arjuuun`, [username],
        (q_err, q_res) => {
            res.json(q_res.rows)
        })
})

router.get('/api/get/checkuser', (req, res, next) => {
    const values = [req.query.username, req.query.passowrd]
    console.log(username)
    connection.query(`SELECT * FROM login
                WHERE username=arjuuun`, values,
        (q_err, q_res) => {
            res.json(q_res.rows)
        })
})

router.get('/api/hello', (req, res, next) => {
    const word = req.query.word
	res.json(`Hello ${word}!`)
})

module.exports = router