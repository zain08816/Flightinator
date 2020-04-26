import React, { useState } from "react";
import "./Control.css";
import {
    FormGroup,
    FormControl,
    ControlLabel,
    Form
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import Cookies from 'universal-cookie'
import axios from "axios";
import Routes from "../Routes"
import { LinkContainer } from "react-router-bootstrap";

export default function Search(props) {

    const cookies = new Cookies();


    const [fields, handleFieldChange] = useFormFields({
        departure: "",
        arrival: "",
        trip_type: "all",
        username: cookies.get('username')
    });
    const [recieved, setRecieved] = useState(false);
    const [response, setResponse] = useState({});
    const [error_response, setError] = useState("");

    async function handleSubmit(event) {

        axios.post('/api/posts/search_flight', {
            departure: fields.departure,
            arrival: fields.arrival,
            trip_type: fields.trip_type
        })
        .then( res => {
            const error = res.data.error;
            if ( error ) {
                setError(error.sqlMessage);
                
            } else {
                setResponse(res.data)
                setRecieved(true);
            } 
        }).catch( err => {
            if(err) console.log(`API Error: ${err}`);
        });

        event.preventDefault()
        setRecieved(true);
    
        
    }

  

    function validateForm() {
        return fields.departure.length > 0 && fields.arrival.length > 0;
    }

    function renderResults() {

        var rows = [];
        for (var i = 0; i < 5; i += 1) {
            rows.push(
            <tr>
                <td>flight_number {i}</td>
                <td>type {i}</td><td>price {i}</td>
                <td>Departure {i}</td>
                <td>Depart Time {i}</td>
                <td>Arrival {i}</td>
                <td>Arival Time {i}</td>
                <td>Airline {i}</td>
                <td>Seats Availible {20-i}</td>
                <td>
                    <LinkContainer to="/reserve">
                        <LoaderButton
                            block
                            type="submit"
                            bsSize="small"
                        >Reserve {i}</LoaderButton>
                    </LinkContainer>
                </td>
            </tr>
            );
        }
        return (
            <div>
                <br />
                <br />
                <br />
                Search Results for User {fields.username}, Departure: {fields.departure}, Arrival: {fields.arrival}, Trip type: {fields.trip_type}
                <br />
                <br />
                <br />
                <div>
                    <table class="flight-table">
                        <div></div>
                        <tr>
                            <th> Flight Number </th>
                            <th> Type </th>
                            <th> Price </th>
                            <th> Departure </th>
                            <th> Depart Time </th>
                            <th> Arrival </th>
                            <th> Arrival Time </th>
                            <th> Airline </th>
                            <th> Seats Availible </th>
                            <th> Book Flight </th>
                        </tr>
                        {rows}

                    </table>
                    {error_response ? error_response : response.result}
                </div>
            </div>
        );
    }


    function renderSearch() {

        return (
            <div className="fs-container">
                <Form onSubmit={handleSubmit} className="Control">
                <h2 className="title">
                    Hello {props.user}! Search flights here.
                </h2>
                <Form inline>
                    <FormGroup controlId="departure">
                        {/* <ControlLabel>Departure</ControlLabel> */}
                        <FormControl
                            autoFocus
                            type="text"
                            placeholder="Origin"
                            value={fields.departure}
                            onChange={handleFieldChange}>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="arrival">
                        {/* <ControlLabel>Arrival</ControlLabel> */}
                        <FormControl
                            type="text"
                            placeholder="Destination"
                            value={fields.arrival}
                            onChange={handleFieldChange}>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="trip_type">

                        <FormControl
                            componentClass="select"
                            placeholder="select"
                            value={fields.trip_type}
                            onChange={handleFieldChange}>
                            
                            <option value="all" >Trip Type...</option>
                            <option value="one" >One Way</option>
                            <option value="round" >Round Trip</option>
                            <option value="all" >All</option>
                        </FormControl>
                    </FormGroup>
                        

                    <LoaderButton
                        block
                        type="submit"
                        bsSize="large"
                        isLoading={false}
                        disabled={!validateForm()}
                    >
                        Search
                    </LoaderButton>
                </Form>

            </Form>

            </div>
            
        );

    }

    return (
        <div className="Search">
            { recieved === false ? renderSearch() : renderResults() }
        </div>
    );


}