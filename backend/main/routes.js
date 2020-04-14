var express = require('express')
var router = express.Router()


// Profile stuff
// SQL SYNTAX isnt correct here
router.post('/api/posts/signup', (req, res, next) => {
    const values = [req.body.username, req.body.password]
    pool.query(`INSERT INTO login(username, password)
                VALUES($1, $2,)
                ON CONFLICT DO NOTHING`, values,
        (q_err, q_res) => {
            res.json(q_res.rows)
        })
})

router.get('/api/get/getuser', (req, res, next) => {
    const user = req.query.username
    console.log(username)
    pool.query(`SELECT * FROM login
                WHERE username=arjuuun`, [username],
        (q_err, q_res) => {
            res.json(q_res.rows)
        })
})

router.get('/api/get/checkuser', (req, res, next) => {
    const values = [req.query.username, req.query.passowrd]
    console.log(username)
    pool.query(`SELECT * FROM login
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