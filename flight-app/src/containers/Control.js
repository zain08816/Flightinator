import React, { useState } from "react";
import "./Control.css";
import {
    FormGroup,
    FormControl,
    ControlLabel,
    Checkbox,
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
        all: "no",
        departure: "",
        arrival: "",
        trip_type: "all",
        username: cookies.get('username')
    });
    const [recieved, setRecieved] = useState(false);
    const [response, setResponse] = useState([]);
    const [error_response, setError] = useState("");

    async function handleSubmit(event) {

        axios.post('/api/posts/search_flight', {
            all : fields.all,
            departure: fields.departure,
            arrival: fields.arrival,
            trip_type: fields.trip_type,
        })
        .then( res => {
            const error = res.data.error;
            if ( error ) {
                setError(error.sqlMessage);
                
            } else {
                setResponse(Object.values(res.data.result));
                setRecieved(true);
            } 
        }).catch( err => {
            if(err) console.log(`API Error: ${err}`);
        });

        event.preventDefault()
        setRecieved(true);
    }

  

    function validateForm() {
        return (fields.departure.length > 0 && fields.arrival.length > 0) || fields.all.length>2 || (fields.all == "start" && fields.departure.length > 0) ||
        (fields.all == "end" && fields.arrival.length > 0) ;
    }

    function checkAll(){
        return fields.all == "yes"
    }

    function renderResults() {

        console.log(response);
        console.log(error_response);

        var rows = [];

        if (response.length < 1) {rows.push( "Sorry, there are no flights given your search criteria");}

        var today = new Date();

        for ( var i = 0;  i < response.length; i += 1) {

            if ((parseInt(today.getDate()) > parseInt(response[i].dept_time.split('T')[0].split('-')[2]) 
            && parseInt(today.getMonth()) > parseInt(response[i].dept_time.split('T')[0].split('-')[1]) ) || (20-response[i]['seats_booked']) < 1) {
                continue;
            }

            if (fields.all == "active"){
                
                var deptarture = response[i].dept_time.split('T')[0].split('-')[2];

                // console.log(deptarture);
                // console.log(today.getDate());
                if (today.getDate() == deptarture){
                    rows.push(
                        <tr>
                            <td style={{textAlign:"center"}}> {response[i]['flight_no']} </td>
                            <td style={{textAlign:"center"}}> {response[i]['departure']} </td>
                            <td style={{textAlign:"center"}}> {response[i]['dept_time']} </td>
                            <td style={{textAlign:"center"}}> {response[i]['arrival']} </td>
                            <td style={{textAlign:"center"}}> {response[i]['arriv_time']} </td>
                            <td style={{textAlign:"center"}}> {response[i]['trip_type']} </td>
                            <td style={{textAlign:"center"}}> {response[i]['airline_id']} </td>
                            <td style={{textAlign:"center"}}> {response[i]['price']} </td>
                            <td style={{textAlign:"center"}}> {20 -response[i]['seats_booked']} </td>
                            <td style={{textAlign:"center"}}>
                                <LinkContainer to="/reserve">
                                    <LoaderButton
                                        block
                                        type="submit"
                                        bsSize="small"
                                    >Reserve flight {response[i]['flight_no']} </LoaderButton>
                                </LinkContainer>
                            </td>
                        </tr>)
                }
            }
            else    {
            rows.push(
            <tr>
                <td style={{textAlign:"center"}}> {response[i]['flight_no']} </td>
                <td style={{textAlign:"center"}}> {response[i]['departure']} </td>
                <td style={{textAlign:"center"}}> {response[i]['dept_time']} </td>
                <td style={{textAlign:"center"}}> {response[i]['arrival']} </td>
                <td style={{textAlign:"center"}}> {response[i]['arriv_time']} </td>
                <td style={{textAlign:"center"}}> {response[i]['trip_type']} </td>
                <td style={{textAlign:"center"}}> {response[i]['airline_id']} </td>
                <td style={{textAlign:"center"}}> {response[i]['price']} </td>
                <td style={{textAlign:"center"}}> {20 -response[i]['seats_booked']} </td>
                <td style={{textAlign:"center"}}>
                    <LinkContainer to="/reserve">
                        <LoaderButton
                            block
                            type="submit"
                            bsSize="small"
                        >Reserve flight {response[i]['flight_no']} </LoaderButton>
                    </LinkContainer>
                </td>
            </tr>
            );
            }
        }
        return (
            <div>

                { 
                    checkAll() ? 'Search Results for All Flights' :
                    `Search Results for User ${fields.username}, Departure: ${fields.departure}, Arrival: ${fields.arrival}, Trip type: ${fields.trip_type}.`
                }

                <br></br>
                <br></br>
            
                <div>
                    <table class="flight-table">
                        <div></div>
                        <tr>
                            <th style={{textAlign:"center"}}> Flight Number </th>
                            <th style={{textAlign:"center"}}> Origin Airport </th>
                            <th style={{textAlign:"center"}}> Departure Time </th>
                            <th style={{textAlign:"center"}}> Arrival Airport </th>
                            <th style={{textAlign:"center"}}> Arrival Time </th>
                            <th style={{textAlign:"center"}}> Trip Type </th>
                            <th style={{textAlign:"center"}}> Airline </th>
                            <th style={{textAlign:"center"}}> Price </th>
                            <th style={{textAlign:"center"}}> Seats Available </th>
                            <th style={{textAlign:"center"}}> Book Flight </th>
                        </tr>
                        {rows}

                    </table>
                    
                    {error_response ?  `Sorry, we cant complete your search right now. ERROR: ${error_response}` : "" }
                </div>
            </div>
        );
    }


    function renderSearch() {

        return (
            <div>
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
                    
                    {/* <FormGroup controlId="airport">
                        <FormControl
                            type="text"
                            placeholder="Airport"
                            value={fields.airport}
                            onChange={handleFieldChange}>
                        </FormControl>
                    </FormGroup> */}
                    
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
                    <FormGroup controlId="all">
                        <FormControl
                            componentClass="select"
                            placeholder="not all"
                            value = {fields.all}
                            onChange={handleFieldChange}>
                            

                            <option value="no" >Search for a Flight</option>
                            <option value="yes" >Show me all Flights</option>
                            <option value="start" >Search by Origin</option>
                            <option value="end" >Search by Destination</option>
                            <option value="pop">Show most popular flights</option>
                            <option value="active" >Show me all Active Flights</option>
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
            <br></br>
            

            </div>

                {/* <Form onSubmit={handleAll}>
                    <FormGroup controlId="all">
                        <FormControl
                            componentClass="select"
                            placeholder="not all"
                            value = {fields.all}
                            onChange={handleFieldChange}>

                            <option value="no" >Search for a Flight</option>
                            <option value="all" >One Way</option>
                        </FormControl>


                    </FormGroup>
                    <LoaderButton
                        block
                        type="submit"
                        bsSize="large"
                        disabled={validateForm()}
                    >
                    See All Flights?
                    </LoaderButton>


                </Form> */}
            </div>
            
        );

    }

    return (
        <div className="Search">
            { recieved === false ? renderSearch() : renderResults() }
        </div>
    );


}