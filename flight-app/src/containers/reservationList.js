import React, { useState } from 'react';
import "./reservationList.css"
import axios from 'axios';
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export default function ReservationList(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [reservations, setReservations] = useState([]);
    const [fields, handleFieldChange] = useFormFields({
        flight_no: 0,
        name: ""
    })

    async function handleSubmit(event) {
        axios.post('/api/posts/reservationList', {
            flight_no: fields.flight_no,
            name: fields.name
        })
        .then( res => {
            const error = res.data.error;
            if( error ) return;
            const results = res.data.result;
            setReservations(results);
        })
        .catch( err => {
            if( err ) console.log(`API Error: ${err}`);
        })

        event.preventDefault();
    }

    function validateForm() {
        return fields.flight_no > 0 || fields.name.length > 0;
    }

    function renderReport() {
        const rows = [];

        reservations.forEach( reservation => {
            rows.push( 
                <tr>
                    <td>{reservation.reservation_no}</td>
                    <td>{reservation.fare}</td>
                    <td>{reservation.date}</td>
                    <td>{reservation.booking_fee}</td>
                    <td>{reservation.user}</td>
                    <td>{reservation.flight_num}</td>
                    <td>{reservation.seats}</td>
                    <td>{reservation.group}</td>
                </tr>
            )
        })
        return (
            <div>
                <br />
                <h2>Reservation List</h2>
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
            </div>
        );
    }

    function renderReportRequest() {
        return (
            <div>
                <h2>Get list of Reservations</h2> 
                    <form onSubmit={handleSubmit}>
                        <FormGroup controlId="flight_no" bsSize="large">
                            <ControlLabel>Flight Number</ControlLabel>
                            <FormControl
                                autoFocus
                                type="number"
                                value={fields.flight_no}
                                onChange={handleFieldChange}
                                disabled={fields.name.length > 0}
                            />
                        </FormGroup>
                            <br />
                        <FormGroup controlId="name" bsSize="large">
                            <ControlLabel>Customer Name</ControlLabel>
                            <FormControl
                                type="name"
                                value={fields.name}
                                onChange={handleFieldChange}
                                disabled={fields.flight_no != 0}
                            />
                        </FormGroup>
                        <LoaderButton
                            block
                            type="submit" 
                            bsSize="large"
                            isLoading={isLoading}
                            disabled={!validateForm()}
                        >Get Reservations for {fields.name.length > 0 ? fields.name : 'flight ' + fields.flight_no}</LoaderButton>
                    </form>
            </div>
        );
    }

    return (
        <div>
            {
                reservations.length > 0 ? renderReport() :
                renderReportRequest()
            }
        </div>
    );
}