import React, { useState } from 'react';
import "./SalesReport.css"
import axios from 'axios';
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export default function SalesReport(props) {
    const [month, setMonth] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState([]);
    const [joinedResponse, setJoinedResponse] = useState([]);
    const [fields, handleFieldChange] = useFormFields({
        month: 1
    })

    async function handleSubmit(event) {
        setMonth(fields.month);
        // post request
        axios.post('/api/posts/salesreport', {
            month: fields.month
        })
        .then( res => {
            const error = res.data.error;
            if( error ) return;
            const results = res.data.result;
            setResponse(results);
        })
        .catch( err => {
            if( err ) console.log(`API Error: ${err}`);
        })
        // get joined tables also
        axios.post('/api/posts/salesreportjoin', {})
        .then( res => {
            const error = res.data.error;
            if( error ) return;
            const results = res.data.result;
            setJoinedResponse(results);
        })

        event.preventDefault();
    }

    function validateForm() {
        return fields.month >= 1 && fields.month <= 12;
    }

    function renderReport() {
        const rows = [];

        response.forEach(queryRow => {
            rows.push(
                <tr>
                    <td style={{textAlign:"center"}}>{queryRow.reservation_no}</td>
                    <td style={{textAlign:"center"}}>{queryRow.fare}</td>
                    <td style={{textAlign:"center"}}>{queryRow.date}</td>
                    <td style={{textAlign:"center"}}>{queryRow.booking_fee}</td>
                    <td style={{textAlign:"center"}}>{queryRow.user}</td>
                    <td style={{textAlign:"center"}}>{queryRow.flight_num}</td>
                    <td style={{textAlign:"center"}}>{queryRow.seats}</td>
                    <td style={{textAlign:"center"}}>{queryRow.group}</td>
                </tr>
            );
        })
        
        const joinedRows = [];

        joinedResponse.forEach(queryRow => {
            joinedRows.push (
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
                    <td style={{textAlign:"center"}}>{queryRow.reservation_no}</td>
                    <td style={{textAlign:"center"}}>{queryRow.fare}</td>
                    <td style={{textAlign:"center"}}>{queryRow.date}</td>
                    <td style={{textAlign:"center"}}>{queryRow.booking_fee}</td>
                    <td style={{textAlign:"center"}}>{queryRow.user}</td>
                    <td style={{textAlign:"center"}}>{queryRow.seats}</td>
                    <td style={{textAlign:"center"}}>{queryRow.group}</td>
                </tr>
            );
        })
        
        return (
            <div>
                <br />
                <h2>Sales Report for {intToMonth(month)}</h2>
                <br />
                <div>
                    <table class="flight-table">
                        <div></div>
                        <tr>
                            <th style={{textAlign:"center"}}> Reservation Number </th>
                            <th style={{textAlign:"center"}}> Fare </th>
                            <th style={{textAlign:"center"}}> Date </th>
                            <th style={{textAlign:"center"}}> Booking Fee </th>
                            <th style={{textAlign:"center"}}> User </th>
                            <th style={{textAlign:"center"}}> Flight Number </th>
                            <th style={{textAlign:"center"}}> Seats </th>
                            <th style={{textAlign:"center"}}> Group </th>
                        </tr>
                        {rows}
                    </table>
                </div>
                <br />
                <h2>Reservations joined with Flights</h2>
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
                            <th style={{textAlign:"center"}}> Reservation Number </th>
                            <th style={{textAlign:"center"}}> Fare </th>
                            <th style={{textAlign:"center"}}> Date </th>
                            <th style={{textAlign:"center"}}> Booking Fee </th>
                            <th style={{textAlign:"center"}}> User </th>
                            <th style={{textAlign:"center"}}> Seats </th>
                            <th style={{textAlign:"center"}}> Group </th>
                        </tr>
                        {joinedRows}
                    </table>
                </div>
            </div>
        );
    }

    function intToMonth(monthCode) {
        if( monthCode === 1 ) return 'January';
        else if( monthCode === 2 ) return 'February';
        else if( monthCode === 3 ) return 'March';
        else if( monthCode === 4 ) return 'April';
        else if( monthCode === 5 ) return 'May';
        else if( monthCode === 6 ) return 'June';
        else if( monthCode === 7 ) return 'July';
        else if( monthCode === 8 ) return 'August';
        else if( monthCode === 9 ) return 'September';
        else if( monthCode === 10 ) return 'October';
        else if( monthCode === 11 ) return 'November';
        else if( monthCode === 12 ) return 'December';
        else return '???'
    }

    function renderReportRequest() {
        return (
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="month" bsSize="large">
                    <ControlLabel>Month</ControlLabel>
                    <FormControl
                        autoFocus
                        type="number"
                        value={fields.month}
                        onChange={handleFieldChange}
                    />
                    <LoaderButton
                        block
                        type="submit" 
                        bsSize="large"
                        isLoading={isLoading}
                        disabled={!validateForm()}
                    >Get Sales Report for {intToMonth(fields.month)}</LoaderButton>
                </FormGroup>
            </form>
        );
    }

    return (
        <div>
            {
                month ? renderReport() :
                renderReportRequest()
            }
        </div>
    );
}
