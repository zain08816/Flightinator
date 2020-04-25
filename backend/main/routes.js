var express = require('express');
var router = express.Router();
var connection = require('./db.js');

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
    console.log(req.body.username);
    connection.query(`SELECT username,password FROM login WHERE username='${req.body.username}' AND password='${req.body.password}';`,
        (error, result) => {
            if (error) {
                console.log(error);
            }
            res.send( error ? {error:error} : {result:result} );
        })
})

router.post('/api/posts/customer_info', (req, res, next) => {
    return;
})

router.post('/api/posts/search_flight', (req, res, next) => {
    console.log(req.body.departure);
    console.log(req.body.arrival);
    console.log(req.body.trip_type);
    var type_query = "";
    var query = "";
    var place = "";
    if (req.body.arrival == "" && req.body.trip_type == "all" && req.body.departure == "") {query = "SELECT * FROM flights";}
    else { query = "SELECT * FROM flights WHERE"; }

    if (req.body.departure != "" && req.body.arrival != "") {place = `departure='${req.body.departure}' AND arrival='${req.body.departure}'`;}
    

    if ((req.body.arrival != "" || req.body.departure != "") && req.body.trip_type != "all" ) { type_query = `AND trip_type='${req.body.trip_type}'`; }
    else if (req.body.trip_type != "all") type_query = `trip_type='${req.body.trip_type}'`;


    console.log(`${query} ${place} ${type_query};`)
    connection.query(`${query} ${place} ${type_query};`,
        (error, result) => {
            res.send( error? {error:error} : {results:result})
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

module.exports = router;