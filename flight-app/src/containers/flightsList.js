import React, { useState } from 'react';
import "./flightsList.css"
import axios from 'axios';

export default function FlightsList(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [flightsList, setFlightsList] = useState([]);

    async function refresh(event) {
        setIsLoading(true);
        axios.post('/api/posts/flightsList', {})
        .then( res => {
            if( res.data.error ) {
                console.log(res.data.error);
                return;
            }
            const results = res.data.result;
            // set flights list
            const rows = [];
            results.forEach(queryRow => {
                rows.push (
                    <tr>
                        <td style={{textAlign:"center"}}>{queryRow.flight_no}</td>
                        <td style={{textAlign:"center"}}>{queryRow.seats_booked}</td>
                        <td style={{textAlign:"center"}}>{queryRow.price}</td>
                        <td style={{textAlign:"center"}}>{queryRow.airline_id}</td>
                        <td style={{textAlign:"center"}}>{queryRow.departure}</td>
                        <td style={{textAlign:"center"}}>{queryRow.arrival}</td>
                        <td style={{textAlign:"center"}}>{queryRow.dept_time}</td>
                        <td style={{textAlign:"center"}}>{queryRow.arriv_time}</td>
                        <td style={{textAlign:"center"}}>{queryRow.trip_type}</td>
                    </tr>
                );
            })
            setFlightsList(rows);
            // stop loading
            setIsLoading(false);
        })
        .catch( err => {
            if( err ) console.log(`API Error!: ${err}`);
        })

        event.preventDefault();
    }

    return (
        <div>
            <button onClick={refresh}>Refresh</button>
            <div>
                <br />
                <h2>Full list of Flights</h2>
                <br />
                <div>
                    <table class="flight-table">
                        <div></div>
                        <tr>
                            <th style={{textAlign:"center"}}> Flight Number </th>
                            <th style={{textAlign:"center"}}> Seats Booked </th>
                            <th style={{textAlign:"center"}}> Price </th>
                            <th style={{textAlign:"center"}}> Airline ID </th>
                            <th style={{textAlign:"center"}}> Departure </th>
                            <th style={{textAlign:"center"}}> Arrival </th>
                            <th style={{textAlign:"center"}}> Departure Time </th>
                            <th style={{textAlign:"center"}}> Arrival Time </th>
                            <th style={{textAlign:"center"}}> Trip Type </th>
                        </tr>
                        {flightsList}
                    </table>
                </div>
            </div>
        </div>
    );
}