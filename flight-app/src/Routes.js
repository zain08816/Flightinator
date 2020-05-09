import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
import Control from "./containers/Control";
import Customer from "./containers/Customer";
import Reserve from "./containers/Reserve";
import Admin from "./containers/Admin";
import SalesReport from "./containers/SalesReport";
import FlightsList from "./containers/flightsList";
import ReservationList from "./containers/reservationList";
import Revenue from "./containers/Revenue";
import MyReservations from "./containers/MyReservations";
import Profile from "./containers/Profile";
import Activeflights from "./containers/activeFlights";
import CustomerReservation from "./containers/CustomerReservation";
import MostBooked from "./containers/mostBooked";
import MyItinerary from "./containers/MyItinerary";
import TopCustomer from "./containers/topCustomer";
import Covid from "./containers/covid";

export default function Routes({ appProps }) {
    return (
        <Switch>
            <AppliedRoute path="/" exact component={Home} appProps={appProps} />
            <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
            <AppliedRoute path="/signup" exact component={Signup} appProps={appProps} />
            <AppliedRoute path="/control" exact component={Control} appProps={appProps} />
            <AppliedRoute path="/customer" exact component={Customer} appProps={appProps} />
            <AppliedRoute path="/salesreport" exact component={SalesReport} appProps={appProps} />
            <AppliedRoute path="/flightsList" exact component={FlightsList} appProps={appProps} />
            <AppliedRoute path="/reservationList" exact component={ReservationList} appProps={appProps} />
            <AppliedRoute path="/revenue" exact component={Revenue} appProps={appProps} />
            <AppliedRoute path="/reserve" exact component={Reserve} appProps={appProps} />
            <AppliedRoute path="/admin" exact component={Admin} appProps={appProps} />
            <AppliedRoute path="/myreservations" exact component={MyReservations} appProps={appProps} />
            <AppliedRoute path="/profile" exact component={Profile} appProps={appProps} />
            <AppliedRoute path="/activeFlights" exact component={Activeflights} appProps={appProps} />
            <AppliedRoute path="/customerreservation" exact component={CustomerReservation} appProps={appProps} />
            <AppliedRoute path="/mostbooked" exact component={MostBooked} appProps={appProps} />
            <AppliedRoute path="/myitinerary" exact component={MyItinerary} appProps={appProps} />
            <AppliedRoute path="/topcustomer" exact component={TopCustomer} appProps={appProps} />
            <AppliedRoute path="/covid" exact component={Covid} appProps={appProps} />
            <Route component={NotFound} />
        </Switch>
    );
}