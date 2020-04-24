import React, { useState } from "react";
import "./Control.css";
import {
    FormGroup,
    FormControl,
    ControlLabel,
    Form,
    Radio
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import Cookies from 'universal-cookie'
import axios from "axios";

export default function Search(props) {

    const cookies = new Cookies();


    const [fields, handleFieldChange] = useFormFields({
        departure: "",
        arrival: "",
        trip_type: "all",
        username: cookies.get('username')
    });
    const [recieved, setRecieved] = useState(false);
    const [response, setResponse] = useState("");

    async function handleSubmit(event) {

        axios.get('/api/posts/search_flight', {
            departure: fields.departure,
            arrival: fields.arrival,
            trip_type: fields.trip_type
        })
        .then( res => {
            const error = res.data.error;
            if ( error ) {
                setResponse(error.sqlMessage);
                
            } else {
                setResponse(res.data.result)
                setRecieved(true);
            } 
        }).catch( err => {
            if(err) console.log(`API Error: ${err}`);
        });

        event.preventDefault()
        setRecieved(true);
    
        
    }

    function renderResults() {
        return (
            <div>
                Search Results for {fields.username}, Departure: {fields.departure}, Arrival: {fields.arrival}, Trip type: {fields.trip_type}
                <div>
                    {response}
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
            {recieved === false ? renderSearch() : renderResults()}
        </div>
    );


}