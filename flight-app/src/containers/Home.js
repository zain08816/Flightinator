import React, { useState, useEffect} from "react";
import { Button } from 'react-bootstrap';
import "./Home.css";
import axios from 'axios';


export default function Home() {

    const [hello, setHello] = useState('Not Hello')

    function handleHello() {
        axios.get('api/hello', {params: {word: "Flightinator"}})
            .then(res => setHello(res.data));
    }



    return (
        <div className="Home">
            <div className="lander">
                <h1>Flightinator 9000</h1>
                <p>Book a flight here</p>
                <p>click this button to test if the backend in started</p>
                <Button 
                bsStyle="primary"
                onClick={handleHello}>
                    {hello}
                </Button>
            </div>
        </div>
    );
}