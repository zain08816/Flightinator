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
    const [response, setResponse] = useState([]);
    const [username, setUser] = useState(cookies.get('username'));
    const [fields, handleFieldChange] = useFormFields({
        flight_num : 0
    })

    const [dept, setDept] = useState("");
    const [dept_time, setDept_time] = useState("");
    const [arriv, setArriv] = useState("");
    const [arriv_time, setArriv_time] = useState("");
    const [type, setType] = useState("")
    // useEffect( () => {
    //     getData();
    // }, []);




    async function getData(event) {

        axios.post('/api/posts/get_i', {
            flight_num: fields.flight_num
        })
        .then( res => {
            const error = res.data.error;
            if ( error ) {
                // console.log(`ERROR: ${error}`)
                setError(error.sqlMessage);
                
            } else {
                setResponse(res.data.result)
                console.log("shdfkhsdkjfhskmjdbfjhsbdjhfbsjhdfbjh")


                setDept(res.data.result[0].departure);
                setDept_time(res.data.result[0].dept_time);

                console.log(dept);
                console.log(dept_time);

                setArriv(res.data.result[0].arrival);
                setArriv_time(res.data.result[0].arriv_time)

                setType(res.data.result[0].trip_type);

            } 
            
        }).catch( err => {
            if(err) console.log(`API Error: ${err}`);
            
        });

        setConfirm(true);
        
    }

    function is_round(){
        return type == "round"
    }


    function renderReservations(){
        
        return (
            <div>
                <br />
                <h2>Itinerary</h2>
                <br />
                <p>
                You will be starting your trip at {dept} on {dept_time.split('T')[0]} at {dept_time.split('T')[1]}. 
                </p>
                <p>
                {  is_round() 
                ?
                `Your return flight will leave from ${arriv} on ${arriv_time.split('T')[0]} at ${arriv_time.split('T')[1]}. This is a round trip.`
                : 
                `Your flight will arrive at ${arriv} on ${arriv_time.split('T')[0]} at ${arriv_time.split('T')[1]}. This is a one way trip.`
                }
                </p>
                

            </div>
        );
    }


    function renderRequest(){

        return(
            <div>
                <form onSubmit={getData}>
                    <FormGroup controlId="flight_num" bsSize='large'>
                        <ControlLabel>Flight Number Listed on Reservation</ControlLabel>
                        <FormControl
                            autoFocus
                            type="number"
                            value={fields.flight_num}
                            onChange={handleFieldChange}
                        />
                    </FormGroup>
                    <LoaderButton
                        block
                        type="submit"
                        bsSize="large"
                        disabled={!(fields.flight_num>=0)}
                        >Get My Itinerary</LoaderButton>
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