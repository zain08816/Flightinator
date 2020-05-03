import React, { useState } from 'react';
import axios from 'axios';
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";



export default function CustomerReservations(props) {
    const [done, setDone] = useState(false);
    const [reservations, setReservations] = useState([]);
    const [fields, handleFieldChange] = useFormFields({
        flight_no: 0
    })


    async function handleSubmit(event) {
        axios.post('/api/posts/customerReservations', {
            flight_no: fields.flight_no,
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

        setDone(true);
        event.preventDefault();
    }


    function renderForm() {

        return(
            <div>
                <h2>Get customers by Flight Reservations</h2>
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
                    <LoaderButton
                        block
                        type="submit"
                        bsSize="large"
                        disabled={fields.flight_no < 0}
                        >
                        Get List for Flight {fields.flight_no}
                    </LoaderButton>
                </form>
            </div>
        ) 
    }


    function renderResult(){
        const rows = [];

//  <td>{reservation.group}</td>
        reservations.forEach( reservation => {
           
             rows.push( 
                <tr>
                    <td>{reservation.name}</td>
                </tr>
            ) 
          /*
            var array = reservation.group.split(",");
            
            for (var x=0; x<array.length;x++){
            rows.push( 
                <tr>
                    <td>{array[x]}</td>
                </tr>
            )
            }
        */
        })

        return (
            <div>
                <br />
                <h2>Customer List</h2>
                <br />
                <div>
                    <table class="flight-table">
                        <div></div>
                        <tr>
                            <th> Customers </th>
                        </tr>
                        {rows}
                    </table>
                </div>
            </div>
        );
    }
        
    return (
        <div>
            {
                done ? renderResult() : renderForm() 
            }
        </div>
        
    );
}