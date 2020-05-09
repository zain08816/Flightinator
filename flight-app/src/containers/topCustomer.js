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
    const [username, setUser] = useState("")
    const [rev, setRev] = useState("");
    const [name, setName] = useState("");
 




    async function getData(event) {

        axios.post('/api/posts/get_top_cust', {
            username : "admin"
        })
        .then( res => {
            const error = res.data.error;
            if ( error ) {
                console.log(`ERROR: ${error}`)
                setError(error.sqlMessage);
                
            } else {
                setResponse(res.data.result)
                setUser(res.data.result[0].username);
                setRev(res.data.result[0].total_revenue);
                setName(res.data.result[0].name);
            } 
            
        }).catch( err => {
            if(err) console.log(`API Error: ${err}`);
            
        });

        setConfirm(true);
        
    }



    function renderReservations(){
        
        return (
            <div>
                <br />
                <h2>Top Customer</h2>
                <br />
                <p>
                The customer who generated the most revenue is {name} ({username}) with a total of ${rev} spent!. 
                </p>
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
                        >Calculate Top Customer</LoaderButton>
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