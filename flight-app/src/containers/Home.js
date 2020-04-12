import React, { useState, useEffect} from "react";
import "./Home.css";
import axios from 'axios';


export default function Home() {

    const [hello, setHello] = useState('Not Hello')

    function handleHello() {
        axios.get('api/hello', {params: {word: "flightinator"}})
            .then(res => setHello(res.data));
    }



    return (
        <div className="Home">
            <div className="lander">
                <h1>Flightinator 9000</h1>
                <p>Book a flight here</p>
                <button onClick={handleHello}>
                    {hello}
                </button>
            </div>
        </div>
    );
}