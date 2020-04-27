import React, { useState } from 'react';
import "./Revenue.css"
import axios from 'axios';
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export default function Revenue(props) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [revenues, setRevenues] = useState([]);
    const [fields, handleFieldChange] = useFormFields({
        flight_no: 0,
        destination: "",
        username: ""
    })

    async function validateForm() {
        return !!(fields.flight_no > 0 || fields.destination.length > 0 || fields.username.length > 0);
    }

    async function handleSubmit(event) {
        axios.post('/api/posts/revenue', {
            flight_no: fields.flight_no,
            destination: fields.destination,
            username: fields.username
        })
        .then( res => {
            const error = res.data.error;
            if( error ) return;
            const results = res.data.result;
            setRevenues(results);
            setIsSubmitted(true);
        })
        .catch( err => {
            console.log(`API Error: ${err}`);
        })

        event.preventDefault();
    }

    function renderReport() {
        const rows = [];

        revenues.forEach(queryRow => {
            rows.push(
                <tr>
                    <td>${queryRow.revenue}</td>
                    <td>{queryRow.user}</td>
                    <td>{queryRow.arrival}</td>
                    <td>{queryRow.flight_no}</td>
                </tr>
            )
        })

        return (
            <div>
                <br />
                <h2>Revenues </h2>
                <br />
                <div>
                    <table class="flight-table">
                        <div></div>
                        <tr>
                            <th> Revenue </th>
                            <th> Username </th>
                            <th> Destination </th>
                            <th> Flight Number </th>
                        </tr>
                        {rows}
                    </table>
                </div>
            </div>
        );
    }

    function renderReportRequest() {
        return (
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="flight_no" bsSize="large">
                    <ControlLabel>Flight Number</ControlLabel>
                    <FormControl
                        autoFocus
                        type="number"
                        value={fields.flight_no}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="destination" bsSize="large">
                    <ControlLabel>Destination</ControlLabel>
                    <FormControl
                        type="destination"
                        value={fields.destination}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="customer_name" bsSize="large">
                    <ControlLabel>Customer Username</ControlLabel>
                    <FormControl
                        type="username"
                        value={fields.username}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <LoaderButton
                    block
                    type="submit" 
                    bsSize="large"
                    disabled={!validateForm()}
                >Get Revenue Report</LoaderButton>
            </form>
        );
    }

    return (
        <div>
            {
                isSubmitted ? renderReport() :
                renderReportRequest()
            }
        </div>
    );
}
