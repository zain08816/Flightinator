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
            <marquee>NOTICE: Due to COVID-19 airlines are opererating in a limited capacity. SEE COVID-19 Info for more information and restrictions</marquee>
            <div className="lander">
                <h1>Flightinator 9000</h1>
                <p>Welcome! Book a flight here</p>
                <p>Click this button see if the frontend can talk to the backend.</p>
                <Button 
                bsStyle="primary"
                onClick={handleHello}>
                    {hello}
                </Button>
            </div>
        </div>
    );
}