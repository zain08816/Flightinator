import React, { useState, useEffect } from 'react';
import LoaderButton from "../components/LoaderButton";
import "./MyReservations.css";
import { useFormFields } from "../libs/hooksLib";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from 'axios';
import Cookies from 'universal-cookie'


export default function MyReservations(props) {


    const cookies = new Cookies();


    const [confirm, setConfirm] = useState(false);
    const [error_response, setError] = useState("");
    const [response, setResponse] = useState({});
    const [username, setUser] = useState(cookies.get('username'));


    useEffect( () => {
        getData();
    }, []);




    async function getData(event) {

        axios.post('/api/post/get_reservation', {
            username: username
        })
        .then( res => {
            const error = res.data.error;
            if ( error ) {
                setError(error.sqlMessage);
                
            } else {
                setResponse(res.data)
            } 
        }).catch( err => {
            if(err) console.log(`API Error: ${err}`);
        });
  
    }






    function renderReservations(){

        getData();

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
                    Reservation {i}
                </td>
            </tr>
            );
        }




        return(
            <div>
                <br />
                <br />
                <br />
                My Reservations
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
                            <th> Reservation Number </th>
                        </tr>
                        {rows}

                    </table>
                </div>
            </div>
        )
    }


    function renderConfirmation(){

        return(
            <div>
                Confirmed
            </div>
        )
    }


    return (
        <div>
            {
                confirm ? renderConfirmation() :
                renderReservations()
            }
        </div>
    );
}