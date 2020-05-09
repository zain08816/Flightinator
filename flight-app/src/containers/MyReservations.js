import React, { useState, useEffect } from 'react';
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from 'axios';
import Cookies from 'universal-cookie'


export default function MyReservations(props) {


    const cookies = new Cookies();


    const [confirm, setConfirm] = useState(false);
    const [error_response, setError] = useState("");
    const [reservations, setResponse] = useState([]);
    const [username, setUser] = useState(cookies.get('username'));


    // useEffect( () => {
    //     getData();
    // }, []);




    async function getData(event) {

        axios.post('/api/posts/get_reservations', {
            username: username
        })
        .then( res => {
            const error = res.data.error;
            if ( error ) {
                setError(error.sqlMessage);
                
            } else {
                setResponse(res.data.result)
            } 
        }).catch( err => {
            if(err) console.log(`API Error: ${err}`);
        });

        setConfirm(true);

    }








    function renderReservations(){

        const rows = [];

        reservations.forEach( reservation => {
            rows.push( 
                <tr>
                    <td style={{textAlign:"center"}} >{reservation.reservation_no}</td>
                    <td style={{textAlign:"center"}}>{reservation.fare}</td>
                    <td style={{textAlign:"center"}}>{reservation.date}</td>
                    <td style={{textAlign:"center"}}>{reservation.booking_fee}</td>
                    <td style={{textAlign:"center"}}>{reservation.user}</td>
                    <td style={{textAlign:"center"}}>{reservation.flight_num}</td>
                    <td style={{textAlign:"center"}}>{reservation.seats}</td>
                    <td style={{textAlign:"center"}}>{reservation.group}</td>
                </tr>
            )
        })
        return (
            <div>
                <br />
                <h2>Reservation List</h2>
                <br />
                <div>
                    <table>
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
            </div>
        );
    }


    function renderRequest(){

        return(
            <div>
                <form onSubmit={getData}>
                    <LoaderButton
                        block
                        type="submit"
                        bsSize="large"
                        >Get My Reservations</LoaderButton>
                </form>
            </div>
        )
    }


    return (
        <div>
            {
                confirm ? renderReservations() : renderRequest()
                
            }
        </div>
    );
}