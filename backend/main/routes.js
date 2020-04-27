var express = require('express');
var router = express.Router();
var connection = require('./db.js');
const oneline = require('oneline');

// Profile stuff
router.post('/api/posts/signup', (req, res, next) => {
    if( !req.body.username || !req.body.password )
        throw 'Improperly formatted request.';
    connection.query(`INSERT INTO login
VALUES('${req.body.username}', '${req.body.password}');`,
        (error, result) => {
            res.send( error ? {error:error} : {} );
        });
})

router.post('/api/posts/login', (req, res, next) => {
    console.log(`${req.body.username} has logged in.`);
    connection.query(`SELECT username,password FROM login WHERE username='${req.body.username}' AND password='${req.body.password}';`,
        (error, result) => {
            if (error) {
                console.log(error);
            }
            res.send( error ? {error:error} : {result:result} );
        });
})

router.post('/api/posts/customer_info', (req, res, next) => {
    if( req.body.action == 'add' ) {
        connection.query(oneline`INSERT INTO customer (name, email, phone_no, address, city, state, zip_code, seat_preference, meal_preference)
VALUES ('${req.body.name}', '${req.body.email}', '${req.body.phone_no}', '${req.body.address}', '${req.body.city}',
'${req.body.state}', '${req.body.zip_code}', ${req.body.seat_preference}, '${req.body.meal_preference}');`,
        (error, result) => {
            if( error ) console.log( `SQL Error! Query: ${error.sql}` );
            res.send( error ? {error:error} : {result:result} )
        });
    } else if( req.body.action == 'edit' ) {
        let settingString = '';
        for( const key in req.body )
            if( key != 'account_no' && key != 'action' && req.body[key] != '' )
                settingString += `${key} = '${req.body[key]}', `
        const queryString = oneline`UPDATE customer
SET ${settingString.substring(0,settingString.length-2)}
WHERE username='${req.body.username}';`;
        console.log(queryString);
        connection.query(queryString,
        (error, result) => {
            if( error ) console.log( error );
            res.send( error ? {error:error} : {result:result} )
        });
    } else if( req.body.action == 'delete' ) {
        connection.query(oneline`DELETE FROM customer
WHERE username = '${req.body.username}';`,
        (error, result) => {
            if( error ) console.log( error );
            res.send( error ? {error:error} : {result:result} )
        });
    } else if( req.body.action == 'get' ) {
        connection.query(oneline`SELECT name,email,phone_no,address,city,state,zip_code,seat_preference,meal_preference
FROM customer
WHERE username='${req.body.username}';`,
        (error,result) => {
            if( error ) console.log(error);
            res.send( error ? {error:error} : {result:result} )
        })
    } else
        throw 'Uh oh an invalid action was passed to the customer_info route!';
})

router.post('/api/posts/salesreport', (req, res, next) => {
    const month = req.body.month;
    connection.query(oneline`SELECT * 
FROM reservations
WHERE EXTRACT(MONTH from DATE)=${month}`,
    (error, result) => {
        if( error ) console.log( error );
        res.send( error ? {error:error} : {result:result} );
    });
})

router.post('/api/posts/salesreportjoin', (req, res, next) => {
    connection.query(oneline`SELECT * FROM flights f JOIN reservations r ON f.flight_no = r.flight_num;`,
    (error, result) => {
        if( error ) console.log( error );
        res.send( error ? {error:error} : {result:result} );
    });
})

router.post('/api/posts/flightsList', (req, res, next) => {
    connection.query(oneline`SELECT * FROM flights;`,
    (error, result) => {
        if( error ) console.log( error );
        res.send( error ? {error:error} : {result:result} );
    });
})

router.post('/api/posts/reservationList', (req, res, next) => {
    const flight_no = req.body.flight_no;
    const customer_name = req.body.name;
    const searchNameOrFlight = customer_name.length > 0; // search by name is true, by flight is false
    const queryString = searchNameOrFlight ? `SELECT * FROM reservations GROUP BY user='${customer_name}';`
    : `SELECT * FROM reservations GROUP BY flight_num=${flight_no};`
    connection.query(queryString,
    (error, result) => {
        if( error ) console.log( error );
        res.send( error ? {error:error} : {result:result} );
    });
})

router.post('/api/posts/revenue', (req, res, next) => {
    const flight_no = req.body.flight_no;
    const destination = req.body.destination;
    const username = req.body.username;

    const joinedNestedQuery = "SELECT * FROM flights f JOIN reservations r ON f.flight_no=r.flight_num";
    let queryString = `SELECT sum(j.fare) revenue,j.user,j.arrival,j.flight_no FROM (${joinedNestedQuery}) AS j WHERE `;
    if( flight_no ) queryString += `j.flight_no=${flight_no} `;
    if( destination ) queryString += `j.arrival='${destination}' `;
    if( username ) queryString += `j.user='${username}' `;
    queryString += `GROUP BY j.user,j.arrival,j.flight_no;`;

    // console.log(`Built query: ${queryString}`);

    connection.query(queryString,
        (error, result) => {
            if( error ) console.log( error );
            res.send( error ? {error:error} : {result:result} );
        });
})

router.post('/api/posts/search_flight', (req, res, next) => {
    console.log(req.body.departure);
    console.log(req.body.arrival);
    console.log(req.body.trip_type);
    console.log(req.body.all)
    var type_query = "";
    var query = "";
    var place = "";

    if (req.body.all == "yes" || req.body.all == "active") {

        query = "SELECT flight_no, departure, dept_time, arrival, arriv_time, trip_type, airline_id, price, seats_booked FROM flights";

    } else if (req.body.all == "start"){

        query = `SELECT flight_no, departure, dept_time, arrival, arriv_time, trip_type, airline_id, price, seats_booked FROM flights WHERE departure='${req.body.departure}'`;
    
    } else if (req.body.all == "end"){

        query = `SELECT flight_no, departure, dept_time, arrival, arriv_time, trip_type, airline_id, price, seats_booked FROM flights WHERE arrival='${req.body.arrival}'`;

    } else {

       query = "SELECT flight_no, departure, dept_time, arrival, arriv_time, trip_type, airline_id, price, seats_booked FROM flights WHERE"; 
    
        if (req.body.departure != "" && req.body.arrival != "") {place = `departure='${req.body.departure}' AND arrival='${req.body.arrival}'`;}
        
    
        if ((req.body.arrival != "" || req.body.departure != "") && req.body.trip_type != "all" ) { type_query = `AND trip_type='${req.body.trip_type}'`; }
        else if (req.body.trip_type != "all") {type_query = `trip_type='${req.body.trip_type}'`; }

    }



    console.log(`${query} ${place} ${type_query};`)
    connection.query(`${query} ${place} ${type_query};`,
        (error, result) => {
            console.log(result);
            res.send( error? {error:error} : {result:result})
        })
})

router.post('/api/posts/reserve_flight', (req, res, next) => {
    console.log(req.body.user);
    console.log(req.body.flight_num);
    console.log(req.body.seats);
    console.log(req.body.group);

    const people = req.body.group.split(',');

    for (var i = 0; i < people.length; i += 1) {
        const person = people[i];
        continue;
    }


    
    connection.query(`INSERT INTO reservations VALUES('${req.body.user}', ${req.body.flight_num}, ${req.body.seats});`,
        (error, result) => {
            if (error) {
                console.log(error);
            }
            res.send(error ? {error:error} : {result:result})
        })
})



router.post('api/posts/get_reservations', (req, res, next) => {
    console.log("Getting Reservations")
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