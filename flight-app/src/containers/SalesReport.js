import React, { useState } from 'react';
import "./SalesReport.css"
import axios from 'axios';
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
// import DataGrid from 'react-data-grid';

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
                    <td>{queryRow.reservation_no}</td>
                    <td>{queryRow.fare}</td>
                    <td>{queryRow.date}</td>
                    <td>{queryRow.booking_fee}</td>
                    <td>{queryRow.user}</td>
                    <td>{queryRow.flight_num}</td>
                    <td>{queryRow.seats}</td>
                    <td>{queryRow.group}</td>
                </tr>
            );
        })
        
        const joinedRows = [];

        joinedResponse.forEach(queryRow => {
            joinedRows.push (
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
                    <td>{queryRow.reservation_no}</td>
                    <td>{queryRow.fare}</td>
                    <td>{queryRow.date}</td>
                    <td>{queryRow.booking_fee}</td>
                    <td>{queryRow.user}</td>
                    <td>{queryRow.seats}</td>
                    <td>{queryRow.group}</td>
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
                            <th> Reservation Number </th>
                            <th> Fare </th>
                            <th> Date </th>
                            <th> Booking Fee </th>
                            <th> User </th>
                            <th> Flight Number </th>
                            <th> Seats </th>
                            <th> Group </th>
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
                            <th> Flight Number </th>
                            <th> Seats Booked </th>
                            <th> Price </th>
                            <th> Airline ID </th>
                            <th> Departure </th>
                            <th> Arrival </th>
                            <th> Departure Time </th>
                            <th> Arrival Time </th>
                            <th> Trip Type </th>
                            <th> Reservation Number </th>
                            <th> Fare </th>
                            <th> Date </th>
                            <th> Booking Fee </th>
                            <th> User </th>
                            <th> Seats </th>
                            <th> Group </th>
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
