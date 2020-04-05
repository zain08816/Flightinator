import React from "react";
import "./Control.css";

export default function Search(props) {


    function renderSearch() {
        return (
            <div className="Control">
                <div className="flight-table">
                    <h1>Search</h1>
                    <p>Book a flight here</p>

                    <table>
                        <tr>
                            <td>Max price</td><td><input type="text" name="maxprice"></input></td>
                        </tr>
                        <tr>
                            <td>Departure Airport</td><td><input type="text" name="depart"></input></td>
                            <td>Arrival Airport</td><td><input type="text" name="arrival"></input></td>
                        </tr>
                        <tr>
                            <td>Round trip<input type="radio" name="roundtrip" value="yes"></input></td>
                            <td>One Way?<input type="radio" name="roundtrip" value="no"></input></td>
                            <td>All<input type="radio" name="roundtrip" value="both"></input></td>
                        </tr>
                        <tr>
                            <td>Departure</td><td><input type="datetime-local" name="earlydate"></input></td>
                            <td>Arrival</td><td><input type="datetime-local" name="latedate"></input></td>
                        </tr>
                        <tr>
                            <td>Airline</td><td><input type="text" name="aid"></input></td>
                        </tr>
                        <tr>
                            <td>Sort by: </td><td><select name="sorter">
                                <option value="price">Price</option>
                                <option value="depart">Departure</option>
                                <option value="arrive">Arrival</option>
                            </select></td>
                        </tr>
                    </table>
                    <input type="submit" value="Search"></input>

                </div>
            </div>
        );

    }

    return (
        <div className="Search">
            {renderSearch()}
        </div>
    );


}