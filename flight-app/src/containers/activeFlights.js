import React, { useState } from 'react';
import "./activeFlights.css"
import axios from 'axios';

export default function ActiveFlights(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [flightsList, setFlightsList] = useState([]);

    async function refresh(event) {
        setIsLoading(true);
        axios.post('/api/posts/ActiveFlights', {})
        .then( res => {
            if( res.data.error ) {
                console.log(res.data.error);
                return;
            }
            const results = res.data.result;
            // set Active flights list
            const rows = [];
            results.forEach(queryRow => {
                rows.push (
                    <tr>
                        <td>{queryRow.flight_no}</td>
                        <td>{queryRow.seats_booked}</td>
                        <td>{queryRow.price}</td>
                        <td>{queryRow.airline_id}</td>
                        <td>{queryRow.departure}</td>
                        <td>{queryRow.arrival}</td>
                        <td>{queryRow.dept_time}</td>
                        <td>{queryRow.arriv_time}</td>
                        <td>{queryRow.trip_type}</td>
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
                <h2>All Active Flights</h2>
                <br />
                <div>
                    <table class="flight-table">
                        <div></div>
                        <tr>
                            <th> Flight Number </th>
                            <th> Seats Booked  </th>
                            <th> Price  </th>
                            <th> Airline ID  </th>
                            <th> Departure  </th>
                            <th> Arrival   </th>
                            <th> Departure Time   </th>
                            <th> Arrival Time  </th>
                            <th> Trip Type </th>
                        </tr>
                        {flightsList}
                    </table>
                </div>
            </div>
        </div>
    );
}