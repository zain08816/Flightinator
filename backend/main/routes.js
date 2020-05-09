var express = require('express');
var router = express.Router();
var connection = require('./db.js');
const oneline = require('oneline');

// Profile stuff
router.post('/api/posts/signup', (req, res, next) => {
    if( !req.body.username || !req.body.password )
        throw 'Improperly formatted request.';
    connection.query(`INSERT INTO customer (name, email, phone_no, address, city, state, zip_code, seat_preference, meal_preference, account_no, total_revenue, username, password) VALUES(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '${req.body.username}', '${req.body.password}');`,
        (error, result) => {
            if (error) {
                console.log(error);
            }
            res.send( error ? {error:error} : {} );
        });
})

router.post('/api/posts/login', (req, res, next) => {
    console.log(`${req.body.username} has logged in.`);
    connection.query(`SELECT username,password FROM customer WHERE username='${req.body.username}' AND password='${req.body.password}';`,
        (error, result) => {
            if (error) {
                console.log(error);
            }
            res.send( error ? {error:error} : {result:result} );
        });
})

router.post('/api/posts/customer_info', (req, res, next) => {
    if( req.body.action == 'add' ) {
        connection.query(oneline`INSERT INTO customer (name, email, phone_no, address, city, state, zip_code, seat_preference, meal_preference, account_no, total_revenue, username, password)
VALUES ('${req.body.name}', '${req.body.email}', '${req.body.phone_no}', '${req.body.address}', '${req.body.city}', 
'${req.body.state}', '${req.body.zip_code}', ${req.body.seat_preference}, '${req.body.meal_preference}', ${req.body.account_no}, ${req.body.total_revenue}, '${req.body.username}', '${req.body.password}');`,
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
        connection.query(oneline`SELECT name,email,phone_no,address,city,state,zip_code,seat_preference,meal_preference,total_revenue,username,password
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

router.post('/api/posts/customerReservations', (req, res, next) => {
    
    var query = `SELECT * FROM reservations WHERE flight_num=${req.body.flight_no}`
    
    console.log(query);
    
    connection.query(query, (error, result) => {
        if(error) console.log(error);
        console.log(result);
        res.send(error ? {error:error} : {result:result})
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

    if (req.body.all == "pop") {
        query = "SELECT flight_no, departure, dept_time, arrival, arriv_time, trip_type, airline_id, price, seats_booked FROM flights ORDER BY seats_booked DESC LIMIT 5"
    } else if (req.body.all == "yes" || req.body.all == "active") {
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
    console.log(req.body.fare);
    console.log(req.body.booker);
    console.log(req.body.flight_num);
    console.log(req.body.seats);
    console.log(req.body.group);

    const people = req.body.group.split(',');
    var error_rep = "";

    const today = new Date();
    const date = today.toISOString().split('T')[0];
    console.log(date);

    connection.query(`Update customer SET total_revenue = total_revenue + ${req.body.seats * req.body.fare} WHERE username='${req.body.booker}';`,
            (error, result) => {
                if(error) console.log(error);
    })

    // connection.query(`INSERT INTO reservations VALUES(NULL, ${req.body.fare}, DATE '${date}', 0, '${req.body.booker}', ${req.body.flight_num}, ${req.body.seats}, '${req.body.group}');`,
    //     (error, result) => {
    //         if (error) {
    //             console.log(error);
    //             error_rep = error;
    //         }
    // })

    for (var i = 0; i < req.body.seats; i += 1) {

        const person = people[i];

        
        
        console.log(`INSERT INTO reservations VALUES(NULL, ${req.body.fare}, DATE '${date}', 0, '${req.body.booker}', ${req.body.flight_num}, ${req.body.seats}, '${req.body.group}', '${person}');`);
        connection.query(`INSERT INTO reservations VALUES(NULL, ${req.body.fare}, DATE '${date}', 0, '${req.body.booker}', ${req.body.flight_num}, ${req.body.seats}, '${req.body.group}', '${person}');`,
        (error, result) => {
            if (error) {
                console.log(error);
                error_rep = error;
            }
            
        })
    }

    res.send(error_rep ? {error:error_rep} : {result:"Successfully Booked Flight!"});

})

router.post('/api/posts/get_flight', (req, res, next) => {
    console.log(req.body.flight_num);

    connection.query(`Update flights SET seats_booked = seats_booked + ${req.body.seats} WHERE flight_no='${req.body.flight_num}';`,
        (error, result) => {
            if(error) console.log(error);
        })

    

    connection.query(`SELECT price FROM flights WHERE flight_no='${req.body.flight_num}';`,
        (error, result) => {
            if(error) console.log(error);
            
            console.log(result)
            res.send(error ? {error:error} : {result:result})
        })
})



router.post('/api/posts/get_i', (req, res, next) => {
    console.log(req.body.flight_num)
    connection.query(`SELECT * FROM flights WHERE flight_no='${req.body.flight_num}';`,
        (error, result) => {
            if(error) console.log(error);
            console.log(result)
            res.send(error ? {error:error} : {result:result})
        })
})

router.post('/api/posts/get_reservations', (req, res, next) => {
    console.log("Getting Reservations")

    connection.query(`SELECT * FROM reservations WHERE name='${req.body.username}';`,
        (error, result) => {
            if(error) console.log(error);
            console.log(result)
            res.send(error ? {error:error} : {result:result})
        })
})


router.post('/api/posts/get_top_cust', (req, res, next) => {

    connection.query(`SELECT name, username, total_revenue FROM customer ORDER BY total_revenue desc limit 1;`,
        (error, result) => {
            if(error) console.log(error);
            console.log(result)
            res.send(error ? {error:error} : {result:result})
        })
})


router.post('/api/posts/mostbooked', (req, res, next) => {
    connection.query(oneline`SELECT * FROM flights WHERE seats_booked = (SELECT MAX(seats_booked) FROM flights);`,
    (error, result) => {
        if( error ) console.log( error );
        res.send( error ? {error:error} : {result:result} );
    });
})


router.get('/api/hello', (req, res, next) => {
    const word = req.query.word
	res.json(`Hello ${word}!`)
})

module.exports = router;